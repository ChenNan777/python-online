import type { ObserverStation, PositioningData } from "../types";

// Fixed scenario: 3 stations, lng/lat coordinate space (Changsha area)
const TRUE_TARGET = { lng: 113.039765, lat: 28.266974 };

const STATION_DEFS = [
  { id: "A", lng: 113.046024, lat: 28.257279, frequency: "433.5 MHz" },
  { id: "B", lng: 113.037577, lat: 28.259530, frequency: "433.5 MHz" },
  { id: "C", lng: 113.040119, lat: 28.257335, frequency: "433.5 MHz" },
];

// Small fixed noise offsets per station (degrees)
const NOISE = [0.8, -1.2, 1.5];

function bearingDeg(slng: number, slat: number, tlng: number, tlat: number): number {
  const dx = tlng - slng;
  const dy = tlat - slat;
  const rad = Math.atan2(dx, dy);
  const deg = (rad * 180) / Math.PI;
  return ((deg % 360) + 360) % 360;
}

let _cached: PositioningData | null = null;

export function mergePositioningDataById(args: {
  stations: ObserverStation[];
  measurements: Array<{ stationId: string; bearingDeg: number }>;
  trueTarget: { lng: number; lat: number };
  targetId?: string;
  source?: PositioningData['source'];
}): PositioningData {
  const measurementMap = new Map(
    args.measurements.map((measurement) => [measurement.stationId, measurement]),
  );

  const observations = args.stations.flatMap((station) => {
    const measurement = measurementMap.get(station.id);
    if (!measurement) {
      return [];
    }

    return [{
      stationId: station.id,
      lng: station.lng,
      lat: station.lat,
      frequency: station.frequency,
      bearingDeg: measurement.bearingDeg,
    }];
  });

  return {
    stations: args.stations,
    measurements: args.measurements,
    observations,
    trueTarget: args.trueTarget,
    targetId: args.targetId,
    source: args.source ?? 'local',
  };
}

export function generatePositioningData(): PositioningData {
  if (_cached) return _cached;

  const stations = STATION_DEFS.map((s) => ({ id: s.id, lng: s.lng, lat: s.lat, frequency: s.frequency }));
  const measurements = STATION_DEFS.map((s, i) => ({
    stationId: s.id,
    bearingDeg: Math.round((bearingDeg(s.lng, s.lat, TRUE_TARGET.lng, TRUE_TARGET.lat) + NOISE[i]) * 100) / 100,
  }));

  _cached = mergePositioningDataById({
    stations,
    measurements,
    trueTarget: { ...TRUE_TARGET },
    source: 'local',
  });
  return _cached;
}
