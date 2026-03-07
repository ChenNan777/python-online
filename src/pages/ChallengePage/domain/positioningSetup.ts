import type { PositioningData } from "../../../types";
import { escapeJsonForPyString } from "./escapeJsonForPyString";

export function buildPositioningSetup(positioningData: PositioningData | null): string {
  if (!positioningData) {
    return "";
  }

  const stationsJson = escapeJsonForPyString(positioningData.stations);
  const measurementsJson = escapeJsonForPyString(positioningData.measurements);
  return `import json as __pjson__
stations = __pjson__.loads('${stationsJson}')
measurements = __pjson__.loads('${measurementsJson}')`;
}
