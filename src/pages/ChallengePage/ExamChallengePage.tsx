import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Space, Tag, Tooltip, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { DASHBOARD_PATH } from '@/constants/routes';
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
  buildExamPositioningScene,
  buildExamRoadNetwork,
  buildPathPlanningSubmitPayload,
} from './adapters/examChallengeAdapter';
import ChallengeWorkspace from './components/ChallengeWorkspace';
import ExamHistoryModal from './components/ExamHistoryModal';
import { useAssignmentInfoQuery } from './queries/useAssignmentInfoQuery';
import { useExamHistoryQuery } from './queries/useExamHistoryQuery';
import { useExamSceneQuery } from './queries/useExamSceneQuery';
import { useSaveCodeMutation } from './queries/useSaveCodeMutation';
import { useSubmitWorkMutation } from './queries/useSubmitWorkMutation';
import { useExamAutoSave } from './hooks/useExamAutoSave';
import { useExamEditorCode } from './hooks/useExamEditorCode';

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
  const historyRecords = useMemo(() => historyQuery.data ?? [], [historyQuery.data]);

  const saveCodeMutation = useSaveCodeMutation();
  const submitWorkMutation = useSubmitWorkMutation({ userId, operationType });

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

  const canAutoSave =
    assignment != null &&
    assignment.taskId != null &&
    assignment.memberId != null &&
    assignment.teamId != null &&
    !assignmentQuery.isLoading &&
    !historyQuery.isLoading;
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

  const roadScene = useMemo(() => buildExamRoadNetwork(assignment), [assignment]);
  const positioningScene = useMemo(() => {
    if (sceneQuery.data) {
      return sceneQuery.data;
    }

    return buildExamPositioningScene(assignment);
  }, [assignment, sceneQuery.data]);

  const roadNetwork = isPositioningRole ? null : roadScene.roadNetwork;
  const positioningData = isPositioningRole ? positioningScene.positioningData : null;
  const sceneNotice = useMemo(() => {
    if (assignmentQuery.isLoading) {
      return '考试场景加载中';
    }

    if (isPositioningRole) {
      return sceneQuery.isLoading ? '定位场景加载中' : positioningScene.sceneNotice;
    }

    return roadScene.sceneNotice;
  }, [
    assignmentQuery.isLoading,
    isPositioningRole,
    positioningScene.sceneNotice,
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

  const handleSubmit = useCallback(async () => {
    if (!assignment) {
      message.error('考试作业信息尚未加载完成');
      return;
    }

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
        if (!positioningResult || !assignment.targetId) {
          message.error('请先运行定位分析代码并生成结果');
          return false;
        }

        await submitWorkMutation.mutateAsync({
          assignment,
          workType,
          positioningData: {
            uavId: Number(assignment.targetId),
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
    } catch (submitActionError) {
      message.error(submitActionError instanceof Error ? submitActionError.message : '提交失败');
    }
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
  ]);

  if (!challenge) {
    return null;
  }

  const leftActions = (
    <Space size={6}>
      <Button size="small" onClick={() => setHistoryOpen(true)} disabled={historyQuery.isLoading}>
        历史代码
      </Button>
      {assignmentQuery.error ? <Tag color="error">作业加载失败</Tag> : null}
      {historyQuery.error ? <Tag color="warning">历史代码加载失败</Tag> : null}
      {sceneQuery.error ? <Tag color="warning">定位场景加载失败</Tag> : null}
    </Space>
  );

  const rightActions = (
    <Space size={6}>
      {saveCodeMutation.isPending ? <Tag color="processing">保存中</Tag> : null}
      {!saveCodeMutation.isPending && saveCodeMutation.error ? (
        <Tooltip
          title={saveCodeMutation.error instanceof Error ? saveCodeMutation.error.message : '保存失败'}
        >
          <Tag color="error">保存失败</Tag>
        </Tooltip>
      ) : null}
      {!saveCodeMutation.isPending && !saveCodeMutation.error && lastSavedCode !== null ? <Tag color="success">已保存</Tag> : null}
      {submitWorkMutation.error ? <Tag color="error">提交失败</Tag> : null}
      <Button size="small" type="primary" loading={submitWorkMutation.isPending} onClick={handleSubmit}>
        提交作业
      </Button>
    </Space>
  );

  return (
    <>
      <ChallengeWorkspace
        challenge={challenge}
        mode="exam"
        initialCode={initialCode}
        roadNetwork={roadNetwork}
        positioningData={positioningData}
        sceneNotice={sceneNotice}
        onCodeChange={setCurrentCode}
        leftActions={leftActions}
        rightActions={rightActions}
      />
      <ExamHistoryModal
        open={historyOpen}
        loading={historyQuery.isLoading}
        records={historyRecords}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestoreHistory}
      />
    </>
  );
}
