import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { DASHBOARD_PATH, EXAM_FINISHED_PATH } from '@/constants/routes';
import {
  EXAM_META_BY_CHALLENGE_ID,
  PATHFINDING_OPERATION_TYPE,
  PATHFINDING_WORK_TYPE,
  POSITIONING_TYPE,
  getChallengeIdByType,
} from '@/constants/challenge';
import { usePythonStore } from '@/store/usePythonStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { StudentOperationCodeVo } from '@/services/admin/types';

import { CHALLENGES } from './challenges';
import {
  buildExamRoadNetwork,
  buildPathPlanningSubmitPayload,
} from './adapters/examChallengeAdapter';
import ChallengeWorkspace from './components/ChallengeWorkspace';
import ExamHistoryModal from './components/ExamHistoryModal';
import { useAssignmentInfoQuery } from './queries/useAssignmentInfoQuery';
import { useExamHistoryQuery } from './queries/useExamHistoryQuery';
import { useExamRoadDataQuery } from './queries/useExamRoadDataQuery';
import { useExamSceneQuery } from './queries/useExamSceneQuery';
import { useSaveCodeMutation } from './queries/useSaveCodeMutation';
import { useSubmitWorkMutation } from './queries/useSubmitWorkMutation';
import { useExamAutoSave } from './hooks/useExamAutoSave';
import { useExamEditorCode } from './hooks/useExamEditorCode';
import { useExamDeadlineCountdown } from './hooks/useExamDeadlineCountdown';

