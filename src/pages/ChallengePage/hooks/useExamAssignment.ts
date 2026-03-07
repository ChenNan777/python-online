import { useCallback, useMemo, useState } from 'react';

import type {
  PositioningAnalysisData,
  StudentTrainingAssignmentVO,
  StudentTrainingWorkSubmitDTO,
} from '@/services/admin/types';
import {
  studentOperationCodeAssignmentInfoUsingGet,
  studentOperationCodeSaveCodeUsingPost,
  studentOperationCodeSubmitUsingPost,
} from '@/services/admin/xueshengxunlianzuoyeguanli';

import { getOperationTypeByChallenge, getWorkTypeByChallenge } from '../adapters/examChallengeAdapter';

type UseExamAssignmentArgs = {
  userId: number | null;
  isPositioningChallenge: boolean;
};

export function useExamAssignment(args: UseExamAssignmentArgs) {
  const { userId, isPositioningChallenge } = args;
  const [assignment, setAssignment] = useState<StudentTrainingAssignmentVO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savePending, setSavePending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [submitPending, setSubmitPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSavedCode, setLastSavedCode] = useState<string | null>(null);

  const operationType = useMemo(
    () => getOperationTypeByChallenge(isPositioningChallenge),
    [isPositioningChallenge],
  );
  const workType = useMemo(
    () => getWorkTypeByChallenge(isPositioningChallenge),
    [isPositioningChallenge],
  );

  const loadAssignment = useCallback(async () => {
    if (userId === null) {
      setAssignment(null);
      setError('当前用户 ID 无效，无法加载考试作业。');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await studentOperationCodeAssignmentInfoUsingGet({
        params: { userId },
      });
      setAssignment(response.data);
      return response.data;
    } catch (loadError) {
      setAssignment(null);
      setError(loadError instanceof Error ? loadError.message : '加载考试作业失败');
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const saveCode = useCallback(async (sourceCode: string) => {
    if (!assignment?.taskId || !assignment.memberId || !assignment.teamId) {
      throw new Error('考试作业基础信息不完整，无法保存代码');
    }

    setSavePending(true);
    setSaveError(null);
    try {
      await studentOperationCodeSaveCodeUsingPost({
        body: {
          taskId: assignment.taskId,
          memberId: assignment.memberId,
          teamId: assignment.teamId,
          operationType,
          programmingLanguage: 'Python',
          sourceCode,
        },
      });
      setLastSavedCode(sourceCode);
      return true;
    } catch (saveCodeError) {
      setSaveError(saveCodeError instanceof Error ? saveCodeError.message : '保存代码失败');
      throw saveCodeError;
    } finally {
      setSavePending(false);
    }
  }, [assignment, operationType]);

  const submitWork = useCallback(async (payload: {
    positioningData?: PositioningAnalysisData;
    pathPlanningData?: StudentTrainingWorkSubmitDTO['pathPlanningData'];
  }) => {
    if (!assignment?.taskId || !assignment.memberId || !assignment.teamId) {
      throw new Error('考试作业基础信息不完整，无法提交');
    }

    setSubmitPending(true);
    setSubmitError(null);
    try {
      const response = await studentOperationCodeSubmitUsingPost({
        body: {
          taskId: assignment.taskId,
          teamId: assignment.teamId,
          memberId: assignment.memberId,
          memberName: assignment.memberName,
          workType,
          positioningData: payload.positioningData,
          pathPlanningData: payload.pathPlanningData,
        },
      });
      return response.data;
    } catch (submitWorkError) {
      setSubmitError(submitWorkError instanceof Error ? submitWorkError.message : '提交作业失败');
      throw submitWorkError;
    } finally {
      setSubmitPending(false);
    }
  }, [assignment, workType]);

  return {
    assignment,
    loading,
    error,
    savePending,
    saveError,
    submitPending,
    submitError,
    lastSavedCode,
    workType,
    loadAssignment,
    saveCode,
    submitWork,
  };
}
