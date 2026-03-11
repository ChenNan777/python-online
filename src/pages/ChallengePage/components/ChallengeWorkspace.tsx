import { useMemo, useState, type ReactNode } from 'react';
import Editor from '@monaco-editor/react';
import { ExclamationCircleFilled } from '@ant-design/icons';
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
import { Pane, SplitPane } from 'react-split-pane';

import CodeEditorShell, { type CodeEditorBadge } from '@/components/CodeEditorShell';
import ContextCodeModal from '@/components/ContextCodeModal';
import ExtraDepsModal from '@/components/ExtraDepsModal';
import PageToolbar from '@/components/PageToolbar';
import RunControls from '@/components/RunControls';
import TestCasesPanel from '@/components/TestCasesPanel';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { getChallengePanelTab } from '@/constants/challenge';
import type { PositioningData } from '@/types';
import { getMonacoTheme } from '@/utils/theme';
import type { RoadNetwork } from '@/utils/parseRoadNetwork';

import type { Challenge } from '../challenges';
import { useChallengeWorkspaceRuntime } from '../hooks/useChallengeWorkspaceRuntime';
import RightPanelStack from '../../EditorPage/RightPanelStack';

type ChallengeWorkspaceProps = {
  challenge: Challenge;
  mode: 'practice' | 'exam';
  locked?: boolean;
  initialCode?: string;
  roadNetwork: RoadNetwork | null;
  positioningData: PositioningData | null;
  sceneNotice?: string | null;
  headerNotices?: { level: 'info' | 'warning' | 'error'; message: string }[];
  editorBadges?: CodeEditorBadge[];
  onCodeChange?: (code: string) => void;
  onBack?: () => void;
  leftActions?: ReactNode;
  centerContent?: ReactNode;
  rightActions?: ReactNode;
};

