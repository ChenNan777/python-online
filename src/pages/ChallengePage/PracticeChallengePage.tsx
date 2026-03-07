import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DASHBOARD_PATH, PRACTICE_PATH } from '@/constants/routes';
import { getChallengeIdByType } from '@/constants/challenge';
import { generatePositioningData } from '@/utils/generatePositioning';
import { parseRoadNetwork, type RoadNetwork } from '@/utils/parseRoadNetwork';

import { CHALLENGES } from './challenges';
import ChallengeWorkspace from './components/ChallengeWorkspace';

export default function PracticeChallengePage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const challengeId = getChallengeIdByType(type);
  const challenge = useMemo(
    () => (challengeId ? CHALLENGES.find((item) => item.id === challengeId) ?? null : null),
    [challengeId],
  );
  const [roadNetwork, setRoadNetwork] = useState<RoadNetwork | null>(null);

  useEffect(() => {
    if (!challenge) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [challenge, navigate]);

  useEffect(() => {
    if (!challenge || challenge.id !== 'shortest-path') {
      return;
    }

    let active = true;
    fetch('/road.geojson')
      .then((response) => response.json())
      .then((geojson) => {
        if (!active) {
          return;
        }
        setRoadNetwork(parseRoadNetwork(geojson));
      })
      .catch(() => {
        if (active) {
          setRoadNetwork(null);
        }
      });

    return () => {
      active = false;
    };
  }, [challenge]);

  if (!challenge) {
    return null;
  }

  return (
    <ChallengeWorkspace
      challenge={challenge}
      mode="practice"
      roadNetwork={challenge.id === 'shortest-path' ? roadNetwork : null}
      positioningData={challenge.id === 'bearing-positioning' ? generatePositioningData() : null}
      onBack={() => navigate(PRACTICE_PATH)}
    />
  );
}
