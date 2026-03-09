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
    enabled: userId !== null,
  });
}
