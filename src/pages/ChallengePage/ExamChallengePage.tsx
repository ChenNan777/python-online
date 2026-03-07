import { useCallback, useEffect, useMemo, useState } from 'react';
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
  getLatestHistoryCode,
} from './adapters/examChallengeAdapter';
import ChallengeWorkspace from './components/ChallengeWorkspace';
import ExamHistoryModal from './components/ExamHistoryModal';
import { useExamAssignment } from './hooks/useExamAssignment';
import { useExamHistory } from './hooks/useExamHistory';

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
  const [bootstrapReady, setBootstrapReady] = useState(false);
  const {
    assignment,
    loading,
    error,
    savePending,
    saveError,
    submitPending,
    submitError,
    lastSavedCode,
    loadAssignment,
    saveCode,
    submitWork,
  } = useExamAssignment({
    userId,
    isPositioningChallenge,
  });
  const { records, loading: historyLoading, error: historyError, loadHistory } = useExamHistory();

  useEffect(() => {
    if (!challenge || !user?.task) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [challenge, navigate, user]);

  useEffect(() => {
    if (!challenge || userId === null) {
      return;
    }

    let active = true;
    (async () => {
      const assignmentInfo = await loadAssignment();
      if (!active) {
        return;
      }

      if (assignmentInfo?.taskId && assignmentInfo.memberId) {
        const historyRecords = await loadHistory(assignmentInfo.taskId, assignmentInfo.memberId);
        if (!active) {
          return;
        }
        const latestCode = getLatestHistoryCode(historyRecords);
        if (latestCode) {
          setInitialCode(latestCode);
          setCurrentCode(latestCode);
        }
      }

      if (active) {
        setBootstrapReady(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [challenge, loadAssignment, loadHistory, userId]);

  useEffect(() => {
    if (!bootstrapReady || !assignment) {
      return;
    }

    if (currentCode === lastSavedCode) {
      return;
    }

    const timer = window.setTimeout(() => {
      saveCode(currentCode).catch(() => undefined);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [assignment, bootstrapReady, currentCode, lastSavedCode, saveCode]);

  const roadScene = useMemo(() => buildExamRoadNetwork(assignment), [assignment]);
  const positioningScene = useMemo(
    () => buildExamPositioningScene(assignment),
    [assignment],
  );

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
        await saveCode(currentCode);
      }

      if (isPositioningChallenge) {
        if (!positioningResult || !assignment.targetId) {
          message.error('请先运行定位分析代码并生成结果');
          return;
        }

        await submitWork({
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

        await submitWork({ pathPlanningData });
      }

      message.success('提交成功');
      if (assignment.taskId && assignment.memberId) {
        await loadHistory(assignment.taskId, assignment.memberId);
      }
    } catch (submitActionError) {
      message.error(submitActionError instanceof Error ? submitActionError.message : '提交失败');
    }
  }, [
    assignment,
    currentCode,
    graphResult,
    isPositioningChallenge,
    lastSavedCode,
    loadHistory,
    positioningResult,
    saveCode,
    roadScene.roadNetwork,
    submitWork,
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
        sceneNotice={loading ? '考试场景加载中' : (isPositioningChallenge ? positioningScene.sceneNotice : roadScene.sceneNotice)}
        onCodeChange={setCurrentCode}
        leftActions={(
          <Space size={6}>
            <Button size="small" onClick={() => setHistoryOpen(true)} disabled={historyLoading}>
              历史代码
            </Button>
            {error ? <Tag color="error">作业加载失败</Tag> : null}
            {historyError ? <Tag color="warning">历史代码加载失败</Tag> : null}
          </Space>
        )}
        rightActions={(
          <Space size={6}>
            {savePending ? <Tag color="processing">保存中</Tag> : null}
            {!savePending && saveError ? <Tag color="error">保存失败</Tag> : null}
            {!savePending && !saveError && lastSavedCode !== null ? <Tag color="success">已保存</Tag> : null}
            {submitError ? <Tag color="error">提交失败</Tag> : null}
            <Button size="small" type="primary" loading={submitPending} onClick={handleSubmit}>
              提交作业
            </Button>
          </Space>
        )}
      />
      <ExamHistoryModal
        open={historyOpen}
        loading={historyLoading}
        records={records}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestoreHistory}
      />
    </>
  );
}
