import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitExamWork } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useSubmitWorkMutation(args: {
  userId: number | null;
  operationType: string;
}) {
  const queryClient = useQueryClient();
  const { userId, operationType } = args;

  return useMutation({
    mutationFn: submitExamWork,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: examQueryKeys.history(variables.assignment.taskId, variables.assignment.memberId),
        }),
        queryClient.invalidateQueries({
          queryKey: examQueryKeys.assignment(userId, operationType),
        }),
      ]);
    },
  });
}
