import { useMutation } from '@tanstack/react-query';

import { saveExamCode } from './examApi';

export function useSaveCodeMutation() {
  return useMutation({
    mutationFn: saveExamCode,
  });
}
