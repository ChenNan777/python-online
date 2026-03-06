import { useCallback, useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import type { OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";

type RunErrorArgs = {
  message: string;
  lineno?: number | null;
  filename?: string;
};

type Breakpoint = {
  line: number;
  enabled: boolean;
};

type UseEditorDecorationsArgs = {
  editorRef: MutableRefObject<MonacoEditor.IStandaloneCodeEditor | null>;
  breakpoints: Breakpoint[];
  currentLine: number | null;
  hoverLine: number | null;
  allBreakpointLines: number[];
  enabledBreakpointLines: number[];
  toggleBreakpoint: (line: number) => void;
  setHoverLine: (line: number | null) => void;
};

export function useEditorDecorations(args: UseEditorDecorationsArgs) {
  const {
    editorRef,
    breakpoints,
    currentLine,
    hoverLine,
    allBreakpointLines,
    enabledBreakpointLines,
    toggleBreakpoint,
    setHoverLine,
  } = args;

  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);
  const hasRunErrorMarkerRef = useRef(false);
  const decorationsRef = useRef<string[]>([]);

  const clearEditorRunError = useCallback(() => {
    hasRunErrorMarkerRef.current = false;
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const model = editor.getModel();
    if (!model) return;
    monaco.editor.setModelMarkers(model, "python-run", []);
  }, [editorRef]);

  const showEditorRunError = useCallback(
    (error: RunErrorArgs) => {
      const editor = editorRef.current;
      const monaco = monacoRef.current;
      if (!editor || !monaco) return;
      const model = editor.getModel();
      if (!model) return;
      const rawLine = typeof error.lineno === "number" && Number.isFinite(error.lineno) ? error.lineno : null;
      const line = error.filename === "<user_code>"
        ? Math.min(Math.max(1, rawLine ?? 1), model.getLineCount()) : 1;
      monaco.editor.setModelMarkers(model, "python-run", [{
        severity: monaco.MarkerSeverity.Error,
        message: error.filename && error.filename !== "<user_code>"
          ? `上下文代码错误：${error.message}` : error.message,
        startLineNumber: line,
        startColumn: 1,
        endLineNumber: line,
        endColumn: model.getLineMaxColumn(line),
      }]);
      hasRunErrorMarkerRef.current = true;
      editor.revealLineInCenter(line);
    },
    [editorRef],
  );

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const newDecorations: MonacoEditor.IModelDeltaDecoration[] = [];
    const enabledSet = new Set(enabledBreakpointLines);
    const anySet = new Set(allBreakpointLines);
    for (const breakpoint of breakpoints) {
      const line = breakpoint.line;
      const isCurrent = currentLine === line;
      const isEnabled = enabledSet.has(line);
      newDecorations.push({
        range: { startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: 1 },
        options: {
          isWholeLine: false,
          glyphMarginClassName: isCurrent
            ? isEnabled ? "my-glyph-margin-current-breakpoint" : "my-glyph-margin-current-breakpoint-disabled"
            : isEnabled ? "my-glyph-margin-breakpoint" : "my-glyph-margin-breakpoint-disabled",
          glyphMarginHoverMessage: { value: isEnabled ? "断点" : "断点（停用）" },
        },
      });
    }
    if (hoverLine !== null && hoverLine !== currentLine && !anySet.has(hoverLine)) {
      newDecorations.push({
        range: { startLineNumber: hoverLine, startColumn: 1, endLineNumber: hoverLine, endColumn: 1 },
        options: { isWholeLine: false, glyphMarginClassName: "my-glyph-margin-breakpoint-hover" },
      });
    }
    if (currentLine !== null) {
      if (!anySet.has(currentLine)) {
        newDecorations.push({
          range: { startLineNumber: currentLine, startColumn: 1, endLineNumber: currentLine, endColumn: 1 },
          options: {
            isWholeLine: false,
            glyphMarginClassName: "my-glyph-margin-current",
            glyphMarginHoverMessage: { value: "当前执行行" },
          },
        });
      }
      newDecorations.push({
        range: { startLineNumber: currentLine, startColumn: 1, endLineNumber: currentLine, endColumn: 1 },
        options: { isWholeLine: true, className: "my-content-execution-line" },
      });
    }
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
  }, [allBreakpointLines, breakpoints, currentLine, editorRef, enabledBreakpointLines, hoverLine]);

  const handleEditorMount = useCallback<OnMount>((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    const model = editor.getModel();
    if (model) monaco.editor.setModelLanguage(model, "python");
    clearEditorRunError();
    editor.onDidChangeModelContent(() => {
      if (!hasRunErrorMarkerRef.current) return;
      clearEditorRunError();
    });
    editor.onMouseDown((event) => {
      if (event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const lineNumber = event.target.position?.lineNumber;
        if (lineNumber) toggleBreakpoint(lineNumber);
      }
    });
    editor.onMouseMove((event) => {
      const isGutter =
        event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN ||
        event.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS;
      if (!isGutter) {
        setHoverLine(null);
        return;
      }
      setHoverLine(event.target.position?.lineNumber ?? null);
    });
    editor.onMouseLeave(() => setHoverLine(null));
  }, [clearEditorRunError, editorRef, setHoverLine, toggleBreakpoint]);

  return {
    clearEditorRunError,
    showEditorRunError,
    handleEditorMount,
  };
}
