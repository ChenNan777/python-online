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
      // 提交成功后同时刷新作业信息与历史记录，保证状态标签和历史代码列表同步。
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
