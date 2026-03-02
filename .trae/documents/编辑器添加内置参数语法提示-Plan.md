## 目标
在 Monaco Python 编辑器中，为 Python 内置函数/类型（以及用户代码/上下文代码中的函数）提供“参数/签名提示”，让用户在输入 `函数名(`、`,` 等位置时能看到函数签名与当前参数高亮。

## 范围与原则
- 仅增强编辑器的语法提示能力，不改变运行逻辑、断点逻辑、Worker 逻辑。
- 优先在现有 Monaco 初始化入口集中实现：`src/monaco/setupMonaco.ts`。
- 不引入新依赖；使用现有 `monaco-editor` API。
- 提示优先级：用户代码函数签名 > 上下文代码函数签名 > 内置函数签名。

## 实现步骤
1. 盘点现有提示能力
   - 确认当前已注册的 Provider：HoverProvider 与 CompletionItemProvider（上下文符号）。
   - 明确缺失点：没有 SignatureHelpProvider（括号内参数提示）。

2. 定义“内置函数签名表”
   - 在 `src/monaco/setupMonaco.ts` 内新增一个常量表（或拆到 `src/monaco/pythonBuiltins.ts`，若内容较大再拆分）：
     - key：函数名/内置名（如 `print`、`range`、`len`、`sorted`、`dict`、`list` 等）
     - value：签名字符串（例如 `print(*objects, sep=' ', end='\\n', file=None, flush=False)`）
     - 可选：简短说明文本（用于 documentation）。
   - 第一版覆盖常用内置：`print/len/range/sum/min/max/sorted/enumerate/zip/map/filter/list/dict/set/tuple/int/float/str/bool/abs/round/all/any/isinstance/getattr/setattr/hasattr/open/input`，以及常量 `True/False/None`（作为 keyword/constant 补全，不参与参数提示）。

3. 增加 SignatureHelpProvider（核心）
   - 在 `setupMonaco()` 中注册：
     - `monaco.languages.registerSignatureHelpProvider("python", { signatureHelpTriggerCharacters: ["(", ","], signatureHelpRetriggerCharacters: [",", ")"], provideSignatureHelp(...) { ... } })`
   - `provideSignatureHelp` 的解析策略（轻量、可维护）：
     - 读取光标前一段文本窗口（例如最近 2000 字符），避免全量扫描。
     - 反向扫描定位“当前调用”的最近一个未闭合 `(`，同时跟踪 `()[]{}` 深度，忽略嵌套调用里的逗号。
     - 在找到的 `(` 左侧提取函数名标识符（`/[A-Za-z_]\\w*$/`），暂不支持点号链（如 `mod.func(`）的精确签名；若后续需要再扩展。
     - 计算 `activeParameter`：统计该 `(` 到光标位置之间、深度为 0 的 `,` 数量（同样忽略嵌套括号）。
   - 签名来源合并：
     - 先尝试从当前 model 里用现有 `tryGetPythonFunctionSignature()` 找到 `def name(...)`。
     - 其次从 `parseContextSymbols(contextCode).functions` 里取。
     - 最后从“内置函数签名表”里取。
   - 将签名字符串拆成 Monaco 需要的结构：
     - `SignatureInformation.label`：完整签名（如 `print(*objects, sep=' ', end='\\n', file=None, flush=False)`）
     - `parameters`：对括号内参数列表按逗号拆分（保留原始片段作为 label），用于高亮当前参数。

4. 增强 CompletionItemProvider（可选但推荐）
   - 额外注册一个“内置符号”的 CompletionItemProvider（与现有上下文补全并存）：
     - 内置函数：插入 `name($0)` snippet，并展示签名作为 documentation。
     - 内置常量：插入 `True/False/None`，kind 用 Keyword/Constant。
   - 保持现有上下文补全逻辑不变，避免回归。

5. 手动验证用例（本地）
   - 输入 `print(` 应弹出参数提示；输入 `,` 时 active 参数高亮切换。
   - 用户代码里定义 `def foo(a, b=1): ...`，输入 `foo(` 也应弹出签名提示。
   - 上下文代码里定义的函数，输入 `name(` 也应提示签名（并保持“上下文”来源可区分，若需要可在文案中标注）。
   - 内置常量 `True/False/None` 在补全列表中可见。

6. 质量检查
   - 运行 `npm run lint` 与 `npx tsc -b` 确认无类型/语法问题。
   - 如遇到与现有 HoverProvider/CompletionItemProvider 冲突，调整 Provider 返回值/触发字符以降低干扰。

## 交付物
- 修改 `src/monaco/setupMonaco.ts`（新增 SignatureHelpProvider；可选新增内置补全）。
-（可选）新增 `src/monaco/pythonBuiltins.ts` 用于维护内置签名表（若表较长则拆分）。

## 回滚方案
- 若出现提示干扰或性能问题：
  - 先关闭新增 SignatureHelpProvider 的注册；保留其它逻辑不变即可恢复到当前行为。