export default function ChallengeWorkspace(props: ChallengeWorkspaceProps) {
  const {
    challenge,
    mode,
    locked = false,
    initialCode,
    roadNetwork,
    positioningData,
    sceneNotice,
    headerNotices,
    editorBadges,
    onCodeChange,
    onBack,
    leftActions,
    centerContent,
    rightActions,
  } = props;

  const noticeItems = useMemo(() => {
    const items: { level: 'info' | 'warning' | 'error'; message: string }[] = [];
    if (sceneNotice) {
      items.push({ level: 'warning', message: sceneNotice });
    }
    if (headerNotices && headerNotices.length > 0) {
      items.push(...headerNotices);
    }
    return items;
  }, [headerNotices, sceneNotice]);

  const noticeTone = useMemo(() => {
    if (noticeItems.some((item) => item.level === 'error')) {
      return { color: 'var(--danger-strong)', title: '提示' };
    }
    if (noticeItems.some((item) => item.level === 'warning')) {
      return { color: 'var(--warning-strong)', title: '提示' };
    }
    if (noticeItems.length > 0) {
      return { color: 'var(--accent-primary)', title: '提示' };
    }
    return null;
  }, [noticeItems]);

  const [depsModalOpen, setDepsModalOpen] = useState(false);
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [contextDraft, setContextDraft] = useState('');
  const [messageApi, messageContextHolder] = message.useMessage();

  const {
    isPracticeRoute,
    themeId,
    memberName,
    teamName,
    isPathfindingChallenge,
    code,
    contextCode,
    setContextCode,
    debugMode,
    handleDebugModeChange,
    isRunning,
    depsLoading,
    basePackages,
    loadedPackages,
    loadExtraPackages,
    runCode,
    continueExec,
    handleStepOver,
    handleStepInto,
    handleStepOut,
    stopExec,
    handleCodeChange,
    applyCodeToEditor,
    handleEditorMount,
    results,
    consoleOutput,
    passedCount,
    totalCount,
    allPassed,
    hasContext,
  } = useChallengeWorkspaceRuntime({
    challenge,
    mode,
    initialCode,
    roadNetwork,
    positioningData,
    onCodeChange,
    messageApi,
  });

  const editorLocked = mode === 'exam' && locked;

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

  const descriptionNode = useMemo(() => {
    if (!isPathfindingChallenge) {
      return challenge.description;
    }

    const keyword = '路网邻接表';
    const chunks = challenge.description.split(keyword);
    if (chunks.length === 1) {
      return challenge.description;
    }

    const tooltipTitle = (
      <div className="text-xs leading-5 max-w-[340px]">
        <div className="font-semibold mb-1">路网邻接表是什么？</div>
        <div>
          这是把“真实路网”转换成可计算的图结构：每个节点是一个路口/折线点，边表示两点之间可通行的道路。
        </div>
        <div className="mt-2">
          <span style={{ opacity: 0.7, marginRight: 6 }}>•</span>
          graph[u][v] = 从 u 到 v 的道路距离（单位：米）
        </div>
        <div>
          <span style={{ opacity: 0.7, marginRight: 6 }}>•</span>
          u / v 是节点 ID（字符串），由路网中的经纬度点生成
        </div>
      </div>
    );

    return chunks.flatMap((chunk, index) => {
      if (index === chunks.length - 1) {
        return [chunk];
      }

      return [
        chunk,
        (
          <Tooltip key={`road-graph-tip-${index}`} title={tooltipTitle} placement="top" mouseEnterDelay={0.1}>
            <span
              tabIndex={0}
              style={{
                textDecoration: 'underline dotted',
                textUnderlineOffset: 3,
                cursor: 'help',
                color: 'var(--text-primary)',
              }}
            >
              {keyword}
            </span>
          </Tooltip>
        ),
      ];
    });
  }, [challenge.description, isPathfindingChallenge]);

  return (
    <Layout className="flex flex-col h-full theme-page theme-app">
      {messageContextHolder}
      <Layout.Header className="pl-1.5 pr-2 h-12! shrink-0 theme-toolbar" style={{ padding: '0 10px' }}>
        <PageToolbar
          className="flex items-center h-full"
          leftContent={(
            <>
              {memberName && teamName ? (
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {teamName} / {memberName}
                </span>
              ) : null}
              {isPracticeRoute && onBack ? (
                <Button size="small" onClick={onBack} disabled={isRunning}>
                  返回
                </Button>
              ) : null}
              {hasContext ? <Tag color="blue" className="text-xs">上下文</Tag> : null}
              {noticeTone ? (
                <Tooltip
                  title={(
                    <div className="text-xs leading-5">
                      {noticeItems.map((item, index) => (
                        <div key={`${item.level}-${index}`}>
                          <span style={{ opacity: 0.7, marginRight: 6 }}>•</span>
                          {item.message}
                        </div>
                      ))}
                    </div>
                  )}
                  placement="bottom"
                >
                  <span className="theme-toolbar-notice-icon" style={{ color: noticeTone.color }}>
                    <ExclamationCircleFilled />
                  </span>
                </Tooltip>
              ) : null}
              {isPracticeRoute ? (
                <Tooltip title="加载额外依赖" placement="bottom">
                  <span>
                    <Button size="small" onClick={() => setDepsModalOpen(true)} disabled={isRunning || depsLoading}>加载依赖</Button>
                  </span>
                </Tooltip>
              ) : null}
              {isPracticeRoute ? (
                <Tooltip title="添加隐藏上下文代码" placement="bottom">
                  <span>
                    <Button size="small" onClick={() => { setContextDraft(contextCode); setContextModalOpen(true); }} disabled={isRunning}>上下文</Button>
                  </span>
                </Tooltip>
              ) : null}
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
          centerContent={centerContent}
          rightContent={(
            <Space size={6} className="theme-toolbar-group">
              <ThemeSwitcher />
              {results !== null ? (
                <span className={`theme-toolbar-pill ${allPassed ? 'theme-text-success' : 'theme-text-danger'}`}>
                  {passedCount}/{totalCount} 通过
                </span>
              ) : null}
              {rightActions}
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
                      {descriptionNode}
                    </pre>
                  </div>
                  {isPracticeRoute ? (
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
                  ) : null}
                </div>
              </Pane>
              <Pane minSize={200} className="min-h-0">
                <CodeEditorShell
                  title="solve.py"
                  badges={["Python"]}
                  extraBadges={editorBadges}
                  actions={(
                    <RunControls
                      onRun={runCode}
                      onContinue={continueExec}
                      onStepOver={handleStepOver}
                      onStepInto={handleStepInto}
                      onStepOut={handleStepOut}
                      onStop={stopExec}
                      disabled={editorLocked}
                      disabledReason="考试已截止"
                    />
                  )}
                >
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
                      readOnly: editorLocked,
                      domReadOnly: editorLocked,
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
