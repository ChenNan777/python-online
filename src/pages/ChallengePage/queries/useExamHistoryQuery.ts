import { useQuery } from '@tanstack/react-query';

import { fetchExamHistory } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useExamHistoryQuery(args: {
  taskId: number | undefined;
  memberId: number | undefined;
}) {
  const { taskId, memberId } = args;

  return useQuery({
    queryKey: examQueryKeys.history(taskId, memberId),
    queryFn: () => fetchExamHistory(taskId as number, memberId as number),
    enabled: taskId !== undefined && memberId !== undefined,
  });
}
