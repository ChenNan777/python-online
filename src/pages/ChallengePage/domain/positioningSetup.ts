import { generatePositioningData } from "../../../utils/generatePositioning";

function escapeJsonForPyString(value: unknown): string {
  return JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export function buildPositioningSetup(): string {
  const positioningData = generatePositioningData();
  const stationsJson = escapeJsonForPyString(positioningData.stations);
  const measurementsJson = escapeJsonForPyString(positioningData.measurements);
  return `import json as __pjson__
stations = __pjson__.loads('${stationsJson}')
measurements = __pjson__.loads('${measurementsJson}')`;
}