function parseUserId(rawUserId: string | undefined): number | null {
  if (!rawUserId) {
    return null;
  }

  const parsed = Number(rawUserId);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function ExamChallengePage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  const rawUserId = useAuthStore((state) => state.user?.id);
  const hasUserTask = useAuthStore((state) => Boolean(state.user?.task));
  const userId = parseUserId(rawUserId);

  const challengeId = getChallengeIdByType(type);
  const challenge = useMemo(
    () => (challengeId ? CHALLENGES.find((item) => item.id === challengeId) ?? null : null),
    [challengeId],
  );

  const examMeta = challenge ? EXAM_META_BY_CHALLENGE_ID[challenge.id] : null;
  const challengeRole = examMeta?.role ?? null;
  const isPositioningRole = challengeRole === POSITIONING_TYPE;

  const { graphResult, positioningResult } = usePythonStore((state) => ({
    graphResult: state.graphResult,
    positioningResult: state.positioningResult,
  }));

  const operationType = examMeta?.operationType ?? PATHFINDING_OPERATION_TYPE;
  const workType = examMeta?.workType ?? PATHFINDING_WORK_TYPE;

  const assignmentQuery = useAssignmentInfoQuery({ userId, operationType });
  const assignment = assignmentQuery.data ?? null;

  const historyQuery = useExamHistoryQuery({
    taskId: assignment?.taskId,
    memberId: assignment?.memberId,
  });
  const sceneQuery = useExamSceneQuery({
    assignment,
    enabled: isPositioningRole,
  });
  const roadDataQuery = useExamRoadDataQuery({
    enabled: !isPositioningRole && assignment !== null,
  });
  const historyRecords = useMemo(() => historyQuery.data ?? [], [historyQuery.data]);

  const saveCodeMutation = useSaveCodeMutation();
  const submitWorkMutation = useSubmitWorkMutation();

  const [historyOpen, setHistoryOpen] = useState(false);
  const {
    initialCode,
    currentCode,
    lastSavedCode,
    setInitialCode,
    setCurrentCode,
    setLastSavedCode,
  } = useExamEditorCode({
    challenge,
    assignment,
    records: historyRecords,
    historyLoading: historyQuery.isLoading,
  });

  useEffect(() => {
    if (!challenge || !hasUserTask) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [challenge, hasUserTask, navigate]);

  const roadScene = useMemo(
    () => buildExamRoadNetwork({ assignment, roadNetworkGeoJson: roadDataQuery.data ?? null }),
    [assignment, roadDataQuery.data],
  );
  const positioningScene = useMemo(() => {
    if (sceneQuery.data) {
      return sceneQuery.data;
    }

    if (sceneQuery.error instanceof Error) {
      return {
        positioningData: null,
        sceneNotice: sceneQuery.error.message || '定位场景加载失败。',
      };
    }

    return {
      positioningData: null,
      sceneNotice: null,
    };
  }, [sceneQuery.data, sceneQuery.error]);

  const roadNetwork = isPositioningRole ? null : roadScene.roadNetwork;
  const positioningData = isPositioningRole ? positioningScene.positioningData : null;
  const assignmentTargetId = assignment?.targetId;
  const sceneNotice = useMemo(() => {
    if (assignmentQuery.isLoading) {
      return '考试场景加载中';
    }

    if (isPositioningRole) {
      if (!assignmentTargetId) {
        return '考试作业未下发目标ID（targetId），无法进行定位分析与提交。';
      }
      return sceneQuery.isLoading ? '定位场景加载中' : positioningScene.sceneNotice;
    }

    if (roadDataQuery.isLoading) {
      return '路径规划场景加载中';
    }

    if (roadDataQuery.error) {
      return '考试路网数据加载失败。';
    }

    return roadScene.sceneNotice;
  }, [
    assignmentQuery.isLoading,
    assignmentTargetId,
    isPositioningRole,
    positioningScene.sceneNotice,
    roadDataQuery.error,
    roadDataQuery.isLoading,
    roadScene.sceneNotice,
    sceneQuery.isLoading,
  ]);

  const handleRestoreHistory = useCallback((record: StudentOperationCodeVo) => {
    const nextCode = record.sourceCode ?? '';
    if (!nextCode) {
      return;
    }

    if (currentCode !== lastSavedCode && currentCode.trim().length > 0) {
      const confirmed = window.confirm('当前代码存在未保存修改，确认用历史代码覆盖吗？');
      if (!confirmed) {
        return;
      }
    }

    setInitialCode(nextCode);
    setCurrentCode(nextCode);
    setHistoryOpen(false);
  }, [currentCode, lastSavedCode, setCurrentCode, setHistoryOpen, setInitialCode]);

  const devDeadlineRaw = useMemo(() => {
    if (!import.meta.env.DEV) {
      return null;
    }

    const query = window.location.search;
    const match = query.match(/[?&]devDeadline=([^&]*)/);
    const raw = match?.[1];
    if (!raw) {
      return null;
    }

    const decoded = decodeURIComponent(raw.replace(/\+/g, '%2B')).trim();
    return decoded.length > 0 ? decoded : null;
  }, []);

  const [devDeadlineOverride, setDevDeadlineOverride] = useState<unknown>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!import.meta.env.DEV || devDeadlineRaw === null) {
        setDevDeadlineOverride(null);
        return;
      }

      if (/^[+-]\d+(\.\d+)?$/.test(devDeadlineRaw)) {
        const offsetSeconds = Number(devDeadlineRaw);
        if (!Number.isFinite(offsetSeconds)) {
          setDevDeadlineOverride(null);
          return;
        }
        setDevDeadlineOverride(Date.now() + offsetSeconds * 1000);
        return;
      }

      const numeric = Number(devDeadlineRaw);
      if (Number.isFinite(numeric)) {
        setDevDeadlineOverride(numeric);
        return;
      }

      setDevDeadlineOverride(devDeadlineRaw);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [devDeadlineRaw]);

  const deadlineCountdownState = useExamDeadlineCountdown(devDeadlineOverride ?? assignment?.deadline);
  const deadlineCountdown = deadlineCountdownState.countdown;
  const isDeadlineExpired = deadlineCountdownState.isExpired;

  const canAutoSave =
    assignment != null &&
    assignment.taskId != null &&
    assignment.memberId != null &&
    assignment.teamId != null &&
    !assignmentQuery.isLoading &&
    !historyQuery.isLoading &&
    !isDeadlineExpired;
  useExamAutoSave({
    enabled: canAutoSave,
    assignment,
    operationType,
    currentCode,
    lastSavedCode,
    delayMs: 1200,
    saveCodeMutation,
    onSaved: setLastSavedCode,
  });

  const handleSubmit = useCallback(async () => {
    if (!assignment) {
      message.error('考试作业信息尚未加载完成');
      return;
    }

    if (isDeadlineExpired) {
      message.error('考试已经截止，无法提交');
      return;
    }

    if (!assignment.targetId) {
      message.error('考试作业未下发目标ID（targetId），无法提交定位结果');
      return;
    }

    Modal.confirm({
      title: '确认提交作业？',
      icon: <ExclamationCircleFilled />,
      content: '提交后将无法撤回，也无法再次修改代码。确认要提交吗？',
      okText: '确认提交',
      cancelText: '取消',
      onOk: async () => {
        try {
          const ensureLatestSave = async () => {
            if (currentCode === lastSavedCode) {
              return;
            }

            const savedCode = await saveCodeMutation.mutateAsync({
              assignment,
              operationType,
              sourceCode: currentCode,
            });
            setLastSavedCode(savedCode);
          };

          const submitPositioningWork = async (): Promise<boolean> => {
            if (!assignment.targetId) {
              message.error('考试作业未下发目标ID（targetId），无法提交定位结果');
              return false;
            }

            if (!positioningResult) {
              message.error('请先运行定位分析代码并生成结果');
              return false;
            }

            const uavId = Number(assignment.targetId);
            if (!Number.isFinite(uavId)) {
              message.error('考试作业目标 ID 非法，无法提交定位结果');
              return false;
            }

            await submitWorkMutation.mutateAsync({
              assignment,
              workType,
              positioningData: {
                uavId,
                longitude: positioningResult.userLng,
                latitude: positioningResult.userLat,
                analysisDescription: '来自在线考试工作区提交',
              },
            });

            return true;
          };

          const submitPathPlanningWork = async (): Promise<boolean> => {
            const pathPlanningData = buildPathPlanningSubmitPayload({
              result: graphResult,
              roadNetwork: roadScene.roadNetwork,
            });
            if (!pathPlanningData) {
              message.error('请先运行路径规划代码并生成有效路径');
              return false;
            }

            await submitWorkMutation.mutateAsync({
              assignment,
              workType,
              pathPlanningData,
            });

            return true;
          };

          await ensureLatestSave();

          const submitted = isPositioningRole
            ? await submitPositioningWork()
            : await submitPathPlanningWork();
          if (!submitted) {
            return;
          }

          message.success('提交成功');
          navigate(EXAM_FINISHED_PATH, { replace: true });
        } catch (submitActionError) {
          console.error(submitActionError);
        }
      },
    });
  }, [
    assignment,
    currentCode,
    graphResult,
    isPositioningRole,
    lastSavedCode,
    positioningResult,
    operationType,
    roadScene.roadNetwork,
    saveCodeMutation,
    submitWorkMutation,
    setLastSavedCode,
    workType,
    isDeadlineExpired,
    navigate,
  ]);

  const headerNotices = useMemo(
    () => (assignmentQuery.error ? [{ level: 'error' as const, message: '作业加载失败' }] : []),
    [assignmentQuery.error],
  );

  const [showSavePending, setShowSavePending] = useState(false);
  const pendingShowTimerRef = useRef<number | null>(null);
  const pendingHideTimerRef = useRef<number | null>(null);
  const pendingShownAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (pendingShowTimerRef.current !== null) {
      window.clearTimeout(pendingShowTimerRef.current);
      pendingShowTimerRef.current = null;
    }
    if (pendingHideTimerRef.current !== null) {
      window.clearTimeout(pendingHideTimerRef.current);
      pendingHideTimerRef.current = null;
    }

    if (saveCodeMutation.isPending) {
      if (showSavePending) {
        return;
      }
      pendingShowTimerRef.current = window.setTimeout(() => {
        pendingShownAtRef.current = Date.now();
        setShowSavePending(true);
      }, 420);
      return () => {
        if (pendingShowTimerRef.current !== null) {
          window.clearTimeout(pendingShowTimerRef.current);
          pendingShowTimerRef.current = null;
        }
      };
    }

    if (!showSavePending) {
      return;
    }

    const shownAt = pendingShownAtRef.current;
    const elapsedMs = typeof shownAt === 'number' ? Date.now() - shownAt : 0;
    const minVisibleMs = 320;
    const remainingMs = Math.max(0, minVisibleMs - elapsedMs);

    pendingHideTimerRef.current = window.setTimeout(() => {
      pendingShownAtRef.current = null;
      setShowSavePending(false);
    }, remainingMs);

    return () => {
      if (pendingHideTimerRef.current !== null) {
        window.clearTimeout(pendingHideTimerRef.current);
        pendingHideTimerRef.current = null;
      }
    };
  }, [saveCodeMutation.isPending, showSavePending]);

  const editorBadges = showSavePending
    ? [{
      key: 'save-pending',
      className: 'theme-editor-chip--save',
      label: (
        <span className="theme-editor-inline-dots" style={{ color: 'var(--accent-primary)' }}>
          <span /><span /><span />
        </span>
      ),
      tooltip: '保存中',
    }]
    : saveCodeMutation.error
      ? [{
        key: 'save-error',
        className: 'theme-editor-chip--save',
        label: <CloseCircleFilled style={{ color: 'var(--danger-strong)' }} />,
        tooltip: saveCodeMutation.error instanceof Error ? saveCodeMutation.error.message : '保存失败',
      }]
      : lastSavedCode !== null
        ? [{
          key: 'save-ok',
          className: 'theme-editor-chip--save',
          label: <CheckCircleFilled style={{ color: 'var(--success-strong)' }} />,
          tooltip: '已保存',
        }]
        : [];

  const rightActions = (
    <Space size={6}>
      <Button
        className="theme-toolbar-submit-btn"
        size="small"
        loading={submitWorkMutation.isPending}
        disabled={isDeadlineExpired || (isPositioningRole && !assignment?.targetId)}
        onClick={handleSubmit}
      >
        提交作业
      </Button>
    </Space>
  );

  if (!challenge) {
    return <div>暂未加载到作业信息</div>;
  }

  return (
    <>
      <ChallengeWorkspace
        challenge={challenge}
        mode="exam"
        locked={isDeadlineExpired}
        initialCode={initialCode}
        roadNetwork={roadNetwork}
        positioningData={positioningData}
        sceneNotice={sceneNotice}
        headerNotices={headerNotices}
        editorBadges={editorBadges}
        onCodeChange={setCurrentCode}
        centerContent={deadlineCountdown}
        rightActions={rightActions}
      />
      <ExamHistoryModal
        open={historyOpen}
        loading={historyQuery.isLoading}
        refreshing={historyQuery.isFetching}
        hasError={Boolean(historyQuery.error)}
        records={historyRecords}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestoreHistory}
        onRefresh={() => void historyQuery.refetch()}
      />
    </>
  );
}
