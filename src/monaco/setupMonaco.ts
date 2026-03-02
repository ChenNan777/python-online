import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { usePythonStore } from "../store/usePythonStore";

let isSetup = false;

type MonacoEnvironment = {
  getWorker: (moduleId: string, label: string) => Worker;
};

type BuiltinSymbol = {
  signature?: string;
  description?: string;
  callable?: boolean;
};

function escapeMarkdownCode(value: string): string {
  return value.replaceAll("`", "\\`");
}

function tryGetPythonFunctionSignature(
  code: string,
  name: string,
): string | null {
  const escapedName = name.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `^\\s*def\\s+${escapedName}\\s*\\(([^)]*)\\)\\s*:`,
    "m",
  );
  const match = code.match(re);
  if (!match) return null;
  const args = match[1]?.trim() ?? "";
  return `def ${name}(${args})`;
}

function splitTopLevelArgs(text: string): string[] {
  const out: string[] = [];
  let start = 0;
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  let quote: "'" | '"' | null = null;
  let escaped = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i] ?? "";

    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote) {
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }

    if (ch === "(") paren += 1;
    else if (ch === ")" && paren > 0) paren -= 1;
    else if (ch === "[") bracket += 1;
    else if (ch === "]" && bracket > 0) bracket -= 1;
    else if (ch === "{") brace += 1;
    else if (ch === "}" && brace > 0) brace -= 1;
    else if (ch === "," && paren === 0 && bracket === 0 && brace === 0) {
      out.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }

  const last = text.slice(start).trim();
  if (last.length > 0) out.push(last);
  return out;
}

function extractCallAtCursor(prefix: string): { name: string; activeParam: number } | null {
  const stack: number[] = [];
  let quote: "'" | '"' | null = null;
  let escaped = false;

  for (let i = 0; i < prefix.length; i += 1) {
    const ch = prefix[i] ?? "";

    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote) {
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }

    if (ch === "(") stack.push(i);
    else if (ch === ")") stack.pop();
  }

  const openIndex = stack.length > 0 ? stack[stack.length - 1] : -1;
  if (openIndex < 0) return null;

  const before = prefix.slice(0, openIndex).replace(/\s+$/g, "");
  const nameMatch = before.match(/([A-Za-z_]\w*)$/);
  const name = nameMatch?.[1] ?? "";
  if (!name) return null;

  const inside = prefix.slice(openIndex + 1);
  let activeParam = 0;
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  quote = null;
  escaped = false;

  for (let i = 0; i < inside.length; i += 1) {
    const ch = inside[i] ?? "";

    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote) {
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }

    if (ch === "(") paren += 1;
    else if (ch === ")" && paren > 0) paren -= 1;
    else if (ch === "[") bracket += 1;
    else if (ch === "]" && bracket > 0) bracket -= 1;
    else if (ch === "{") brace += 1;
    else if (ch === "}" && brace > 0) brace -= 1;
    else if (ch === "," && paren === 0 && bracket === 0 && brace === 0) activeParam += 1;
  }

  return { name, activeParam };
}

type ParsedContextSymbols = {
  functions: Map<string, string>;
  variables: Set<string>;
  modules: Set<string>;
};

let lastContextCode = "";
let lastContextSymbols: ParsedContextSymbols | null = null;

function parseContextSymbols(code: string): ParsedContextSymbols {
  if (code === lastContextCode && lastContextSymbols) return lastContextSymbols;

  const functions = new Map<string, string>();
  const variables = new Set<string>();
  const modules = new Set<string>();

  const defRe = /^\s*def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*:/gm;
  for (;;) {
    const m = defRe.exec(code);
    if (!m) break;
    const name = m[1] ?? "";
    const args = (m[2] ?? "").trim();
    if (name) functions.set(name, `def ${name}(${args})`);
  }

  const importRe = /^\s*import\s+(.+)$/gm;
  for (;;) {
    const m = importRe.exec(code);
    if (!m) break;
    const rest = String(m[1] ?? "");
    for (const part of rest.split(",")) {
      const s = part.trim();
      if (!s) continue;
      const asMatch = s.match(/^([A-Za-z_]\w*)(?:\s+as\s+([A-Za-z_]\w*))?$/);
      if (!asMatch) continue;
      const mod = asMatch[1] ?? "";
      const alias = asMatch[2] ?? "";
      if (mod) modules.add(mod);
      if (alias) variables.add(alias);
      else if (mod) variables.add(mod);
    }
  }

  const fromImportRe = /^\s*from\s+([A-Za-z_]\w*)\s+import\s+(.+)$/gm;
  for (;;) {
    const m = fromImportRe.exec(code);
    if (!m) break;
    const mod = String(m[1] ?? "").trim();
    const rest = String(m[2] ?? "");
    if (mod) modules.add(mod);
    for (const part of rest.split(",")) {
      const s = part.trim();
      if (!s) continue;
      const asMatch = s.match(/^([A-Za-z_]\w*)(?:\s+as\s+([A-Za-z_]\w*))?$/);
      if (!asMatch) continue;
      const name = asMatch[1] ?? "";
      const alias = asMatch[2] ?? "";
      if (alias) variables.add(alias);
      else if (name) variables.add(name);
    }
  }

  const assignRe = /^([A-Za-z_]\w*)\s*=/gm;
  for (;;) {
    const m = assignRe.exec(code);
    if (!m) break;
    const name = m[1] ?? "";
    if (name) variables.add(name);
  }

  lastContextCode = code;
  lastContextSymbols = { functions, variables, modules };
  return lastContextSymbols;
}

