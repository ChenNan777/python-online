import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, Tooltip, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Feature, LineString } from 'geojson';
import { message } from 'antd';
import { usePythonStore } from '../store/usePythonStore';
import type { RoadNetwork } from '../utils/parseRoadNetwork';

// Fix Leaflet default icon issue with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function buildGlowingMarkerIcon(args: {
  label?: string;
  tone: 'info' | 'success' | 'warning' | 'danger' | 'muted';
  size?: number;
}): L.DivIcon {
  const colorMap = {
    info: 'var(--info-strong)',
    success: 'var(--success-strong)',
    warning: 'var(--warning-strong)',
    danger: 'var(--danger-strong)',
    muted: 'var(--map-connection)',
  } as const;

  const size = args.size ?? 22;
  const ringSize = size + 12;
  const innerSize = Math.max(12, size - 8);
  const color = colorMap[args.tone];
  const label = args.label ?? '';

  return L.divIcon({
    className: 'map-tech-marker',
    html: `<div class="map-tech-marker__root" style="--marker-color:${color};--marker-size:${size}px;--marker-ring-size:${ringSize}px;--marker-inner-size:${innerSize}px;">
      <div class="map-tech-marker__ring"></div>
      <div class="map-tech-marker__pulse"></div>
      <div class="map-tech-marker__core">${label}</div>
    </div>`,
    iconSize: [ringSize, ringSize],
    iconAnchor: [ringSize / 2, ringSize / 2],
  });
}

interface MapPanelProps {
  roadNetwork: RoadNetwork | null;
  isPracticeMode?: boolean;
}

/**
 * 地图面板组件，用于显示路网和路径规划结果
 * @param roadNetwork - 路网数据，包含节点、边和起终点信息
 * @param isPracticeMode - 是否为练习模式（可选，如果未提供则从 store 读取）
 */
