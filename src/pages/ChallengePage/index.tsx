import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
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
import { useThemeStore } from '../../store/useThemeStore';
import { getMonacoTheme } from '../../utils/theme';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { RunControls } from "./components";
import { useChallengeContextCode, useEditorDecorations } from "./hooks";

export default function ChallengePage() {
  const navigate = useNavigate();
  const themeId = useThemeStore((state) => state.themeId);
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

  const [depsModalOpen, setDepsModalOpen] = useState(false);
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [contextDraft, setContextDraft] = useState("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [roadNetwork, setRoadNetworkLocal] = useState<RoadNetwork | null>(null);

  // 同步代码到 store 与编辑器
  const applyCodeToEditor = useCallback((nextCode: string) => {
    setCode(nextCode);
    if (editorRef.current) {
      editorRef.current.setValue(nextCode);
    }
  }, [setCode]);

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
    applyCodeToEditor(fallbackChallenge.starterCode);
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
    applyCodeToEditor(challenge.starterCode);
    resetEditorRuntimeState();
    testCasesRef.current = challenge.testCases;

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
    setGraphResult,
    setPositioningData,
    setPositioningResult,
    applyCodeToEditor,
  ]);

  const effectiveContextCode = useChallengeContextCode({
    testCases: challenge.testCases,
    contextCode,
    roadNetwork,
    debugMode,
    debugStartCoord,
    debugEndCoord,
    isPathfindingChallenge,
    isPositioningChallenge,
  });

  const enabledBreakpointLines = useMemo(
    () => breakpoints.filter((b) => b.enabled).map((b) => b.line),
    [breakpoints],
  );

  const { clearEditorRunError, showEditorRunError, handleEditorMount } = useEditorDecorations({
    editorRef,
    breakpoints,
    currentLine,
    hoverLine,
    toggleBreakpoint,
    setHoverLine,
  });

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
      ? <><span>测试用例</span><span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${allPassed ? "theme-badge-success" : "theme-badge-fail"}`}>{passedCount}/{totalCount}</span></>
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
    <Layout className="flex flex-col h-full theme-page theme-app">
      {messageContextHolder}
      <Layout.Header className="flex items-center pl-1.5 pr-2 h-12! shrink-0 theme-toolbar">
        <Space size={4} align="center" className="min-w-0">
          {user?.task.memberName && user?.team.name && (
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
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
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>自定义起终点</span>
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
          <ThemeSwitcher />
          {results !== null && (
            <span className={`text-xs font-medium ${allPassed ? "theme-text-success" : "theme-text-danger"}`}>
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
                    <div className="px-4 py-3 overflow-y-auto flex-1 theme-subtle theme-border" style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
                      <div className="text-[13px] font-semibold mb-1">{challenge.title}</div>
                      <pre className="text-xs whitespace-pre-wrap font-sans leading-5 m-0" style={{ color: 'var(--text-secondary)' }}>
                        {challenge.description}
                      </pre>
                    </div>
                    <div className="px-3 py-1.5 shrink-0 flex items-center gap-2 theme-toolbar">
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>查看解法：</span>
                      <Select
                      size="small"
                      placeholder="选择解法"
                      popupMatchSelectWidth={false}
                      style={{ minWidth: 120 }}
                      options={challenge.solutions.map((s, i) => ({ value: i, label: s.label }))}
                       onChange={(idx: number) => {
                         const sol = challenge.solutions[idx];
                         if (!sol) return;
                         applyCodeToEditor(sol.code);
                       }}
                       value={null}
                     />
                   </div>
                </div>
              </Pane>
              {/* Editor */}
              <Pane minSize={200} className="min-h-0">
                <div className="theme-editor-shell theme-editor-shell--framed theme-glow">
                  <div className="theme-editor-chrome">
                    <div className="theme-editor-chrome__left">
                      <div className="theme-editor-chrome__dots"><span /><span /><span /></div>
                      <span className="theme-editor-chrome__title">solve.py</span>
                    </div>
                    <div className="theme-editor-chrome__meta">
                      <span className="theme-editor-chip">Python</span>
                      <span className="theme-editor-chip">Challenge</span>
                    </div>
                  </div>
                  <div className="theme-editor-body">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      theme={getMonacoTheme(themeId)}
                      value={code}
                      onChange={(v) => setCode(v ?? "")}
                      onMount={handleEditorMount}
                      options={{
                        minimap: { enabled: false },
                        glyphMargin: true,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        fontSize: 13,
                        fontLigatures: true,
                        smoothScrolling: true,
                        renderLineHighlight: "all",
                        bracketPairColorization: { enabled: true },
                        guides: { bracketPairs: true, indentation: true },
                        padding: { top: 14 },
                      }}
                    />
                  </div>
                </div>
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



