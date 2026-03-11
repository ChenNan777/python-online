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

export type ExamAssignmentDeadline = string | number | number[] | null;

export type ExamAssignmentInfo = StudentTrainingAssignmentVO & {
  deadline?: ExamAssignmentDeadline;
};

export function sortExamHistoryRecords(records: StudentOperationCodeVo[]): StudentOperationCodeVo[] {
  // 历史记录展示与恢复都依赖“最近一次优先”，统一在数据层排序。
  return [...records].sort((left, right) => {
    const leftTime = Date.parse(left.updatedAt ?? left.submitTime ?? left.createdAt ?? '');
    const rightTime = Date.parse(right.updatedAt ?? right.submitTime ?? right.createdAt ?? '');
    return rightTime - leftTime;
  });
}

export async function fetchAssignmentInfo(userId: number): Promise<ExamAssignmentInfo> {
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
  // 这三个字段缺一不可，否则后端无法识别当前学生作业上下文。
  if (assignment.taskId == null || assignment.memberId == null || assignment.teamId == null) {
    throw new Error('考试作业基础信息不完整，无法保存代码');
  }

  const needsTargetId = operationType === '1';
  const parsedTargetId = assignment.targetId != null ? Number(assignment.targetId) : null;
  const targetId = Number.isFinite(parsedTargetId) ? parsedTargetId : null;
  if (needsTargetId && targetId === null) {
    throw new Error('定位作业目标 ID 缺失，无法保存代码');
  }

  await studentOperationCodeSaveCodeUsingPost({
    body: {
      taskId: assignment.taskId,
      memberId: assignment.memberId,
      teamId: assignment.teamId,
      operationType,
      targetId: targetId ?? undefined,
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
  // 提交与保存共用同一组作业身份字段，先在前端做显式校验，避免发送无效请求。
  if (assignment.taskId == null || assignment.memberId == null || assignment.teamId == null) {
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
