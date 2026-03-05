export interface TaskInfo {
  id: string;
  name: string;
  description: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
}
