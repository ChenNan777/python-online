import { useLocation } from 'react-router-dom';

import { PRACTICE_CHALLENGE_PREFIX } from '@/constants/routes';

import ExamChallengePage from './ExamChallengePage';
import PracticeChallengePage from './PracticeChallengePage';

export default function ChallengePage() {
  const location = useLocation();
  const isPracticeRoute = location.pathname.startsWith(PRACTICE_CHALLENGE_PREFIX);

  return isPracticeRoute
    ? <PracticeChallengePage key={location.pathname} />
    : <ExamChallengePage key={location.pathname} />;
}
