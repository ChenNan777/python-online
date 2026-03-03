import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { message } from 'antd';
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

  // 天地图 API Key
  const tiandituKey = import.meta.env.VITE_TIANDITU_KEY || 'YOUR_TIANDITU_KEY';

  // Handle right-click to copy coordinates
  const handleContextMenu = async (e: L.LeafletMouseEvent) => {
    e.originalEvent.preventDefault(); // Prevent default context menu

    const { lat, lng } = e.latlng;
    const coordText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

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
  };

  if (!roadNetwork) {
    return <div className="map-panel">加载地图数据中...</div>;
  }

  return (
    <div className="map-panel">
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        eventHandlers={{
          contextmenu: handleContextMenu,
        }}
      >
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
