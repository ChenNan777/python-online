import { useEffect, useMemo } from 'react';
import { MapContainer, Polyline, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { Feature, FeatureCollection, LineString } from 'geojson';
import 'leaflet/dist/leaflet.css';

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

function calculateLength(coords: number[][]) {
  let length = 0;
  const R = 6371e3; // meters

  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1];
    const [lng2, lat2] = coords[i];

    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    length += R * c;
  }

  return length;
}

type Props = {
  geojson: FeatureCollection | null;
  selectedFeatureId: string | null;
  overrides?: Record<string, { weight: number }>;
  onSelectFeature: (featureId: string | null) => void;
};

// Component to fit map bounds to data
function MapCenter({ geojson }: { geojson: FeatureCollection | null }) {
  const map = useMap();

  useEffect(() => {
    if (!geojson || geojson.features.length === 0) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layer = L.geoJSON(geojson as any); // Type cast for Leaflet compatibility
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error('Failed to calculate map bounds:', error);
    }
  }, [geojson, map]);

  return null;
}

// Component to handle map clicks (deselect)
function MapClickHandler({ onDeselect }: { onDeselect: () => void }) {
  useMapEvents({
    click: () => {
      onDeselect();
    },
  });
  return null;
}

export default function RoadNetworkMap({ geojson, selectedFeatureId, overrides, onSelectFeature }: Props) {
  const features = useMemo(() => {
    if (!geojson) return [];
    const list: Array<Feature<LineString> & { id: string }> = [];
    geojson.features.forEach((feature, index) => {
      if (feature.geometry.type !== 'LineString') return;

      const id = feature.id ? String(feature.id) : `feature-${index}`;
      const override = overrides?.[id];
      const baseProps = feature.properties && typeof feature.properties === 'object' ? feature.properties : {};

      list.push({
        ...feature,
        id,
        geometry: feature.geometry as LineString,
        properties: {
          ...baseProps,
          ...(override ? { weight: override.weight } : {}),
        },
      } as Feature<LineString> & { id: string });
    });

    return list;
  }, [geojson, overrides]);

  const tiandituKey = import.meta.env.VITE_TIANDITU_KEY || '5bb740ffd3a80fb3963e022454eca6e2';
  const tiandituBaseUrl = import.meta.env.DEV
    ? '/tianditu/DataServer'
    : 'https://t0.tianditu.gov.cn/DataServer';
  const canvasRenderer = useMemo(() => L.canvas(), []);

  return (
    <div className="h-full w-full relative" style={{ backgroundColor: 'var(--bg-panel-strong)' }}>
      <style>{`
        .leaflet-container:focus {
          outline: none;
        }
        .leaflet-interactive:focus {
          outline: none;
        }
        .leaflet-bar a {
          background-color: var(--bg-panel-strong) !important;
          color: var(--text-primary) !important;
          border-bottom-color: var(--border-default) !important;
        }
        .leaflet-bar a:hover {
          background-color: var(--bg-panel-hover) !important;
          color: var(--text-primary) !important;
        }
        .leaflet-bar a.leaflet-disabled {
          background-color: var(--bg-panel-muted) !important;
          color: var(--text-tertiary) !important;
        }
      `}</style>
      <MapContainer
        center={[28.2282, 112.9388]}
        zoom={13}
        preferCanvas
        style={{ height: '100%', width: '100%' }}
      >
        <MapClickHandler onDeselect={() => onSelectFeature(null)} />
        
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

        <MapCenter geojson={geojson} />

        {features.map((feature) => {
          const isSelected = selectedFeatureId === feature.id;
          const coords = feature.geometry.coordinates as number[][];
          // GeoJSON is [lng, lat], Leaflet is [lat, lng]
          const positions = coords.map((c) => [c[1], c[0]] as [number, number]);
          const length = calculateLength(coords);
          const weight = feature.properties?.weight ?? 1.0;

          return (
            <Polyline
              key={feature.id}
              positions={positions}
              pathOptions={{
                color: isSelected ? '#facc15' : '#3b82f6', // Yellow if selected, Blue default
                weight: isSelected ? 6 : 4,
                opacity: 0.8,
                renderer: canvasRenderer,
              } as L.PolylineOptions}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  onSelectFeature(feature.id);
                },
                mouseover: (e) => {
                  if (!isSelected) {
                    e.target.setStyle({ weight: 6, opacity: 1 });
                  }
                },
                mouseout: (e) => {
                  if (!isSelected) {
                    e.target.setStyle({ weight: 4, opacity: 0.8 });
                  }
                },
              }}
            >
              <Tooltip sticky>
                <div>
                  <div><strong>ID:</strong> {feature.id}</div>
                  <div><strong>权重:</strong> {weight}</div>
                  <div><strong>长度:</strong> {length.toFixed(2)} m</div>
                </div>
              </Tooltip>
            </Polyline>
          );
        })}
      </MapContainer>
    </div>
  );
}
