import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import {
  Button,
  Layout,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  CornerDownRight,
  CornerUpLeft,
  LoaderCircle,
  Play,
  PlayCircle,
  SquareStop,
  StepForward,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import type { editor as MonacoEditor } from "monaco-editor";
import { Pane, SplitPane } from "react-split-pane";
import { CHALLENGES } from "./challenges";
import type { TestResult } from "./useChallengeRunner";
import { usePythonStore } from "../../store/usePythonStore";
import { usePyodideWorkerRuntime } from "../../features/pythonRunner";
import ExtraDepsModal from "../../components/ExtraDepsModal";
import ContextCodeModal from "../../components/ContextCodeModal";
import RightPanelStack from "../EditorPage/RightPanelStack";
import TestCasesPanel from "../../components/TestCasesPanel";
import {
  DASHBOARD_PATH,
  PRACTICE_CHALLENGE_PREFIX,
  PRACTICE_PATH,
} from '../../constants/routes';
import {
  getChallengePanelTab,
  getChallengeIdByType,
  PATHFINDING_CHALLENGE_ID,
  POSITIONING_CHALLENGE_ID,
} from '../../constants/challenge';
import { generatePositioningData } from "../../utils/generatePositioning";
import { parseRoadNetwork } from '../../utils/parseRoadNetwork';
import type { RoadNetwork } from '../../utils/parseRoadNetwork';
import { useAuthStore } from '../../store/useAuthStore';
import { buildPathfindingSetup, buildPositioningSetup } from "./domain";

function RunControls(props: {
  onRun: () => void;
  onContinue: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
  onStop: () => void;
}) {
  const { isRunning, isPaused, isReady, hasBreakpoints, runStatus } =
    usePythonStore((s) => ({
      isRunning: s.isRunning,
      isPaused: s.isPaused,
      isReady: s.isReady,
      hasBreakpoints: s.breakpoints.some((b) => b.enabled),
      runStatus: s.runStatus,
    }));

  if (!isRunning) {
    return (
      <Tooltip title={isReady ? "运行" : "加载中..."} placement="bottom">
        <span>
          <Button
            size="small"
            type="primary"
            shape="circle"
            onClick={props.onRun}
            disabled={!isReady}
            icon={isReady ? <PlayCircle size={14} /> : <LoaderCircle size={14} className="animate-spin" />}
          />
        </span>
      </Tooltip>
    );
  }

  if (!hasBreakpoints && !isPaused && runStatus === "running") {
    return (
      <Space size={4}>
        <Tooltip title="运行中" placement="bottom">
          <span>
            <Button size="small" type="primary" shape="circle" disabled
              icon={<LoaderCircle size={14} className="animate-spin" />} />
          </span>
        </Tooltip>
        <Tooltip title="结束运行" placement="bottom">
          <span>
            <Button size="small" shape="circle" danger onClick={props.onStop}
              icon={<SquareStop size={14} />} />
          </span>
        </Tooltip>
      </Space>
    );
  }

  return (
    <Space size={4}>
      <Tooltip title="继续运行" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onContinue}
            disabled={!isPaused} icon={<Play size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="单步（跳过函数）" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepOver}
            disabled={!isPaused} icon={<StepForward size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行进函数" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepInto}
            disabled={!isPaused} icon={<CornerDownRight size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行出函数" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepOut}
            disabled={!isPaused} icon={<CornerUpLeft size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="结束运行" placement="bottom">
        <span>
          <Button size="small" shape="circle" danger onClick={props.onStop}
            icon={<SquareStop size={14} />} />
        </span>
      </Tooltip>
    </Space>
  );
}

function escapeJsonForPyString(value: unknown): string {
  return JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export default function ChallengePage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const { user } = useAuthStore();

  // 检测当前是练习模式还是考试模式
  const isPracticeRoute = location.pathname.startsWith(PRACTICE_CHALLENGE_PREFIX);

  // 根据路由参数确定挑战ID
  const challengeId = getChallengeIdByType(type);

  const fallbackChallenge = CHALLENGES[0]!;
  const matchedChallenge = challengeId
    ? CHALLENGES.find((c) => c.id === challengeId) ?? null
    : null;
  const isValidChallenge = Boolean(challengeId && matchedChallenge);
  const challenge = matchedChallenge ?? fallbackChallenge;
  // 当前挑战类型标记
  const isPathfindingChallenge = challenge.id === PATHFINDING_CHALLENGE_ID;
  const isPositioningChallenge = challenge.id === POSITIONING_CHALLENGE_ID;
  const testCasesRef = useRef(challenge.testCases);

  useEffect(() => {
    if (!isValidChallenge) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [isValidChallenge, navigate]);

  const {
    code, setCode,
    contextCode, setContextCode,
    breakpoints, toggleBreakpoint, setBreakpoints,
    isRunning,
    currentLine, hoverLine, setHoverLine,
    pausedDepth,
    output,
    setGraphData, setGraphResult,
    setVariableScopes, setCurrentLine, setIsPaused,
    setPositioningData, setPositioningResult,
    debugMode, setDebugMode,
    debugStartCoord, setDebugStartCoord,
    debugEndCoord, setDebugEndCoord,
    isPracticeMode: storePracticeMode, setChallengeMode,
  } = usePythonStore();

  // 在考试模式下强制关闭练习模式
  const isPracticeMode = isPracticeRoute ? storePracticeMode : false;

  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);
  const hasRunErrorMarkerRef = useRef(false);
  const decorationsRef = useRef<string[]>([]);

  const [depsModalOpen, setDepsModalOpen] = useState(false);
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [contextDraft, setContextDraft] = useState("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [roadNetwork, setRoadNetworkLocal] = useState<RoadNetwork | null>(null);

  // 清理地图状态
  const clearGraphState = useCallback(() => {
    setGraphData(null);
    setGraphResult(null);
  }, [setGraphData, setGraphResult]);

  // 清理定位状态
  const clearPositioningState = useCallback(() => {
    setPositioningData(null);
    setPositioningResult(null);
  }, [setPositioningData, setPositioningResult]);

  // 清理编辑态（断点/变量/暂停行等）
  const resetEditorRuntimeState = useCallback(() => {
    setBreakpoints([]);
    setResults(null);
    setVariableScopes([]);
    setCurrentLine(null);
    setIsPaused(false);
  }, [setBreakpoints, setCurrentLine, setIsPaused, setVariableScopes]);

  // On mount: load first challenge code into store
  useEffect(() => {
    setCode(fallbackChallenge.starterCode);
    resetEditorRuntimeState();
    setContextCode("");
    clearGraphState();
    clearPositioningState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 在练习路由下自动启用练习模式
  useEffect(() => {
    if (isPracticeRoute) {
      setChallengeMode(true);
    }
  }, [isPracticeRoute, setChallengeMode]);

  // Load road network when pathfinding challenge is selected
  useEffect(() => {
    if (isPathfindingChallenge) {
      fetch('/road.geojson')
        .then(res => res.json())
        .then(geojson => {
          const network = parseRoadNetwork(geojson);
          setRoadNetworkLocal(network);
          setGraphData(null);
        })
        .catch(err => console.error('加载路网失败:', err));
    } else {
      setRoadNetworkLocal(null);
    }
  }, [isPathfindingChallenge, setGraphData]);

  // Reset when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode);
    resetEditorRuntimeState();
    testCasesRef.current = challenge.testCases;
    if (editorRef.current) editorRef.current.setValue(challenge.starterCode);

    // 只初始化当前挑战需要的数据
    if (isPathfindingChallenge) {
      setGraphResult(null);
      clearPositioningState();
    } else if (isPositioningChallenge) {
      setPositioningData(generatePositioningData());
      setPositioningResult(null);
      clearGraphState();
    } else {
      clearGraphState();
      clearPositioningState();
    }
  }, [
    challenge.starterCode,
    challenge.testCases,
    clearGraphState,
    clearPositioningState,
    isPathfindingChallenge,
    isPositioningChallenge,
    resetEditorRuntimeState,
    setCode,
    setGraphResult,
    setPositioningData,
    setPositioningResult,
  ]);

  // Build effective context: test setup + optional road network + user context
  const effectiveContextCode = useMemo(() => {
    const testCasesPayload = challenge.testCases.map((tc) => ({
      args: tc.args,
      expected: tc.expected,
      tolerance: tc.tolerance,
      checkIsPosition: tc.checkIsPosition,
    }));
    const tcJson = escapeJsonForPyString(testCasesPayload);
    const testSetup = `import json as __json__\n__TEST_CASES__ = __json__.loads('${tcJson}')`;

    const graphSetup = isPathfindingChallenge
      ? buildPathfindingSetup({
        roadNetwork,
        debugMode,
        debugStartCoord,
        debugEndCoord,
      })
      : "";

    const positioningSetup = isPositioningChallenge ? buildPositioningSetup() : "";

    const parts = [testSetup, graphSetup, positioningSetup, contextCode].filter(Boolean);
    return parts.join("\n");
  }, [challenge.testCases, contextCode, roadNetwork, debugMode, debugStartCoord, debugEndCoord, isPathfindingChallenge, isPositioningChallenge]);

  const enabledBreakpointLines = useMemo(
    () => breakpoints.filter((b) => b.enabled).map((b) => b.line),
    [breakpoints],
  );
  const allBreakpointLines = useMemo(() => breakpoints.map((b) => b.line), [breakpoints]);

  const clearEditorRunError = useCallback(() => {
    hasRunErrorMarkerRef.current = false;
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const model = editor.getModel();
    if (!model) return;
    monaco.editor.setModelMarkers(model, "python-run", []);
  }, []);

  const showEditorRunError = useCallback(
    (args: { message: string; lineno?: number | null; filename?: string }) => {
      const editor = editorRef.current;
      const monaco = monacoRef.current;
      if (!editor || !monaco) return;
      const model = editor.getModel();
      if (!model) return;
      const rawLine = typeof args.lineno === "number" && Number.isFinite(args.lineno) ? args.lineno : null;
      const line = args.filename === "<user_code>"
        ? Math.min(Math.max(1, rawLine ?? 1), model.getLineCount()) : 1;
      monaco.editor.setModelMarkers(model, "python-run", [{
        severity: monaco.MarkerSeverity.Error,
        message: args.filename && args.filename !== "<user_code>"
          ? `上下文代码错误：${args.message}` : args.message,
        startLineNumber: line, startColumn: 1,
        endLineNumber: line, endColumn: model.getLineMaxColumn(line),
      }]);
      hasRunErrorMarkerRef.current = true;
      editor.revealLineInCenter(line);
    },
    [],
  );

  const {
    depsLoading, basePackages, loadedPackages, loadExtraPackages,
    runCode, continueExec, stepOver, stepInto, stepOut, stopExec,
  } = usePyodideWorkerRuntime({
    code,
    contextCode: effectiveContextCode,
    enabledBreakpointLines,
    clearEditorRunError,
    showEditorRunError,
    messageApi,
  });

  // Parse test results from output
  useEffect(() => {
    const resultLine = output.find((l) => l.startsWith("__RESULTS__:"));
    if (!resultLine) return;
    try {
      const parsed: { passed: boolean; actual: string; expected: string }[] =
        JSON.parse(resultLine.slice("__RESULTS__:".length));
      setResults(
        parsed.map((r, i) => ({
          ...r,
          description: testCasesRef.current[i]?.description ?? `测试 ${i + 1}`,
        })),
      );
    } catch { /* ignore */ }
  }, [output]);

  // Editor decorations
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const newDecorations: MonacoEditor.IModelDeltaDecoration[] = [];
    const enabledSet = new Set(enabledBreakpointLines);
    const anySet = new Set(allBreakpointLines);
    for (const bp of breakpoints) {
      const line = bp.line;
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
          options: { isWholeLine: false, glyphMarginClassName: "my-glyph-margin-current", glyphMarginHoverMessage: { value: "当前执行行" } },
        });
      }
      newDecorations.push({
        range: { startLineNumber: currentLine, startColumn: 1, endLineNumber: currentLine, endColumn: 1 },
        options: { isWholeLine: true, className: "my-content-execution-line" },
      });
    }
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
  }, [allBreakpointLines, breakpoints, currentLine, enabledBreakpointLines, hoverLine]);

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
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const lineNumber = e.target.position?.lineNumber;
        if (lineNumber) toggleBreakpoint(lineNumber);
      }
    });
    editor.onMouseMove((e) => {
      const isGutter =
        e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN ||
        e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS;
      if (!isGutter) { setHoverLine(null); return; }
      setHoverLine(e.target.position?.lineNumber ?? null);
    });
    editor.onMouseLeave(() => setHoverLine(null));
  }, [clearEditorRunError, toggleBreakpoint, setHoverLine]);

  const baseDepth = Math.max(1, pausedDepth);
  const handleStepOver = useCallback(() => stepOver(baseDepth), [baseDepth, stepOver]);
  const handleStepInto = useCallback(() => stepInto(baseDepth), [baseDepth, stepInto]);
  const handleStepOut = useCallback(() => stepOut(baseDepth), [baseDepth, stepOut]);

  const handleDebugModeChange = useCallback((enabled: boolean) => {
    setDebugMode(enabled);
    // Clear graph result when toggling debug mode
    setGraphResult(null);
    // Clear debug coordinates when turning off debug mode
    if (!enabled) {
      setDebugStartCoord(null);
      setDebugEndCoord(null);
    }
  }, [setDebugMode, setGraphResult, setDebugStartCoord, setDebugEndCoord]);

  const consoleOutput = useMemo(
    () => output.filter((l) => !l.startsWith("__RESULTS__:")),
    [output],
  );
  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = results !== null && totalCount > 0 && passedCount === totalCount;
  const hasContext = contextCode.trim().length > 0;

  const extraPanels = useMemo(() => [{
    key: "test-cases",
    title: results !== null
      ? <><span>测试用例</span><span className={`ml-1 font-normal ${allPassed ? "text-green-600" : "text-red-500"}`}>{passedCount}/{totalCount}</span></>
      : "测试用例",
    content: (
      <TestCasesPanel
        testCases={challenge.testCases}
        results={results}
        consoleOutput={consoleOutput}
        allPassed={allPassed}
      />
    ),
  }], [results, allPassed, passedCount, totalCount, challenge.testCases, consoleOutput]);

  if (!isValidChallenge) {
    return null;
  }

  return (
    <Layout className="flex flex-col h-full">
      {messageContextHolder}
      <Layout.Header className="flex items-center px-3 h-12! bg-white! border-b border-black/8 shrink-0">
        <Space size={8} align="center" className="min-w-0">
          {user?.task.memberName && user?.team.name && (
            <span className="text-sm font-medium text-black/85">
              {user.team.name} / {user.task.memberName}
            </span>
          )}
          {isPracticeRoute && (
            <Button
              size="small"
              onClick={() => navigate(PRACTICE_PATH)}
              disabled={isRunning}
            >
              返回
            </Button>
          )}
          {hasContext && <Tag color="blue" className="text-xs">上下文</Tag>}
          <Tooltip title="加载额外依赖" placement="bottom">
            <span>
              <Button size="small" onClick={() => setDepsModalOpen(true)}
                disabled={isRunning || depsLoading}>加载依赖</Button>
            </span>
          </Tooltip>
          <Tooltip title="添加隐藏上下文代码" placement="bottom">
            <span>
              <Button size="small" onClick={() => { setContextDraft(contextCode); setContextModalOpen(true); }}
                disabled={isRunning}>上下文</Button>
            </span>
          </Tooltip>
          {isPathfindingChallenge && isPracticeRoute && (
            <Tooltip title="开启后可拖动起终点验证算法" placement="bottom">
              <Space size={4} align="center">
                <span className="text-xs text-black/65">自定义起终点</span>
                <Switch
                  size="small"
                  checked={debugMode}
                  onChange={handleDebugModeChange}
                  disabled={isRunning}
                />
              </Space>
            </Tooltip>
          )}
        </Space>
        <div className="flex-1" />
        <Space size={8} align="center">
          {results !== null && (
            <span className={`text-xs font-medium ${allPassed ? "text-green-600" : "text-red-500"}`}>
              {passedCount}/{totalCount} 通过
            </span>
          )}
          <RunControls
            onRun={runCode}
            onContinue={continueExec}
            onStepOver={handleStepOver}
            onStepInto={handleStepInto}
            onStepOut={handleStepOut}
            onStop={stopExec}
          />
        </Space>
      </Layout.Header>

      <ExtraDepsModal
        open={depsModalOpen}
        loading={depsLoading}
        basePackages={basePackages}
        loadedPackages={loadedPackages}
        onClose={() => setDepsModalOpen(false)}
        onLoad={loadExtraPackages}
      />
      <ContextCodeModal
        open={contextModalOpen}
        value={contextDraft}
        onChange={setContextDraft}
        onClose={() => setContextModalOpen(false)}
        onSave={() => { setContextCode(contextDraft); setContextModalOpen(false); }}
      />

      <div className="flex-1 min-h-0">
        <SplitPane direction="horizontal" dividerClassName="thick" className="h-full">
          {/* Left: description + editor */}
          <Pane minSize={400} defaultSize="58%" className="min-h-0">
            <SplitPane direction="vertical" dividerClassName="thick" className="h-full">
              {/* Description */}
              <Pane minSize={150} defaultSize="35%" className="min-h-0">
                <div className="h-full flex flex-col">
                  <div className="px-4 py-3 border-b border-black/8 bg-[#fafafa] overflow-y-auto flex-1">
                    <div className="text-[13px] font-semibold mb-1">{challenge.title}</div>
                    <pre className="text-xs text-black/70 whitespace-pre-wrap font-sans leading-5 m-0">
                      {challenge.description}
                    </pre>
                  </div>
                  <div className="px-3 py-1.5 border-b border-black/8 bg-white shrink-0 flex items-center gap-2">
                    <span className="text-xs text-black/45">查看解法：</span>
                    <Select
                      size="small"
                      placeholder="选择解法"
                      popupMatchSelectWidth={false}
                      style={{ minWidth: 120 }}
                      options={challenge.solutions.map((s, i) => ({ value: i, label: s.label }))}
                      onChange={(idx: number) => {
                        const sol = challenge.solutions[idx];
                        if (!sol) return;
                        setCode(sol.code);
                        if (editorRef.current) editorRef.current.setValue(sol.code);
                      }}
                      value={null}
                    />
                  </div>
                </div>
              </Pane>
              {/* Editor */}
              <Pane minSize={200} className="min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs"
                  value={code}
                  onChange={(v) => setCode(v ?? "")}
                  onMount={handleEditorMount}
                  options={{
                    minimap: { enabled: false },
                    glyphMargin: true,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    fontSize: 13,
                    renderLineHighlight: "line",
                  }}
                />
              </Pane>
            </SplitPane>
          </Pane>
          {/* Right: debug panels (graph on top) + test results */}
          <Pane minSize={280} className="min-h-0">
            <div className="h-full">
              <RightPanelStack
                activeTab={
                  // 按挑战类型选择默认调试面板
                  getChallengePanelTab(challenge.id)
                }
                roadNetwork={roadNetwork}
                isPracticeMode={isPracticeMode}
                extraPanels={extraPanels}
              />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </Layout>
  );
}



