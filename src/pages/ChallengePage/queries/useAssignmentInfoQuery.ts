import { useQuery } from '@tanstack/react-query';

import { fetchAssignmentInfo } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useAssignmentInfoQuery(args: {
  userId: number | null;
  operationType: string;
}) {
  const { userId, operationType } = args;

  return useQuery({
    queryKey: examQueryKeys.assignment(userId, operationType),
    queryFn: () => fetchAssignmentInfo(userId as number),
    // 没有合法 userId 时直接禁止请求，避免 queryFn 中出现无意义断言调用。
    enabled: userId !== null,
  });
}
