export const examQueryKeys = {
  assignment: (userId: number | null, operationType: string) => ['exam-assignment', userId, operationType] as const,
  history: (taskId: number | undefined, memberId: number | undefined) => ['exam-history', taskId, memberId] as const,
  positioningScene: (targetId: string | undefined) => ['exam-positioning-scene', targetId] as const,
};
