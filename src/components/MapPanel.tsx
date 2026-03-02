import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { usePythonStore } from '../store/usePythonStore';
import type { RoadNetwork } from '../utils/parseRoadNetwork';

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
}

/**
 * 地图面板组件，用于显示路网和路径规划结果
 * @param roadNetwork - 路网数据，包含节点、边和起终点信息
 */
const MapPanel: React.FC<MapPanelProps> = ({ roadNetwork }) => {
  // Get path data from store
  const graphResult = usePythonStore((s) => s.graphResult);
  // Compute center coordinates from road network
  const center = useMemo(() => {
    if (!roadNetwork?.geojson?.features?.length) return [39.9042, 116.4074]; // Beijing default

    const coords = roadNetwork.geojson.features
      .flatMap((f: any) => f.geometry.coordinates)
      .flat();

    const lats = coords.filter((_: any, i: number) => i % 2 === 1);
    const lngs = coords.filter((_: any, i: number) => i % 2 === 0);

    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
    ];
  }, [roadNetwork]);

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

  if (!roadNetwork) {
    return <div className="map-panel">加载地图数据中...</div>;
  }

  return (
    <div className="map-panel">
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="/osm-tiles/{z}/{x}/{y}.png"
        />

        {/* Road network */}
        <GeoJSON
          data={roadNetwork.geojson}
          style={{ color: '#e2e8f0', weight: 1, opacity: 0.7 }}
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

        {/* Start marker */}
        {optimalCoords.length > 0 && (
          <Marker
            position={optimalCoords[0]}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}

        {/* End marker */}
        {optimalCoords.length > 0 && (
          <Marker
            position={optimalCoords[optimalCoords.length - 1]}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}
      </MapContainer>

      {/* Info bar */}
      {(optimalWeight != null || userWeight != null) && (
        <div className="path-info">
          {optimalWeight != null && (
            <div className="info-item">
              <span className="label">最优路径权重:</span>
              <span className="value optimal">{optimalWeight.toFixed(2)}</span>
            </div>
          )}
          {userWeight != null && (
            <div className="info-item">
              <span className="label">用户路径权重:</span>
              <span className="value user">{userWeight.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPanel;
