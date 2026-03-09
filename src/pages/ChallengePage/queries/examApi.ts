import type {
  PositioningAnalysisData,
  StudentOperationCodeVo,
  StudentTrainingAssignmentVO,
  StudentTrainingWorkSubmitDTO,
} from '@/services/admin/types';
import {
  studentOperationCodeAssignmentInfoUsingGet,
  studentOperationCodeListStudentTaskIdMemberIdUsingGet,
  studentOperationCodeSaveCodeUsingPost,
  studentOperationCodeSubmitUsingPost,
} from '@/services/admin/xueshengxunlianzuoyeguanli';

export function sortExamHistoryRecords(records: StudentOperationCodeVo[]): StudentOperationCodeVo[] {
  return [...records].sort((left, right) => {
    const leftTime = Date.parse(left.updatedAt ?? left.submitTime ?? left.createdAt ?? '');
    const rightTime = Date.parse(right.updatedAt ?? right.submitTime ?? right.createdAt ?? '');
    return rightTime - leftTime;
  });
}

export async function fetchAssignmentInfo(userId: number): Promise<StudentTrainingAssignmentVO> {
  const response = await studentOperationCodeAssignmentInfoUsingGet({
    params: { userId },
  });
  return response.data;
}

export async function fetchExamHistory(taskId: number, memberId: number): Promise<StudentOperationCodeVo[]> {
  const response = await studentOperationCodeListStudentTaskIdMemberIdUsingGet({
    params: { taskId, memberId },
  });
  return sortExamHistoryRecords(response.data);
}

export async function saveExamCode(args: {
  assignment: StudentTrainingAssignmentVO;
  operationType: string;
  sourceCode: string;
}) {
  const { assignment, operationType, sourceCode } = args;
  if (!assignment.taskId || !assignment.memberId || !assignment.teamId) {
    throw new Error('考试作业基础信息不完整，无法保存代码');
  }

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

  return sourceCode;
}

export async function submitExamWork(args: {
  assignment: StudentTrainingAssignmentVO;
  workType: 4 | 5;
  positioningData?: PositioningAnalysisData;
  pathPlanningData?: StudentTrainingWorkSubmitDTO['pathPlanningData'];
}) {
  const { assignment, workType, positioningData, pathPlanningData } = args;
  if (!assignment.taskId || !assignment.memberId || !assignment.teamId) {
    throw new Error('考试作业基础信息不完整，无法提交');
  }

  const response = await studentOperationCodeSubmitUsingPost({
    body: {
      taskId: assignment.taskId,
      teamId: assignment.teamId,
      memberId: assignment.memberId,
      memberName: assignment.memberName,
      workType,
      positioningData,
      pathPlanningData,
    },
  });

  return response.data;
}
