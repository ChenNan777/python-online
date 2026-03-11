import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitExamWork } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useSubmitWorkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitExamWork,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: examQueryKeys.history(variables.assignment.taskId, variables.assignment.memberId),
      });
    },
  });
}
