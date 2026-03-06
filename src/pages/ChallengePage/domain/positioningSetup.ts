import { generatePositioningData } from "../../../utils/generatePositioning";
import { escapeJsonForPyString } from "./escapeJsonForPyString";

export function buildPositioningSetup(): string {
  const positioningData = generatePositioningData();
  const stationsJson = escapeJsonForPyString(positioningData.stations);
  const measurementsJson = escapeJsonForPyString(positioningData.measurements);
  return `import json as __pjson__
stations = __pjson__.loads('${stationsJson}')
measurements = __pjson__.loads('${measurementsJson}')`;
}
