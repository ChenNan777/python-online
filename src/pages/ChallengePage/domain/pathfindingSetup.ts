import type { RoadNetwork } from "../../../utils/parseRoadNetwork";
import { escapeJsonForPyString } from "./escapeJsonForPyString";

export type DebugCoord = { lng: number; lat: number };

function haversineDistance(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)
    + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findNearestNode(
  positions: RoadNetwork["positions"],
  target: DebugCoord,
  candidateNodeIds?: Iterable<string>,
): string | null {
  let nearestNode: string | null = null;
  let minDistance = Infinity;

  if (candidateNodeIds) {
    for (const nodeId of candidateNodeIds) {
      const [lng, lat] = positions[nodeId];
      const distance = haversineDistance(lng, lat, target.lng, target.lat);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = nodeId;
      }
    }
    return nearestNode;
  }

  for (const nodeId in positions) {
    const [lng, lat] = positions[nodeId];
    const distance = haversineDistance(lng, lat, target.lng, target.lat);
    if (distance < minDistance) {
      minDistance = distance;
      nearestNode = nodeId;
    }
  }

  return nearestNode;
}

function getReachableNodes(graph: RoadNetwork["graph"], startNode: string): Set<string> {
  const reachableNodes = new Set<string>();
  const queue: string[] = [startNode];
  reachableNodes.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    for (const neighborNode in graph[currentNode]) {
      if (!reachableNodes.has(neighborNode)) {
        reachableNodes.add(neighborNode);
        queue.push(neighborNode);
      }
    }
  }

  return reachableNodes;
}

export function buildPathfindingSetup(args: {
  roadNetwork: RoadNetwork | null;
  debugMode: boolean;
  debugStartCoord: DebugCoord | null;
  debugEndCoord: DebugCoord | null;
}): string {
  const { roadNetwork, debugMode, debugStartCoord, debugEndCoord } = args;
  if (!roadNetwork) {
    return "";
  }

  const graphJson = escapeJsonForPyString(roadNetwork.graph);
  const positionsJson = escapeJsonForPyString(roadNetwork.positions);

  let startNode = roadNetwork.start;
  let endNode = roadNetwork.end;

  if (debugMode && (debugStartCoord || debugEndCoord)) {
    if (debugStartCoord) {
      startNode = findNearestNode(roadNetwork.positions, debugStartCoord) ?? startNode;
    }

    if (debugEndCoord) {
      const reachableNodes = getReachableNodes(roadNetwork.graph, startNode);
      endNode = findNearestNode(roadNetwork.positions, debugEndCoord, reachableNodes) ?? endNode;
    }
  }

  return `import json as __gjson__
graph = __gjson__.loads('${graphJson}')
positions = __gjson__.loads('${positionsJson}')
start = "${startNode}"
end = "${endNode}"

import heapq as __hq__
def __optimal_path__(g, s, e):
    dist = {n: float('inf') for n in g}
    dist[s] = 0
    prev = {}
    pq = [(0, s)]
    while pq:
        cost, u = __hq__.heappop(pq)
        if cost > dist[u]: continue
        for v, w in g[u].items():
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                __hq__.heappush(pq, (dist[v], v))
    path, node = [], e
    while node in prev:
        path.append(node)
        node = prev[node]
    path.append(s)
    path.reverse()
    w = dist[e]
    return path, (w if w != float('inf') else -1)`;
}