export function setupMonaco() {
  if (isSetup) return;
  isSetup = true;

  const builtinSymbols: Record<string, BuiltinSymbol> = {
    print: {
      signature: "print(*objects, sep=' ', end='\\n', file=None, flush=False)",
      description: "打印对象到标准输出",
      callable: true,
    },
    len: { signature: "len(s)", description: "返回容器长度", callable: true },
    range: {
      signature: "range(start, stop[, step])",
      description: "生成整数序列",
      callable: true,
    },
    sum: { signature: "sum(iterable, /, start=0)", callable: true },
    min: { signature: "min(iterable, /, *[, default, key])", callable: true },
    max: { signature: "max(iterable, /, *[, default, key])", callable: true },
    sorted: {
      signature: "sorted(iterable, /, *, key=None, reverse=False)",
      callable: true,
    },
    enumerate: { signature: "enumerate(iterable, start=0)", callable: true },
    zip: { signature: "zip(*iterables, strict=False)", callable: true },
    map: { signature: "map(function, iterable, ...)", callable: true },
    filter: { signature: "filter(function, iterable)", callable: true },
    list: { signature: "list([iterable])", callable: true },
    dict: { signature: "dict(**kwargs)", callable: true },
    set: { signature: "set([iterable])", callable: true },
    tuple: { signature: "tuple([iterable])", callable: true },
    int: { signature: "int(x=0)", callable: true },
    float: { signature: "float(x=0.0)", callable: true },
    str: { signature: "str(object='')", callable: true },
    bool: { signature: "bool(x=False)", callable: true },
    abs: { signature: "abs(x)", callable: true },
    round: { signature: "round(number[, ndigits])", callable: true },
    all: { signature: "all(iterable)", callable: true },
    any: { signature: "any(iterable)", callable: true },
    isinstance: { signature: "isinstance(object, classinfo)", callable: true },
    getattr: { signature: "getattr(object, name[, default])", callable: true },
    setattr: { signature: "setattr(object, name, value)", callable: true },
    hasattr: { signature: "hasattr(object, name)", callable: true },
    open: {
      signature:
        "open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)",
      callable: true,
    },
    input: { signature: "input(prompt=None)", callable: true },
    True: { description: "布尔真值" },
    False: { description: "布尔假值" },
    None: { description: "空值" },
  };

  const monacoGlobal = globalThis as typeof globalThis & {
    MonacoEnvironment?: MonacoEnvironment;
  };

  monacoGlobal.MonacoEnvironment = {
    getWorker(_moduleId: string, label: string) {
      if (label === "json") return new JsonWorker();
      if (label === "css" || label === "scss" || label === "less")
        return new CssWorker();
      if (label === "html" || label === "handlebars" || label === "razor")
        return new HtmlWorker();
      if (label === "typescript" || label === "javascript")
        return new TsWorker();
      return new EditorWorker();
    },
  };

  monaco.languages.registerHoverProvider("python", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const { variableScopes, contextCode } = usePythonStore.getState();
      const hovered = word.word;
      const contextSymbols = parseContextSymbols(contextCode);

      const contents: { value: string }[] = [];

      for (const scope of variableScopes) {
        if (Object.prototype.hasOwnProperty.call(scope.variables, hovered)) {
          const raw = scope.variables[hovered];
          const scopeLabel = scope.name === "<module>" ? "全局" : scope.name;
          contents.push({
            value: `**${hovered}**  (${escapeMarkdownCode(scopeLabel)})\n\n\`\`\`\n${escapeMarkdownCode(String(raw))}\n\`\`\``,
          });
          break;
        }
      }

      const signatureInMain = tryGetPythonFunctionSignature(
        model.getValue(),
        hovered,
      );
      if (signatureInMain) {
        contents.push({ value: `\`\`\`python\n${signatureInMain}\n\`\`\`` });
      } else {
        const signatureInContext =
          contextSymbols.functions.get(hovered) ?? null;
        if (signatureInContext) {
          contents.push({
            value: `\`\`\`python\n${signatureInContext}\n\`\`\`\n\n(上下文)`,
          });
        } else if (contextSymbols.variables.has(hovered)) {
          contents.push({ value: `**${hovered}**  (上下文变量)` });
        }
      }

      if (contents.length === 0) return null;

      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents,
      };
    },
  });

  monaco.languages.registerCompletionItemProvider("python", {
    provideCompletionItems(model, position) {
      const { contextCode } = usePythonStore.getState();
      const contextSymbols = parseContextSymbols(contextCode);

      const word = model.getWordUntilPosition(position);
      const range = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );

      const suggestions: monaco.languages.CompletionItem[] = [];

      const seen = new Set<string>();

      for (const [name, signature] of contextSymbols.functions) {
        suggestions.push({
          label: name,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: "上下文函数",
          documentation: signature,
          insertText: `${name}($0)`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
        seen.add(name);
      }

      for (const name of contextSymbols.variables) {
        if (contextSymbols.functions.has(name)) continue;
        suggestions.push({
          label: name,
          kind: monaco.languages.CompletionItemKind.Variable,
          detail: "上下文变量",
          insertText: name,
          range,
        });
        seen.add(name);
      }

      for (const name of contextSymbols.modules) {
        suggestions.push({
          label: name,
          kind: monaco.languages.CompletionItemKind.Module,
          detail: "上下文模块",
          insertText: name,
          range,
        });
        seen.add(name);
      }

      for (const [name, meta] of Object.entries(builtinSymbols)) {
        if (seen.has(name)) continue;
        if (meta.signature) {
          suggestions.push({
            label: name,
            kind: monaco.languages.CompletionItemKind.Function,
            detail: "Python 内置",
            documentation: meta.signature,
            insertText: meta.callable ? `${name}($0)` : name,
            insertTextRules: meta.callable
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
            range,
          });
        } else {
          suggestions.push({
            label: name,
            kind: monaco.languages.CompletionItemKind.Constant,
            detail: "Python 内置",
            documentation: meta.description,
            insertText: name,
            range,
          });
        }
      }

      return { suggestions };
    },
  });

  monaco.languages.registerSignatureHelpProvider("python", {
    signatureHelpTriggerCharacters: ["(", ","],
    signatureHelpRetriggerCharacters: [",", ")"],
    provideSignatureHelp(model, position) {
      const offset = model.getOffsetAt(position);
      const start = Math.max(0, offset - 2000);
      const prefix = model.getValueInRange(
        new monaco.Range(
          model.getPositionAt(start).lineNumber,
          model.getPositionAt(start).column,
          position.lineNumber,
          position.column,
        ),
      );

      const call = extractCallAtCursor(prefix);
      if (!call) return null;

      const { contextCode } = usePythonStore.getState();
      const contextSymbols = parseContextSymbols(contextCode);

      const signatureInMain =
        tryGetPythonFunctionSignature(model.getValue(), call.name) ?? null;
      const signatureInContext = contextSymbols.functions.get(call.name) ?? null;
      const signatureInBuiltin = builtinSymbols[call.name]?.signature ?? null;
      const signature = signatureInMain ?? signatureInContext ?? signatureInBuiltin;
      if (!signature) return null;

      const open = signature.indexOf("(");
      const close = signature.lastIndexOf(")");
      const args =
        open >= 0 && close > open ? signature.slice(open + 1, close) : "";
      const parameters = splitTopLevelArgs(args).map((p) => ({ label: p }));

      return {
        value: {
          activeSignature: 0,
          activeParameter: Math.min(call.activeParam, Math.max(0, parameters.length - 1)),
          signatures: [
            {
              label: signature,
              parameters,
            },
          ],
        },
        dispose() {},
      };
    },
  });

  loader.config({ monaco });
  void loader.init();
}
