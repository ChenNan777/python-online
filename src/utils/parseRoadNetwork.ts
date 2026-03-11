import type { FeatureCollection, LineString } from 'geojson';

export type RoadNetwork = {
  graph: Record<string, Record<string, number>>;
  positions: Record<string, [number, number]>;
  nodes: Array<{ id: string; lng: number; lat: number }>;
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
  end: string;
  geojson: FeatureCollection;
  startCoord: { lng: number; lat: number };
  endCoord: { lng: number; lat: number };
};

/**
 * 计算两个经纬度坐标之间的 Haversine 距离（单位：米）
 * @param lng1 - 第一个点的经度
 * @param lat1 - 第一个点的纬度
 * @param lng2 - 第二个点的经度
 * @param lat2 - 第二个点的纬度
 * @returns 两点之间的距离（米）
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
 * @param geojson - GeoJSON 格式的路网数据
 * @returns 包含图结构、节点位置、边信息和起终点的路网对象
 */
export function parseRoadNetwork(
  geojson: FeatureCollection,
  preferredCoords?: {
    startCoord?: { lng: number; lat: number };
    endCoord?: { lng: number; lat: number };
  },
): RoadNetwork {
  const graph: Record<string, Record<string, number>> = {};
  const positions: Record<string, [number, number]> = {};
  const nodes: Array<{ id: string; lng: number; lat: number }> = [];
  const edges: Array<{ from: string; to: string; weight: number }> = [];

  // 遍历所有 Feature
  for (const feature of geojson.features) {
    if (feature.geometry.type !== 'LineString') continue;

    const coords = (feature.geometry as LineString).coordinates;
    const isOneway = feature.properties?.oneway === 'yes';
    // 读取权重因子，默认为 1.0。数值越大，代表通行成本越高（如拥堵、限速等）。
    const weightFactor = typeof feature.properties?.weight === 'number' ? feature.properties.weight : 1.0;

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
        const distance = haversineDistance(prevLng, prevLat, lng, lat);
        const weight = distance * weightFactor;

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

  // 指定起点和终点坐标
  const startCoord = preferredCoords?.startCoord ?? { lng: 113.043225, lat: 28.254607 };
  const endCoord = preferredCoords?.endCoord ?? { lng: 113.039751, lat: 28.266712 };

  // 找到最接近指定坐标的节点
  let start = nodes[0].id;
  let end = nodes[nodes.length - 1].id;
  let minStartDist = Infinity;
  let minEndDist = Infinity;

  for (const node of nodes) {
    const [lng, lat] = positions[node.id];

    // 找最接近起点的节点
    const distToStart = haversineDistance(lng, lat, startCoord.lng, startCoord.lat);
    if (distToStart < minStartDist) {
      minStartDist = distToStart;
      start = node.id;
    }

    // 找最接近终点的节点
    const distToEnd = haversineDistance(lng, lat, endCoord.lng, endCoord.lat);
    if (distToEnd < minEndDist) {
      minEndDist = distToEnd;
      end = node.id;
    }
  }

  // 验证start和end是否连通，如果不连通则在start的连通分量中找最远的节点作为end
  const reachableFromStart = new Set<string>();
  const queue: string[] = [start];
  reachableFromStart.add(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbor in graph[current]) {
      if (!reachableFromStart.has(neighbor)) {
        reachableFromStart.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  // 如果end不可达，在可达节点中找距离end目标坐标最近的节点
  if (!reachableFromStart.has(end)) {
    let newEnd = start;
    let minDist = Infinity;
    for (const nodeId of reachableFromStart) {
      const [lng, lat] = positions[nodeId];
      const dist = haversineDistance(lng, lat, endCoord.lng, endCoord.lat);
      if (dist < minDist) {
        minDist = dist;
        newEnd = nodeId;
      }
    }
    end = newEnd;
  }

  return {
    graph,
    positions,
    nodes,
    edges,
    start,
    end,
    geojson,
    startCoord,
    endCoord,
  };
}
