import { useMutation } from '@tanstack/react-query';

import { saveExamCode } from './examApi';

export function useSaveCodeMutation() {
  return useMutation({
    // 保存接口只负责落库，页面本地“已保存”状态由调用方自行更新。
    mutationFn: saveExamCode,
  });
}
