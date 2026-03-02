import type { FeatureCollection, LineString } from 'geojson';

export type RoadNetwork = {
  graph: Record<string, Record<string, number>>;
  positions: Record<string, [number, number]>;
  nodes: Array<{ id: string; lng: number; lat: number }>;
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
  end: string;
  geojson: FeatureCollection;
};

/**
 * 计算两个经纬度坐标之间的 Haversine 距离（单位：米）
 */
function haversineDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number {
  const R = 6371e3; // 地球半径（米）
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * 解析 GeoJSON 路网数据，构建图结构
 */
export function parseRoadNetwork(geojson: FeatureCollection): RoadNetwork {
  const graph: Record<string, Record<string, number>> = {};
  const positions: Record<string, [number, number]> = {};
  const nodes: Array<{ id: string; lng: number; lat: number }> = [];
  const edges: Array<{ from: string; to: string; weight: number }> = [];

  // 遍历所有 Feature
  for (const feature of geojson.features) {
    if (feature.geometry.type !== 'LineString') continue;

    const coords = (feature.geometry as LineString).coordinates;
    const isOneway = feature.properties?.oneway === 'yes';

    // 为每条道路的每个坐标点创建节点
    for (let i = 0; i < coords.length; i++) {
      const [lng, lat] = coords[i];
      const nodeId = `${lng.toFixed(6)},${lat.toFixed(6)}`;

      if (!positions[nodeId]) {
        positions[nodeId] = [lng, lat];
        nodes.push({ id: nodeId, lng, lat });
        graph[nodeId] = {};
      }

      // 创建边（连接相邻节点）
      if (i > 0) {
        const [prevLng, prevLat] = coords[i - 1];
        const prevNodeId = `${prevLng.toFixed(6)},${prevLat.toFixed(6)}`;
        const weight = haversineDistance(prevLng, prevLat, lng, lat);

        // 添加边
        graph[prevNodeId][nodeId] = weight;
        edges.push({ from: prevNodeId, to: nodeId, weight });

        // 如果不是单行道，添加反向边
        if (!isOneway) {
          graph[nodeId][prevNodeId] = weight;
          edges.push({ from: nodeId, to: prevNodeId, weight });
        }
      }
    }
  }

  // 选择起点和终点（从前 50 个节点中选择距离最远的两个）
  let maxDistance = 0;
  let start = nodes[0].id;
  let end = nodes[nodes.length - 1].id;

  const sampleSize = Math.min(50, nodes.length);
  for (let i = 0; i < sampleSize; i++) {
    for (let j = i + 1; j < sampleSize; j++) {
      const [lng1, lat1] = positions[nodes[i].id];
      const [lng2, lat2] = positions[nodes[j].id];
      const distance = haversineDistance(lng1, lat1, lng2, lat2);

      if (distance > maxDistance) {
        maxDistance = distance;
        start = nodes[i].id;
        end = nodes[j].id;
      }
    }
  }

  return {
    graph,
    positions,
    nodes,
    edges,
    start,
    end,
    geojson,
  };
}
