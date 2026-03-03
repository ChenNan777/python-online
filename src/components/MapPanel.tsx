import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { message } from 'antd';
import { usePythonStore } from '../store/usePythonStore';
import type { RoadNetwork } from '../utils/parseRoadNetwork';
import type { PositioningData, PositioningResult } from '../types';

// Fix Leaflet default icon issue with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPanelProps {
  roadNetwork: RoadNetwork | null;
  positioningData?: PositioningData | null;
  positioningResult?: PositioningResult | null;
}

/**
 * 地图面板组件，用于显示路网和路径规划结果
 * @param roadNetwork - 路网数据，包含节点、边和起终点信息
 */
const MapPanel: React.FC<MapPanelProps> = ({ roadNetwork }) => {
  // Get path data and debug mode from store
  const { graphResult, debugMode, debugStartCoord, debugEndCoord, setDebugStartCoord, setDebugEndCoord, positioningData, positioningResult } = usePythonStore((s) => ({
    graphResult: s.graphResult,
    debugMode: s.debugMode,
    debugStartCoord: s.debugStartCoord,
    debugEndCoord: s.debugEndCoord,
    setDebugStartCoord: s.setDebugStartCoord,
    setDebugEndCoord: s.setDebugEndCoord,
    positioningData: s.positioningData,
    positioningResult: s.positioningResult,
  }));

  // State for context menu
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

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
    roadNetwork.geojson.features.forEach((f: any) => {
      if (f.geometry.type === 'LineString') {
        allCoords.push(...f.geometry.coordinates);
      }
    });

    if (allCoords.length === 0) return [28.2282, 112.9388];

    const lngs = allCoords.map(c => c[0]);
    const lats = allCoords.map(c => c[1]);

    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    return [centerLat, centerLng]; // Leaflet expects [lat, lng]
  }, [roadNetwork, positioningData]);

  // Convert node IDs to coordinates
  const getPathCoordinates = (path: string[] | null | undefined) => {
    if (!path || !roadNetwork?.positions) return [];
    return path.map(nodeId => {
      const pos = roadNetwork.positions[nodeId];
      return pos ? [pos[1], pos[0]] : null; // [lat, lng] for Leaflet
    }).filter(Boolean) as [number, number][];
  };

  const optimalPath = graphResult?.path;
  const userPath = graphResult?.userPath;
  const optimalWeight = graphResult?.optimalWeight;
  const userWeight = graphResult?.totalWeight;

  const optimalCoords = useMemo(() => getPathCoordinates(optimalPath), [optimalPath, roadNetwork]);
  const userCoords = useMemo(() => getPathCoordinates(userPath), [userPath, roadNetwork]);

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
  const tiandituKey = import.meta.env.VITE_TIANDITU_KEY || 'YOUR_TIANDITU_KEY';

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

  if (!roadNetwork) {
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
          style={{
            position: 'fixed',
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
            background: 'white',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            zIndex: 9999,
            minWidth: '120px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
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
        <TileLayer
          attribution='&copy; <a href="http://www.tianditu.gov.cn">天地图</a>'
          url={`/tianditu/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`}
        />
        <TileLayer
          attribution='&copy; <a href="http://www.tianditu.gov.cn">天地图</a>'
          url={`/tianditu/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`}
        />

        {/* Road network */}
        <GeoJSON
          data={roadNetwork.geojson}
          style={{ color: '#10b981', weight: 3, opacity: 0.8 }}
          filter={(feature) => {
            // Only show LineString features, filter out Point features
            return feature.geometry.type === 'LineString';
          }}
        />

        {/* Optimal path */}
        {optimalCoords.length > 0 && (
          <Polyline
            positions={optimalCoords}
            color="#3b82f6"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* User path */}
        {userCoords.length > 0 && (
          <Polyline
            positions={userCoords}
            color="#f59e0b"
            weight={4}
            opacity={0.8}
            dashArray="6 3"
          />
        )}

        {/* Connection line from start target to nearest road node */}
        {(debugMode || startNeedsConnection) && startTargetPosition && startPosition && (
          <Polyline
            positions={[startTargetPosition, startPosition]}
            color="#9ca3af"
            weight={2}
            opacity={0.6}
            dashArray="4 4"
          />
        )}

        {/* Connection line from end target to nearest road node */}
        {(debugMode || endNeedsConnection) && endTargetPosition && endPosition && (
          <Polyline
            positions={[endTargetPosition, endPosition]}
            color="#9ca3af"
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
                }
              },
            }}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
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
                }
              },
            }}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}

        {/* Start marker - show grey if in debug mode or needs connection, otherwise green */}
        {startPosition && (
          <Marker
            position={startPosition}
            icon={L.icon({
              iconUrl: (debugMode || startNeedsConnection)
                ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'
                : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              shadowUrl: iconShadow,
              iconSize: (debugMode || startNeedsConnection) ? [20, 33] : [25, 41],
              iconAnchor: (debugMode || startNeedsConnection) ? [10, 33] : [12, 41],
            })}
          />
        )}

        {/* End marker - show grey if in debug mode or needs connection, otherwise red */}
        {endPosition && (
          <Marker
            position={endPosition}
            icon={L.icon({
              iconUrl: (debugMode || endNeedsConnection)
                ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'
                : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
              shadowUrl: iconShadow,
              iconSize: (debugMode || endNeedsConnection) ? [20, 33] : [25, 41],
              iconAnchor: (debugMode || endNeedsConnection) ? [10, 33] : [12, 41],
            })}
          />
        )}
      </MapContainer>

      {/* Info bar */}
      {(optimalWeight != null || userWeight != null) && (
        <div className="path-info">
          {optimalWeight != null && (
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
                {optimalWeight != null && optimalWeight > 0 && (
                  <span
                    className="offset"
                    style={{ color: Math.abs(userWeight - optimalWeight) < 0.01 ? '#22c55e' : '#ef4444' }}
                  >
                    {' '}({userWeight - optimalWeight >= 0 ? '+' : ''}{(userWeight - optimalWeight).toFixed(2)})
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPanel;
