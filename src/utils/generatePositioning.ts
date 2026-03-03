import type { PositioningData } from "../types";

// Fixed scenario: 3 stations, lng/lat coordinate space (Changsha area)
const TRUE_TARGET = { lng: 112.938, lat: 28.228 };

const STATION_DEFS = [
  { id: "A", lng: 112.900, lat: 28.200 },
  { id: "B", lng: 112.976, lat: 28.200 },
  { id: "C", lng: 112.938, lat: 28.256 },
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

export function generatePositioningData(): PositioningData {
  if (_cached) return _cached;

  const stations = STATION_DEFS.map((s) => ({ id: s.id, lng: s.lng, lat: s.lat }));
  const measurements = STATION_DEFS.map((s, i) => ({
    stationId: s.id,
    bearingDeg: Math.round((bearingDeg(s.lng, s.lat, TRUE_TARGET.lng, TRUE_TARGET.lat) + NOISE[i]) * 100) / 100,
  }));

  _cached = { stations, measurements, trueTarget: { ...TRUE_TARGET } };
  return _cached;
}
