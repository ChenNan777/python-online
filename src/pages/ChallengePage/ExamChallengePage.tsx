import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Space, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { DASHBOARD_PATH } from '@/constants/routes';
import { getChallengeIdByType } from '@/constants/challenge';
import { usePythonStore } from '@/store/usePythonStore';
import { useAuthStore } from '@/store/useAuthStore';

import { CHALLENGES } from './challenges';
import {
  buildExamPositioningScene,
  buildExamRoadNetwork,
  buildPathPlanningSubmitPayload,
  getOperationTypeByChallenge,
  getLatestHistoryCode,
  getWorkTypeByChallenge,
} from './adapters/examChallengeAdapter';
import ChallengeWorkspace from './components/ChallengeWorkspace';
import ExamHistoryModal from './components/ExamHistoryModal';
import { useAssignmentInfoQuery } from './queries/useAssignmentInfoQuery';
import { useExamHistoryQuery } from './queries/useExamHistoryQuery';
import { useExamSceneQuery } from './queries/useExamSceneQuery';
import { useSaveCodeMutation } from './queries/useSaveCodeMutation';
import { useSubmitWorkMutation } from './queries/useSubmitWorkMutation';

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
  const { user } = useAuthStore();
  const challengeId = getChallengeIdByType(type);
  const challenge = useMemo(
    () => (challengeId ? CHALLENGES.find((item) => item.id === challengeId) ?? null : null),
    [challengeId],
  );
  const isPositioningChallenge = challenge?.id === 'bearing-positioning';
  const userId = parseUserId(user?.id);
  const { graphResult, positioningResult } = usePythonStore((state) => ({
    graphResult: state.graphResult,
    positioningResult: state.positioningResult,
  }));
  const [historyOpen, setHistoryOpen] = useState(false);
  const [initialCode, setInitialCode] = useState<string | undefined>(challenge?.starterCode);
  const [currentCode, setCurrentCode] = useState<string>(challenge?.starterCode ?? '');
  const [lastSavedCode, setLastSavedCode] = useState<string | null>(null);
  const bootstrapKeyRef = useRef<string | null>(null);
  const operationType = useMemo(
    () => getOperationTypeByChallenge(Boolean(isPositioningChallenge)),
    [isPositioningChallenge],
  );
  const workType = useMemo(
    () => getWorkTypeByChallenge(Boolean(isPositioningChallenge)),
    [isPositioningChallenge],
  );
  const assignmentQuery = useAssignmentInfoQuery({ userId, operationType });
  const assignment = assignmentQuery.data ?? null;
  const historyQuery = useExamHistoryQuery({
    taskId: assignment?.taskId,
    memberId: assignment?.memberId,
  });
  const sceneQuery = useExamSceneQuery({
    assignment,
    enabled: Boolean(isPositioningChallenge),
  });
  const records = useMemo(() => historyQuery.data ?? [], [historyQuery.data]);
  const saveCodeMutation = useSaveCodeMutation();
  const submitWorkMutation = useSubmitWorkMutation({ userId, operationType });

  useEffect(() => {
    if (!challenge || !user?.task) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [challenge, navigate, user]);

  useEffect(() => {
    if (!challenge || !assignment || historyQuery.isLoading) {
      return;
    }

    const latestCode = getLatestHistoryCode(records) ?? challenge.starterCode;
    const bootstrapKey = `${challenge.id}:${assignment.taskId ?? 'none'}:${assignment.memberId ?? 'none'}:${latestCode}`;
    if (bootstrapKeyRef.current === bootstrapKey) {
      return;
    }

    bootstrapKeyRef.current = bootstrapKey;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialCode(latestCode);
    setCurrentCode(latestCode);
    setLastSavedCode(latestCode);
  }, [assignment, challenge, historyQuery.isLoading, records]);

  useEffect(() => {
    if (!assignment || assignmentQuery.isLoading || historyQuery.isLoading) {
      return;
    }

    if (currentCode === lastSavedCode) {
      return;
    }

    const timer = window.setTimeout(() => {
      saveCodeMutation.mutate(
        {
          assignment,
          operationType,
          sourceCode: currentCode,
        },
        {
          onSuccess: (savedCode) => {
            setLastSavedCode(savedCode);
          },
        },
      );
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [assignment, assignmentQuery.isLoading, currentCode, historyQuery.isLoading, lastSavedCode, operationType, saveCodeMutation]);

  const roadScene = useMemo(() => buildExamRoadNetwork(assignment), [assignment]);
  const positioningScene = useMemo(() => {
    if (sceneQuery.data) {
      return sceneQuery.data;
    }

    return buildExamPositioningScene(assignment);
  }, [assignment, sceneQuery.data]);

  const handleRestoreHistory = useCallback((record: { sourceCode?: string }) => {
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
  }, [currentCode, lastSavedCode]);

  const handleSubmit = useCallback(async () => {
    if (!assignment) {
      message.error('考试作业信息尚未加载完成');
      return;
    }

    try {
      if (currentCode !== lastSavedCode) {
        const savedCode = await saveCodeMutation.mutateAsync({
          assignment,
          operationType,
          sourceCode: currentCode,
        });
        setLastSavedCode(savedCode);
      }

      if (isPositioningChallenge) {
        if (!positioningResult || !assignment.targetId) {
          message.error('请先运行定位分析代码并生成结果');
          return;
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
      } else {
        const pathPlanningData = buildPathPlanningSubmitPayload({
          result: graphResult,
          roadNetwork: roadScene.roadNetwork,
        });
        if (!pathPlanningData) {
          message.error('请先运行路径规划代码并生成有效路径');
          return;
        }

        await submitWorkMutation.mutateAsync({
          assignment,
          workType,
          pathPlanningData,
        });
      }

      message.success('提交成功');
    } catch (submitActionError) {
      message.error(submitActionError instanceof Error ? submitActionError.message : '提交失败');
    }
  }, [
    assignment,
    currentCode,
    graphResult,
    isPositioningChallenge,
    lastSavedCode,
    positioningResult,
    operationType,
    roadScene.roadNetwork,
    saveCodeMutation,
    submitWorkMutation,
    workType,
  ]);

  if (!challenge) {
    return null;
  }

  return (
    <>
      <ChallengeWorkspace
        challenge={challenge}
        mode="exam"
        initialCode={initialCode}
        roadNetwork={isPositioningChallenge ? null : roadScene.roadNetwork}
        positioningData={isPositioningChallenge ? positioningScene.positioningData : null}
        sceneNotice={
          assignmentQuery.isLoading
            ? '考试场景加载中'
            : isPositioningChallenge
              ? (sceneQuery.isLoading ? '定位场景加载中' : positioningScene.sceneNotice)
              : roadScene.sceneNotice
        }
        onCodeChange={setCurrentCode}
        leftActions={(
          <Space size={6}>
            <Button size="small" onClick={() => setHistoryOpen(true)} disabled={historyQuery.isLoading}>
              历史代码
            </Button>
            {assignmentQuery.error ? <Tag color="error">作业加载失败</Tag> : null}
            {historyQuery.error ? <Tag color="warning">历史代码加载失败</Tag> : null}
            {sceneQuery.error ? <Tag color="warning">定位场景加载失败</Tag> : null}
          </Space>
        )}
        rightActions={(
          <Space size={6}>
            {saveCodeMutation.isPending ? <Tag color="processing">保存中</Tag> : null}
            {!saveCodeMutation.isPending && saveCodeMutation.error ? <Tag color="error">保存失败</Tag> : null}
            {!saveCodeMutation.isPending && !saveCodeMutation.error && lastSavedCode !== null ? <Tag color="success">已保存</Tag> : null}
            {submitWorkMutation.error ? <Tag color="error">提交失败</Tag> : null}
            <Button size="small" type="primary" loading={submitWorkMutation.isPending} onClick={handleSubmit}>
              提交作业
            </Button>
          </Space>
        )}
      />
      <ExamHistoryModal
        open={historyOpen}
        loading={historyQuery.isLoading}
        records={records}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestoreHistory}
      />
    </>
  );
}
