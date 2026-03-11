import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { saveExamRoadData } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useSaveExamRoadDataMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveExamRoadData,
    onSuccess: () => {
      message.success('路网数据已保存');
      queryClient.invalidateQueries({ queryKey: examQueryKeys.roadData() });
    },
    onError: (error) => {
      console.error('Failed to save road network:', error);
      message.error('保存路网数据失败');
    },
  });
}