const MapPanel: React.FC<MapPanelProps> = ({ roadNetwork, isPracticeMode: isPracticeModeProp }) => {
  // Get path data and debug mode from store
  const { graphResult, debugMode, debugStartCoord, debugEndCoord, setDebugStartCoord, setDebugEndCoord, setGraphResult, positioningData, positioningResult, isPracticeMode: isPracticeModeStore } = usePythonStore((s) => ({
    graphResult: s.graphResult,
    debugMode: s.debugMode,
    debugStartCoord: s.debugStartCoord,
    debugEndCoord: s.debugEndCoord,
    setDebugStartCoord: s.setDebugStartCoord,
    setDebugEndCoord: s.setDebugEndCoord,
    setGraphResult: s.setGraphResult,
    positioningData: s.positioningData,
    positioningResult: s.positioningResult,
    isPracticeMode: s.isPracticeMode,
  }));

  // Use prop if provided, otherwise fall back to store value
  const isPracticeMode = isPracticeModeProp !== undefined ? isPracticeModeProp : isPracticeModeStore;

  // State for context menu
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const contextMenuStyle = useMemo(
    () => ({
      position: 'fixed' as const,
      left: contextMenuPosition.x,
      top: contextMenuPosition.y,
      background: 'var(--bg-panel-strong)',
      border: '1px solid var(--border-default)',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-panel)',
      color: 'var(--text-primary)',
      zIndex: 9999,
      minWidth: '120px',
    }),
    [contextMenuPosition.x, contextMenuPosition.y],
  );

  // Compute center coordinates from road network
  const center = useMemo(() => {
    // If positioning data exists, use it
    if (positioningData?.stations?.length) {
      const lngs = positioningData.stations.map(s => s.lng);
      const lats = positioningData.stations.map(s => s.lat);
      const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
      const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
      return [centerLat, centerLng];
    }

    if (!roadNetwork?.geojson?.features?.length) return [28.2282, 112.9388]; // Changsha default

    // GeoJSON coordinates are [lng, lat]
    const allCoords: number[][] = [];
    roadNetwork.geojson.features.forEach((feature) => {
      if (feature.geometry.type === 'LineString') {
        const lineFeature = feature as Feature<LineString>;
        allCoords.push(...(lineFeature.geometry.coordinates as number[][]));
      }
    });

    if (allCoords.length === 0) return [28.2282, 112.9388];

    const lngs = allCoords.map(c => c[0]);
    const lats = allCoords.map(c => c[1]);

    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    return [centerLat, centerLng]; // Leaflet expects [lat, lng]
  }, [roadNetwork, positioningData]);

  // Calculate bearing line endpoint
  const calculateBearingLineEnd = (
    stationLng: number,
    stationLat: number,
    bearingDeg: number,
    lengthKm: number
  ): [number, number] => {
    const R = 6371; // Earth radius in km
    const d = lengthKm / R;
    const brng = (bearingDeg * Math.PI) / 180;

    const lat1 = (stationLat * Math.PI) / 180;
    const lng1 = (stationLng * Math.PI) / 180;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) +
      Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
    );

    const lng2 = lng1 + Math.atan2(
      Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

    return [
      (lat2 * 180) / Math.PI,
      (lng2 * 180) / Math.PI
    ];
  };

  // Convert node IDs to coordinates
  const getPathCoordinates = useCallback((path: string[] | null | undefined) => {
    if (!path || !roadNetwork?.positions) return [];
    return path.map(nodeId => {
      const pos = roadNetwork.positions[nodeId];
      return pos ? [pos[1], pos[0]] : null; // [lat, lng] for Leaflet
    }).filter(Boolean) as [number, number][];
  }, [roadNetwork]);

  const optimalPath = graphResult?.path;
  const userPath = graphResult?.userPath;
  const optimalWeight = graphResult?.optimalWeight;
  const userWeight = graphResult?.totalWeight;

  const optimalCoords = useMemo(() => getPathCoordinates(optimalPath), [optimalPath, getPathCoordinates]);
  const userCoords = useMemo(() => getPathCoordinates(userPath), [userPath, getPathCoordinates]);

  const bearingLineLength = useMemo(() => {
    if (!positioningData) return 2; // default 2km

    // Calculate distance from each station to target, use the max + small buffer
    let maxDist = 1; // minimum 1km

    const targets = [
      positioningData.trueTarget,
      positioningResult ? { lng: positioningResult.userLng, lat: positioningResult.userLat } : null,
    ].filter(Boolean);

    positioningData.stations.forEach(station => {
      targets.forEach(target => {
        if (!target) return;
        const dist = Math.sqrt(
          Math.pow((target.lng - station.lng) * 111, 2) +
          Math.pow((target.lat - station.lat) * 111, 2)
        );
        maxDist = Math.max(maxDist, dist);
      });
    });

    return maxDist + 0.5; // Just extend 0.5km beyond the target
  }, [positioningData, positioningResult]);

  const positioningError = useMemo(() => {
    if (!positioningResult || !positioningData?.trueTarget) return null;

    const R = 6371e3; // Earth radius in meters
    const lat1 = (positioningData.trueTarget.lat * Math.PI) / 180;
    const lat2 = (positioningResult.userLat * Math.PI) / 180;
    const Δlat = ((positioningResult.userLat - positioningData.trueTarget.lat) * Math.PI) / 180;
    const Δlng = ((positioningResult.userLng - positioningData.trueTarget.lng) * Math.PI) / 180;

    const a = Math.sin(Δlat / 2) * Math.sin(Δlat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(Δlng / 2) * Math.sin(Δlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  }, [positioningResult, positioningData]);

  // Get start and end positions from roadNetwork
  const startPosition = useMemo(() => {
    if (!roadNetwork?.positions) return null;

    // In debug mode, find nearest node to debug coordinates
    if (debugMode && debugStartCoord) {
      const haversineDistance = (lng1: number, lat1: number, lng2: number, lat2: number) => {
        const R = 6371e3;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lng2 - lng1) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      let nearestNode = roadNetwork.start;
      let minDist = Infinity;
      for (const nodeId in roadNetwork.positions) {
        const [lng, lat] = roadNetwork.positions[nodeId];
        const dist = haversineDistance(lng, lat, debugStartCoord.lng, debugStartCoord.lat);
        if (dist < minDist) {
          minDist = dist;
          nearestNode = nodeId;
        }
      }
      const pos = roadNetwork.positions[nearestNode];
      return pos ? [pos[1], pos[0]] as [number, number] : null;
    }

    if (!roadNetwork?.start) return null;
    const pos = roadNetwork.positions[roadNetwork.start];
    return pos ? [pos[1], pos[0]] as [number, number] : null; // [lat, lng]
  }, [roadNetwork, debugMode, debugStartCoord]);

  const endPosition = useMemo(() => {
    if (!roadNetwork?.positions || !roadNetwork?.graph) return null;

    // In debug mode, find nearest reachable node to debug coordinates
    if (debugMode && debugEndCoord && startPosition) {
      const haversineDistance = (lng1: number, lat1: number, lng2: number, lat2: number) => {
        const R = 6371e3;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lng2 - lng1) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // First, find the start node ID
      let startNodeId = roadNetwork.start;
      if (debugStartCoord) {
        let minDist = Infinity;
        for (const nodeId in roadNetwork.positions) {
          const [lng, lat] = roadNetwork.positions[nodeId];
          const dist = haversineDistance(lng, lat, debugStartCoord.lng, debugStartCoord.lat);
          if (dist < minDist) {
            minDist = dist;
            startNodeId = nodeId;
          }
        }
      }

      // Find all nodes reachable from start using BFS
      const reachableFromStart = new Set<string>();
      const queue: string[] = [startNodeId];
      reachableFromStart.add(startNodeId);

      while (queue.length > 0) {
        const current = queue.shift()!;
        for (const neighbor in roadNetwork.graph[current]) {
          if (!reachableFromStart.has(neighbor)) {
            reachableFromStart.add(neighbor);
            queue.push(neighbor);
          }
        }
      }

      // Find nearest reachable node to debug end coordinates
      let nearestNode = startNodeId;
      let minDist = Infinity;
      for (const nodeId of reachableFromStart) {
        const [lng, lat] = roadNetwork.positions[nodeId];
        const dist = haversineDistance(lng, lat, debugEndCoord.lng, debugEndCoord.lat);
        if (dist < minDist) {
          minDist = dist;
          nearestNode = nodeId;
        }
      }

      const pos = roadNetwork.positions[nearestNode];
      return pos ? [pos[1], pos[0]] as [number, number] : null;
    }

    if (!roadNetwork?.end) return null;
    const pos = roadNetwork.positions[roadNetwork.end];
    return pos ? [pos[1], pos[0]] as [number, number] : null; // [lat, lng]
  }, [roadNetwork, debugMode, debugEndCoord, startPosition, debugStartCoord]);

  // Get original target coordinates
  const startTargetPosition = useMemo(() => {
    if (debugMode && debugStartCoord) {
      return [debugStartCoord.lat, debugStartCoord.lng] as [number, number];
    }
    if (!roadNetwork?.startCoord) return null;
    return [roadNetwork.startCoord.lat, roadNetwork.startCoord.lng] as [number, number];
  }, [roadNetwork, debugMode, debugStartCoord]);

  const endTargetPosition = useMemo(() => {
    if (debugMode && debugEndCoord) {
      return [debugEndCoord.lat, debugEndCoord.lng] as [number, number];
    }
    if (!roadNetwork?.endCoord) return null;
    return [roadNetwork.endCoord.lat, roadNetwork.endCoord.lng] as [number, number];
  }, [roadNetwork, debugMode, debugEndCoord]);

  // Check if start/end positions differ from target positions
  const startNeedsConnection = useMemo(() => {
    if (!startPosition || !startTargetPosition) return false;
    const dist = Math.sqrt(
      Math.pow(startPosition[0] - startTargetPosition[0], 2) +
      Math.pow(startPosition[1] - startTargetPosition[1], 2)
    );
    return dist > 0.0001; // ~10 meter threshold
  }, [startPosition, startTargetPosition]);

  const endNeedsConnection = useMemo(() => {
    if (!endPosition || !endTargetPosition) return false;
    const dist = Math.sqrt(
      Math.pow(endPosition[0] - endTargetPosition[0], 2) +
      Math.pow(endPosition[1] - endTargetPosition[1], 2)
    );
    return dist > 0.0001; // ~10 meter threshold
  }, [endPosition, endTargetPosition]);

  // 天地图 API Key
  const tiandituKey = import.meta.env.VITE_TIANDITU_KEY || '5bb740ffd3a80fb3963e022454eca6e2';
  const tiandituBaseUrl = import.meta.env.DEV
    ? '/tianditu/DataServer'
    : 'https://t0.tianditu.gov.cn/DataServer';

  // Handle copy coordinates
  const handleCopyCoordinates = async () => {
    if (!clickedCoords) return;

    const coordText = `${clickedCoords.lat.toFixed(6)}, ${clickedCoords.lng.toFixed(6)}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(coordText);
        message.success(`坐标已复制: ${coordText}`);
      } else {
        message.error('浏览器不支持复制功能');
      }
    } catch (error) {
      console.error('Failed to copy coordinates:', error);
      message.error('复制坐标失败');
    }

    setContextMenuVisible(false);
  };

  // Component to handle map events
  const MapEventHandler = () => {
    useMapEvents({
      contextmenu: (e) => {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();

        const { lat, lng } = e.latlng;
        setClickedCoords({ lat, lng });
        setContextMenuPosition({
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
        });
        setContextMenuVisible(true);
      },
    });
    return null;
  };

  // Component to fix map size on mount
  const MapSizeFixer = () => {
    const map = useMap();
    useEffect(() => {
      // Invalidate size after a short delay to ensure container is rendered
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 100);
      return () => clearTimeout(timer);
    }, [map]);
    return null;
  };

  // Allow rendering when either roadNetwork or positioningData exists
  if (!roadNetwork && !positioningData) {
    return <div className="map-panel">加载地图数据中...</div>;
  }

  return (
    <div
      className="map-panel"
      onClick={() => setContextMenuVisible(false)}
    >
      {/* Custom context menu */}
      {contextMenuVisible && (
        <div
          style={contextMenuStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-panel-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-panel-strong)';
            }}
            onClick={handleCopyCoordinates}
          >
            复制坐标
          </div>
        </div>
      )}
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <MapEventHandler />
        <MapSizeFixer />
        <TileLayer
          crossOrigin
          attribution='&copy; <a href="http://www.tianditu.gov.cn">天地图</a>'
          url={`${tiandituBaseUrl}?T=img_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`}
        />
        <TileLayer
          crossOrigin
          attribution='&copy; <a href="http://www.tianditu.gov.cn">天地图</a>'
          url={`${tiandituBaseUrl}?T=cia_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`}
        />

        {/* Road network */}
        {roadNetwork && (
          <GeoJSON
            data={roadNetwork.geojson}
            style={{ color: 'var(--map-road)', weight: 3, opacity: 0.8 }}
            filter={(feature) => {
              // Only show LineString features, filter out Point features
              return feature.geometry.type === 'LineString';
            }}
          />
        )}

        {/* Positioning stations */}
        {positioningData?.stations?.map((station) => {
          const measurement = positioningData.measurements.find(m => m.stationId === station.id);
          const bearingDeg = measurement?.bearingDeg ?? 0;

          return (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              icon={L.divIcon({
                className: 'custom-station-marker',
                html: `<div style="
                  position: relative;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <div style="
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.15);
                    animation: radar-pulse 2s ease-out infinite;
                  "></div>
                  <div style="
                    position: absolute;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.25);
                  "></div>
                  <div style="
                    position: relative;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: var(--info-strong);
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: bold;
                    color: white;
                  ">${station.id}</div>
                </div>
                <style>
                  @keyframes radar-pulse {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(1.3); opacity: 0; }
                  }
                </style>`,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
              })}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={0.95} permanent={false} className="map-tech-tooltip">
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--info-strong)' }}>
                    观测站 {station.id}
                  </div>
                  <div><strong>经度:</strong> {station.lng.toFixed(6)}°</div>
                  <div><strong>纬度:</strong> {station.lat.toFixed(6)}°</div>
                  <div><strong>方位角:</strong> {bearingDeg.toFixed(2)}°</div>
                  {station.frequency && (
                    <div><strong>频率:</strong> {station.frequency}</div>
                  )}
                </div>
              </Tooltip>
            </Marker>
          );
        })}

        {/* Bearing lines */}
        {positioningData?.measurements?.map((measurement, idx) => {
          const station = positioningData.stations.find(s => s.id === measurement.stationId);
          if (!station) return null;

          const endPoint = calculateBearingLineEnd(
            station.lng,
            station.lat,
            measurement.bearingDeg,
            bearingLineLength
          );

          const colors = ['#2563eb', '#059669', '#ea580c'];

          return (
            <Polyline
              key={`bearing-${measurement.stationId}`}
              positions={[
                [station.lat, station.lng],
                endPoint
              ]}
              color={colors[idx % colors.length]}
              weight={2.5}
              opacity={0.9}
              dashArray="10 5"
            />
          );
        })}

        {/* True target marker - only show in practice mode */}
        {isPracticeMode && positioningData?.trueTarget && (
          <Marker
            position={[positioningData.trueTarget.lat, positioningData.trueTarget.lng]}
            icon={buildGlowingMarkerIcon({ label: 'T', tone: 'success', size: 26 })}
          >
            <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--success-strong)' }}>真实目标</div>
                <div><strong>经度:</strong> {positioningData.trueTarget.lng.toFixed(6)}°</div>
                <div><strong>纬度:</strong> {positioningData.trueTarget.lat.toFixed(6)}°</div>
              </div>
            </Tooltip>
          </Marker>
        )}

        {/* User solution marker */}
        {positioningResult && (
          <Marker
            position={[positioningResult.userLat, positioningResult.userLng]}
            icon={buildGlowingMarkerIcon({ label: 'U', tone: 'warning', size: 24 })}
          >
            <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--warning-strong)' }}>你的解</div>
                <div><strong>经度:</strong> {positioningResult.userLng.toFixed(6)}°</div>
                <div><strong>纬度:</strong> {positioningResult.userLat.toFixed(6)}°</div>
              </div>
            </Tooltip>
          </Marker>
        )}

        {/* Error line between true and user solution - only show in practice mode */}
        {isPracticeMode && positioningResult && positioningData?.trueTarget && (
          <Polyline
            positions={[
              [positioningData.trueTarget.lat, positioningData.trueTarget.lng],
              [positioningResult.userLat, positioningResult.userLng]
            ]}
            color="var(--danger-strong)"
            weight={2}
            opacity={0.7}
            dashArray="4 4"
          />
        )}

        {/* Optimal path - only show in practice mode */}
        {isPracticeMode && optimalCoords.length > 0 && (
          <Polyline
            positions={optimalCoords}
            color="var(--info-strong)"
            weight={4}
            opacity={0.8}
            className="path-flow-optimal"
          />
        )}

        {/* User path */}
        {userCoords.length > 0 && (
          <Polyline
            positions={userCoords}
            color="var(--warning-strong)"
            weight={4}
            opacity={0.8}
            className="path-flow-user"
          />
        )}

        {/* Connection line from start target to nearest road node */}
        {(debugMode || startNeedsConnection) && startTargetPosition && startPosition && (
          <Polyline
            positions={[startTargetPosition, startPosition]}
            color="var(--map-connection)"
            weight={2}
            opacity={0.6}
            dashArray="4 4"
          />
        )}

        {/* Connection line from end target to nearest road node */}
        {(debugMode || endNeedsConnection) && endTargetPosition && endPosition && (
          <Polyline
            positions={[endTargetPosition, endPosition]}
            color="var(--map-connection)"
            weight={2}
            opacity={0.6}
            dashArray="4 4"
          />
        )}

        {/* Target position markers (original coordinates) */}
        {/* Start marker - always show in debug mode or when needs connection */}
        {(debugMode || startNeedsConnection) && startTargetPosition && (
          <Marker
            position={startTargetPosition}
            draggable={debugMode}
            eventHandlers={{
              dragend: (e) => {
                if (debugMode) {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  setDebugStartCoord({ lng: position.lng, lat: position.lat });
                  setGraphResult(null);
                }
              },
            }}
            icon={buildGlowingMarkerIcon({ label: 'S', tone: 'success', size: 22 })}
          >
            <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--success-strong)' }}>起点目标</div>
                <div><strong>经度:</strong> {startTargetPosition[1].toFixed(6)}°</div>
                <div><strong>纬度:</strong> {startTargetPosition[0].toFixed(6)}°</div>
              </div>
            </Tooltip>
          </Marker>
        )}

        {/* End marker - always show in debug mode or when needs connection */}
        {(debugMode || endNeedsConnection) && endTargetPosition && (
          <Marker
            position={endTargetPosition}
            draggable={debugMode}
            eventHandlers={{
              dragend: (e) => {
                if (debugMode) {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  setDebugEndCoord({ lng: position.lng, lat: position.lat });
                  setGraphResult(null);
                }
              },
            }}
            icon={buildGlowingMarkerIcon({ label: 'E', tone: 'danger', size: 22 })}
          >
            <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--danger-strong)' }}>终点目标</div>
                <div><strong>经度:</strong> {endTargetPosition[1].toFixed(6)}°</div>
                <div><strong>纬度:</strong> {endTargetPosition[0].toFixed(6)}°</div>
              </div>
            </Tooltip>
          </Marker>
        )}

        {/* Start marker - show grey if in debug mode or needs connection, otherwise green */}
        {startPosition && (
          <Marker
            position={startPosition}
            icon={buildGlowingMarkerIcon({
              label: 'S',
              tone: debugMode || startNeedsConnection ? 'muted' : 'success',
              size: debugMode || startNeedsConnection ? 18 : 22,
            })}
          >
            {!(debugMode || startNeedsConnection) && (
              <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--success-strong)' }}>起点节点</div>
                  <div><strong>经度:</strong> {startPosition[1].toFixed(6)}°</div>
                  <div><strong>纬度:</strong> {startPosition[0].toFixed(6)}°</div>
                </div>
              </Tooltip>
            )}
          </Marker>
        )}

        {/* End marker - show grey if in debug mode or needs connection, otherwise red */}
        {endPosition && (
          <Marker
            position={endPosition}
            icon={buildGlowingMarkerIcon({
              label: 'E',
              tone: debugMode || endNeedsConnection ? 'muted' : 'danger',
              size: debugMode || endNeedsConnection ? 18 : 22,
            })}
          >
            {!(debugMode || endNeedsConnection) && (
              <Tooltip direction="top" offset={[0, -24]} opacity={0.95} className="map-tech-tooltip">
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--danger-strong)' }}>终点节点</div>
                  <div><strong>经度:</strong> {endPosition[1].toFixed(6)}°</div>
                  <div><strong>纬度:</strong> {endPosition[0].toFixed(6)}°</div>
                </div>
              </Tooltip>
            )}
          </Marker>
        )}
      </MapContainer>

      {/* Info bar */}
      {((optimalWeight != null || userWeight != null) || positioningError != null) && (
        <div className="path-info">
          <div className="path-info__header">
            <span className="path-info__title">地图分析</span>
            <span className="path-info__badge">实时</span>
          </div>
          {isPracticeMode && optimalWeight != null && (
            <div className="info-item">
              <span className="label">最优解:</span>
              <span className="value optimal">{optimalWeight.toFixed(2)}</span>
            </div>
          )}
          {userWeight != null && (
            <div className="info-item">
              <span className="label">求解结果:</span>
              <span className="value user">
                {userWeight.toFixed(2)}
                {isPracticeMode && optimalWeight != null && optimalWeight > 0 && (
                  <span
                    className="offset"
                    style={{ color: Math.abs(userWeight - optimalWeight) < 0.01 ? 'var(--success-strong)' : 'var(--danger-strong)' }}
                  >
                    {' '}({userWeight - optimalWeight >= 0 ? '+' : ''}{(userWeight - optimalWeight).toFixed(2)})
                  </span>
                )}
              </span>
            </div>
          )}
          {isPracticeMode && positioningError != null && (
            <div className="info-item">
              <span className="label">定位误差:</span>
              <span className="value user path-info__value-emphasis">
                {positioningError.toFixed(2)} 米
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPanel;
