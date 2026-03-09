import { useLocation } from 'react-router-dom';
import { lazy } from 'react';

import { PRACTICE_CHALLENGE_PREFIX } from '@/constants/routes';

const ExamChallengePage = lazy(() => import('./ExamChallengePage'));
const PracticeChallengePage = lazy(() => import('./PracticeChallengePage'));

export default function ChallengePage() {
  const location = useLocation();
  const isPracticeRoute = location.pathname.startsWith(PRACTICE_CHALLENGE_PREFIX);

  return isPracticeRoute
    ? <PracticeChallengePage key={location.pathname} />
    : <ExamChallengePage key={location.pathname} />;
}
