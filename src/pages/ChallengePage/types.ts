import type { StudentOperationCodeVo, StudentTrainingAssignmentVO } from '@/services/admin/types';
import type { PositioningData } from '@/types';
import type { RoadNetwork } from '@/utils/parseRoadNetwork';

import type { Challenge } from './challenges';

export type ChallengeWorkspaceMode = 'practice' | 'exam';

export type ChallengeSceneState = {
  roadNetwork: RoadNetwork | null;
  positioningData: PositioningData | null;
  sceneNotice: string | null;
};

export type ExamHistoryState = {
  records: StudentOperationCodeVo[];
  loading: boolean;
  error: string | null;
};

export type ExamAssignmentState = {
  assignment: StudentTrainingAssignmentVO | null;
  loading: boolean;
  error: string | null;
  savePending: boolean;
  saveError: string | null;
  submitPending: boolean;
  submitError: string | null;
  lastSavedCode: string | null;
};

export type ChallengeWorkspaceData = {
  challenge: Challenge;
  mode: ChallengeWorkspaceMode;
  initialCode?: string;
  scene: ChallengeSceneState;
};
