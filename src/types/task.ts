import type { TaskProgressStatus } from '../constants/challenge';

export interface TaskInfo {
  id: string;
  name: string;
  description: string;
  status?: TaskProgressStatus;
  startTime?: Date;
  endTime?: Date;
  stage?: string;
  memberName?: string;
  memberRole?: string;
  taskStatus?: string; // 原始的 taskStatus 值
  isComplete?: boolean;
}
