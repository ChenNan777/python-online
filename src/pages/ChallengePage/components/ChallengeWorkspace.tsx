import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Editor from '@monaco-editor/react';
import {
  Button,
  Layout,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
  message,
} from 'antd';
import type { editor as MonacoEditor } from 'monaco-editor';
import { Pane, SplitPane } from 'react-split-pane';

import CodeEditorShell from '@/components/CodeEditorShell';
import ContextCodeModal from '@/components/ContextCodeModal';
import ExtraDepsModal from '@/components/ExtraDepsModal';
import PageToolbar from '@/components/PageToolbar';
import RunControls from '@/components/RunControls';
import TestCasesPanel from '@/components/TestCasesPanel';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import {
  getChallengePanelTab,
  PATHFINDING_CHALLENGE_ID,
  POSITIONING_CHALLENGE_ID,
} from '@/constants/challenge';
import { usePyodideWorkerRuntime } from '@/features/pythonRunner';
import { useAuthStore } from '@/store/useAuthStore';
import { usePythonStore } from '@/store/usePythonStore';
import { useThemeStore } from '@/store/useThemeStore';
import type { PositioningData } from '@/types';
import { getMonacoTheme } from '@/utils/theme';
import type { RoadNetwork } from '@/utils/parseRoadNetwork';

import type { Challenge } from '../challenges';
import type { TestResult } from '../useChallengeRunner';
import { useChallengeContextCode, useEditorDecorations } from '../hooks';
import RightPanelStack from '../../EditorPage/RightPanelStack';

type ChallengeWorkspaceProps = {
  challenge: Challenge;
  mode: 'practice' | 'exam';
  initialCode?: string;
  roadNetwork: RoadNetwork | null;
  positioningData: PositioningData | null;
  sceneNotice?: string | null;
  onCodeChange?: (code: string) => void;
  onBack?: () => void;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
};

