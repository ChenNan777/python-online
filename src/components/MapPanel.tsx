import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  roadNetwork: any;
  optimalPath: number[] | null;
  userPath: number[] | null;
  optimalWeight: number | null;
  userWeight: number | null;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  roadNetwork,
  optimalPath,
  userPath,
  optimalWeight,
  userWeight,
}) => {
  // Compute center coordinates from road network
  const center = useMemo(() => {
    if (!roadNetwork?.features?.length) return [39.9042, 116.4074]; // Beijing default

    const coords = roadNetwork.features
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
  const getPathCoordinates = (path: number[] | null) => {
    if (!path || !roadNetwork?.features) return [];

    const nodeMap = new Map();
    roadNetwork.features.forEach((feature: any) => {
      const [lng, lat] = feature.geometry.coordinates[0];
      nodeMap.set(feature.properties.source, [lat, lng]);
      const [lng2, lat2] = feature.geometry.coordinates[1];
      nodeMap.set(feature.properties.target, [lat2, lng2]);
    });

    return path.map(nodeId => nodeMap.get(nodeId)).filter(Boolean);
  };

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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Road network */}
        <GeoJSON
          data={roadNetwork}
          style={{ color: '#888', weight: 2, opacity: 0.6 }}
        />

        {/* Optimal path */}
        {optimalCoords.length > 0 && (
          <Polyline
            positions={optimalCoords}
            color="blue"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* User path */}
        {userCoords.length > 0 && (
          <Polyline
            positions={userCoords}
            color="orange"
            weight={4}
            opacity={0.8}
            dashArray="10, 10"
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
      {(optimalWeight !== null || userWeight !== null) && (
        <div className="path-info">
          {optimalWeight !== null && (
            <div className="info-item">
              <span className="label">最优路径权重:</span>
              <span className="value optimal">{optimalWeight.toFixed(2)}</span>
            </div>
          )}
          {userWeight !== null && (
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
