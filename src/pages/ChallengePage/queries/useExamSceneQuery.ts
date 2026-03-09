import { useQuery } from '@tanstack/react-query';

import type { StudentTrainingAssignmentVO } from '@/services/admin/types';

import { fetchExamPositioningScene } from '../adapters/examChallengeAdapter';

import { examQueryKeys } from './queryKeys';

export function useExamSceneQuery(args: {
  assignment: StudentTrainingAssignmentVO | null;
  enabled?: boolean;
}) {
  const { assignment, enabled = true } = args;
  const targetId = assignment?.targetId;

  return useQuery({
    queryKey: examQueryKeys.positioningScene(targetId),
    queryFn: () => fetchExamPositioningScene(assignment as StudentTrainingAssignmentVO),
    // 仅定位题且 targetId 可用时才查询，避免普通题型误入定位场景请求。
    enabled: enabled && assignment !== null && Boolean(targetId),
  });
}
