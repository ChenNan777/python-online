import { useQuery } from '@tanstack/react-query';

import { fetchExamRoadData } from './examApi';
import { examQueryKeys } from './queryKeys';

export function useExamRoadDataQuery(args?: { enabled?: boolean }) {
  const enabled = args?.enabled ?? true;

  return useQuery({
    queryKey: examQueryKeys.roadData(),
    queryFn: fetchExamRoadData,
    enabled,
  });
}
