import { useMemo } from "react";

import type { PositioningData } from "../../../types";
import type { RoadNetwork } from "../../../utils/parseRoadNetwork";
import type { DebugCoord } from "../domain/pathfindingSetup";
import {
  buildPathfindingSetup,
  buildPositioningSetup,
  escapeJsonForPyString,
} from "../domain";

type ChallengeTestCase = {
  args: unknown;
  expected: unknown;
  tolerance?: number;
  checkIsPosition?: boolean;
};

type UseChallengeContextCodeArgs = {
  testCases: ChallengeTestCase[];
  contextCode: string;
  roadNetwork: RoadNetwork | null;
  positioningData: PositioningData | null;
  debugMode: boolean;
  debugStartCoord: DebugCoord | null;
  debugEndCoord: DebugCoord | null;
  isPathfindingChallenge: boolean;
  isPositioningChallenge: boolean;
};

export function useChallengeContextCode(args: UseChallengeContextCodeArgs): string {
  const {
    testCases,
    contextCode,
    roadNetwork,
    positioningData,
    debugMode,
    debugStartCoord,
    debugEndCoord,
    isPathfindingChallenge,
    isPositioningChallenge,
  } = args;

  return useMemo(() => {
    const testCasesPayload = testCases.map((testCase) => ({
      args: testCase.args,
      expected: testCase.expected,
      tolerance: testCase.tolerance,
      checkIsPosition: testCase.checkIsPosition,
    }));
    const testCasesJson = escapeJsonForPyString(testCasesPayload);
    const testSetup = `import json as __json__\n__TEST_CASES__ = __json__.loads('${testCasesJson}')`;

    const graphSetup = isPathfindingChallenge
      ? buildPathfindingSetup({
        roadNetwork,
        debugMode,
        debugStartCoord,
        debugEndCoord,
      })
      : "";

    const positioningSetup = isPositioningChallenge
      ? buildPositioningSetup(positioningData)
      : "";

    const parts = [testSetup, graphSetup, positioningSetup, contextCode].filter(Boolean);
    return parts.join("\n");
  }, [
    contextCode,
    debugEndCoord,
    debugMode,
    debugStartCoord,
    isPathfindingChallenge,
    isPositioningChallenge,
    positioningData,
    roadNetwork,
    testCases,
  ]);
}