export default function ChallengeWorkspace(props: ChallengeWorkspaceProps) {
  const {
    challenge,
    mode,
    initialCode,
    roadNetwork,
    positioningData,
    sceneNotice,
    onCodeChange,
    onBack,
    leftActions,
    rightActions,
  } = props;

  const isPracticeRoute = mode === 'practice';
  const themeId = useThemeStore((state) => state.themeId);
  const { user } = useAuthStore();
  const isPathfindingChallenge = challenge.id === PATHFINDING_CHALLENGE_ID;
  const isPositioningChallenge = challenge.id === POSITIONING_CHALLENGE_ID;
  const testCasesRef = useRef(challenge.testCases);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const appliedCodeRef = useRef<string | null>(null);

  const {
    code,
    setCode,
    contextCode,
    setContextCode,
    breakpoints,
    toggleBreakpoint,
    setBreakpoints,
    isRunning,
    currentLine,
    hoverLine,
    setHoverLine,
    pausedDepth,
    output,
    setGraphData,
    setGraphResult,
    setRoadNetwork,
    setVariableScopes,
    setCurrentLine,
    setIsPaused,
    setPositioningData,
    setPositioningResult,
    debugMode,
    setDebugMode,
    debugStartCoord,
    setDebugStartCoord,
    debugEndCoord,
    setDebugEndCoord,
    setChallengeMode,
  } = usePythonStore();

  const [depsModalOpen, setDepsModalOpen] = useState(false);
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [contextDraft, setContextDraft] = useState('');
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [messageApi, messageContextHolder] = message.useMessage();

  const applyCodeToEditor = useCallback((nextCode: string) => {
    setCode(nextCode);
    onCodeChange?.(nextCode);
    if (editorRef.current) {
      editorRef.current.setValue(nextCode);
    }
  }, [onCodeChange, setCode]);

  const handleCodeChange = useCallback((nextCode: string) => {
    setCode(nextCode);
    onCodeChange?.(nextCode);
  }, [onCodeChange, setCode]);

  const clearGraphState = useCallback(() => {
    setGraphData(null);
    setGraphResult(null);
    setRoadNetwork(null);
  }, [setGraphData, setGraphResult, setRoadNetwork]);

  const clearPositioningState = useCallback(() => {
    setPositioningData(null);
    setPositioningResult(null);
  }, [setPositioningData, setPositioningResult]);

  const resetEditorRuntimeState = useCallback(() => {
    setBreakpoints([]);
    setResults(null);
    setVariableScopes([]);
    setCurrentLine(null);
    setIsPaused(false);
  }, [setBreakpoints, setCurrentLine, setIsPaused, setVariableScopes]);

  useEffect(() => {
    setChallengeMode(isPracticeRoute);
  }, [isPracticeRoute, setChallengeMode]);

  useEffect(() => {
    testCasesRef.current = challenge.testCases;
  }, [challenge.testCases]);

  useEffect(() => {
    const nextCode = initialCode ?? challenge.starterCode;
    const appliedKey = `${challenge.id}:${nextCode}`;
    if (appliedCodeRef.current === appliedKey) {
      return;
    }

    appliedCodeRef.current = appliedKey;
    applyCodeToEditor(nextCode);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetEditorRuntimeState();
    setContextCode('');
  }, [applyCodeToEditor, challenge.id, challenge.starterCode, initialCode, resetEditorRuntimeState, setContextCode]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetEditorRuntimeState();

    if (isPathfindingChallenge) {
      setRoadNetwork(roadNetwork);
      setGraphResult(null);
      clearPositioningState();
      return;
    }

    if (isPositioningChallenge) {
      setPositioningData(positioningData);
      setPositioningResult(null);
      clearGraphState();
      return;
    }

    clearGraphState();
    clearPositioningState();
  }, [
    challenge.id,
    clearGraphState,
    clearPositioningState,
    isPathfindingChallenge,
    isPositioningChallenge,
    positioningData,
    resetEditorRuntimeState,
    roadNetwork,
    setGraphResult,
    setPositioningData,
    setPositioningResult,
    setRoadNetwork,
  ]);

  const effectiveContextCode = useChallengeContextCode({
    testCases: challenge.testCases,
    contextCode,
    roadNetwork,
    positioningData,
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
    depsLoading,
    basePackages,
    loadedPackages,
    loadExtraPackages,
    runCode,
    continueExec,
    stepOver,
    stepInto,
    stepOut,
    stopExec,
  } = usePyodideWorkerRuntime({
    code,
    contextCode: effectiveContextCode,
    enabledBreakpointLines,
    clearEditorRunError,
    showEditorRunError,
    messageApi,
  });

  useEffect(() => {
    const resultLine = output.find((line) => line.startsWith('__RESULTS__:'));
    if (!resultLine) {
      return;
    }

    try {
      const parsed: { passed: boolean; actual: string; expected: string }[] = JSON.parse(
        resultLine.slice('__RESULTS__:'.length),
      );
      setResults(
        parsed.map((result, index) => ({
          ...result,
          description: testCasesRef.current[index]?.description ?? `测试 ${index + 1}`,
        })),
      );
    } catch {
      // ignore parse failure
    }
  }, [output]);

  const baseDepth = Math.max(1, pausedDepth);
  const handleStepOver = useCallback(() => stepOver(baseDepth), [baseDepth, stepOver]);
  const handleStepInto = useCallback(() => stepInto(baseDepth), [baseDepth, stepInto]);
  const handleStepOut = useCallback(() => stepOut(baseDepth), [baseDepth, stepOut]);

  const handleDebugModeChange = useCallback((enabled: boolean) => {
    setDebugMode(enabled);
    setGraphResult(null);
    if (!enabled) {
      setDebugStartCoord(null);
      setDebugEndCoord(null);
    }
  }, [setDebugEndCoord, setDebugMode, setDebugStartCoord, setGraphResult]);

  const consoleOutput = useMemo(
    () => output.filter((line) => !line.startsWith('__RESULTS__:')),
    [output],
  );
  const passedCount = results?.filter((result) => result.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = results !== null && totalCount > 0 && passedCount === totalCount;
  const hasContext = contextCode.trim().length > 0;

  const extraPanels = useMemo(() => [{
    key: 'test-cases',
    title: results !== null
      ? <><span>测试用例</span><span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${allPassed ? 'theme-badge-success' : 'theme-badge-fail'}`}>{passedCount}/{totalCount}</span></>
      : '测试用例',
    content: (
      <TestCasesPanel
        testCases={challenge.testCases}
        results={results}
        consoleOutput={consoleOutput}
        allPassed={allPassed}
      />
    ),
  }], [allPassed, challenge.testCases, consoleOutput, passedCount, results, totalCount]);

  return (
    <Layout className="flex flex-col h-full theme-page theme-app">
      {messageContextHolder}
      <Layout.Header className="pl-1.5 pr-2 h-12! shrink-0 theme-toolbar" style={{ padding: '0 10px' }}>
        <PageToolbar
          className="flex items-center h-full"
          leftContent={(
            <>
              {user?.task?.memberName && user?.team.name ? (
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {user.team.name} / {user.task.memberName}
                </span>
              ) : null}
              {isPracticeRoute && onBack ? (
                <Button size="small" onClick={onBack} disabled={isRunning}>
                  返回
                </Button>
              ) : null}
              {hasContext ? <Tag color="blue" className="text-xs">上下文</Tag> : null}
              {sceneNotice ? <Tag color="gold">{sceneNotice}</Tag> : null}
              <Tooltip title="加载额外依赖" placement="bottom">
                <span>
                  <Button size="small" onClick={() => setDepsModalOpen(true)} disabled={isRunning || depsLoading}>加载依赖</Button>
                </span>
              </Tooltip>
              <Tooltip title="添加隐藏上下文代码" placement="bottom">
                <span>
                  <Button size="small" onClick={() => { setContextDraft(contextCode); setContextModalOpen(true); }} disabled={isRunning}>上下文</Button>
                </span>
              </Tooltip>
              {isPathfindingChallenge && isPracticeRoute ? (
                <Tooltip title="开启后可拖动起终点验证算法" placement="bottom">
                  <Space size={4} align="center">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>自定义起终点</span>
                    <Switch size="small" checked={debugMode} onChange={handleDebugModeChange} disabled={isRunning} />
                  </Space>
                </Tooltip>
              ) : null}
              {leftActions}
            </>
          )}
          rightContent={(
            <Space size={6} className="theme-toolbar-group">
              <ThemeSwitcher />
              {results !== null ? (
                <span className={`theme-toolbar-pill ${allPassed ? 'theme-text-success' : 'theme-text-danger'}`}>
                  {passedCount}/{totalCount} 通过
                </span>
              ) : null}
              {rightActions}
              <RunControls
                onRun={runCode}
                onContinue={continueExec}
                onStepOver={handleStepOver}
                onStepInto={handleStepInto}
                onStepOut={handleStepOut}
                onStop={stopExec}
              />
            </Space>
          )}
        />
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
          <Pane minSize={400} defaultSize="58%" className="min-h-0">
            <SplitPane direction="vertical" dividerClassName="thick" className="h-full">
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
                      options={challenge.solutions.map((solution, index) => ({ value: index, label: solution.label }))}
                      onChange={(index: number) => {
                        const solution = challenge.solutions[index];
                        if (!solution) {
                          return;
                        }
                        applyCodeToEditor(solution.code);
                      }}
                      value={null}
                    />
                  </div>
                </div>
              </Pane>
              <Pane minSize={200} className="min-h-0">
                <CodeEditorShell title="solve.py" badges={["Python", "Challenge"]}>
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    theme={getMonacoTheme(themeId)}
                    value={code}
                    onChange={(value) => handleCodeChange(value ?? '')}
                    onMount={handleEditorMount}
                    options={{
                      minimap: { enabled: false },
                      glyphMargin: true,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      fontSize: 13,
                      fontLigatures: true,
                      smoothScrolling: true,
                      renderLineHighlight: 'all',
                      bracketPairColorization: { enabled: true },
                      guides: { bracketPairs: true, indentation: true },
                      padding: { top: 14 },
                    }}
                  />
                </CodeEditorShell>
              </Pane>
            </SplitPane>
          </Pane>
          <Pane minSize={280} className="min-h-0">
            <div className="h-full">
              <RightPanelStack
                activeTab={getChallengePanelTab(challenge.id)}
                roadNetwork={roadNetwork}
                isPracticeMode={isPracticeRoute}
                extraPanels={extraPanels}
              />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </Layout>
  );
}
