import { getInput } from "./get-input";

interface Node {
  to: string[];
  flowRate: number;
  open: boolean;
  weight: 1;
}

interface AdjacencyMap {
  [nodeName: string]: Node;
}

interface Edge {
  to: { name: string; weight: number }[];
  flowRate: number;
  open: boolean;
}

interface Graph {
  [nodeName: string]: Edge;
}

const input = getInput("./src/22/inputs/input-16.txt")!.split("\n");
input.pop();

// This is a unweighted graph as far as I can tell.
// -> Graph theory first then solve this.
// const testInput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II`;

// const input = testInput.split("\n");

const createAdjacencyMap = (input: string[]) => {
  const adjacencyMap: AdjacencyMap = {};

  for (const line of input) {
    const words = line.split(" ");
    const name = words[1];
    const flowRate = parseInt(words[4].split("=")[1]);
    const to = words
      .slice(9)
      .map((str) => (str.length === 3 ? `${str[0]}${str[1]}` : str));

    // create entry
    adjacencyMap[name] = { to, flowRate, open: false, weight: 1 };
  }

  return adjacencyMap;
};

const adjacencyMap = createAdjacencyMap(input);

// build graph without 0 flowrate nodes and shortest distances

// Dijkstra
const hasUnvisited = (seen: boolean[], dists: number[]): boolean => {
  return seen.some((s, i) => !s && dists[i] < Infinity);
};

const getLowestUnvisited = (seen: boolean[], dists: number[]): number => {
  let idx = -1;
  let lowestDistance = Infinity;

  for (let i = 0; i < dists.length; i++) {
    if (!seen[i] && dists[i] < lowestDistance) {
      idx = i;
      lowestDistance = dists[i];
    }
  }

  return idx;
};

const getShortestPaths = (adjacencyMap: AdjacencyMap, nodeName: string) => {
  const nodes = Object.keys(adjacencyMap);
  const seen: boolean[] = new Array(nodes.length).fill(false);
  const prev: number[] = new Array(nodes.length).fill(-1);
  const dists: number[] = new Array(nodes.length).fill(Infinity);
  dists[nodes.indexOf(nodeName)] = 0;

  while (hasUnvisited(seen, dists)) {
    const fromIndex = getLowestUnvisited(seen, dists);
    const curr = nodes[fromIndex];
    seen[fromIndex] = true;

    const adjs = adjacencyMap[curr].to;

    for (let i = 0; i < adjs.length; i++) {
      const toName = adjs[i];
      const toIndex = nodes.indexOf(toName);

      if (seen[toIndex]) {
        continue;
      }

      const dist = dists[fromIndex] + adjacencyMap[curr].weight;

      if (dist < dists[toIndex]) {
        dists[toIndex] = dist;
        prev[toIndex] = fromIndex;
      }
    }
  }

  return dists;
};

// create graph without 0 nodes
const createGraph = (adjacencyMap: AdjacencyMap): Graph => {
  const nodeNames = Object.keys(adjacencyMap);
  const graph: Graph = {};

  for (const nodeName in adjacencyMap) {
    const node = adjacencyMap[nodeName];

    if (node.flowRate === 0 && nodeName !== "AA") {
      continue;
    }

    graph[nodeName] = { to: [], flowRate: node.flowRate, open: false };

    const dists = getShortestPaths(adjacencyMap, nodeName);
    for (let i = 0; i < nodeNames.length; i++) {
      // ignore flowrate 0 nodes but include start
      if (adjacencyMap[nodeNames[i]].flowRate === 0 && nodeNames[i] !== "AA") {
        continue;
      }

      // don't push path to self
      if (dists[i] > 0) {
        graph[nodeName].to.push({ name: nodeNames[i], weight: dists[i] });
      }
    }
  }

  return graph;
};

const graph = createGraph(adjacencyMap);

const walk = (graph: Graph, nodeName: string, time: number) => {
  // base case
  if (time <= 0) {
    return 0;
  }

  // open
  if (!graph[nodeName].open) {
    graph[nodeName].open = true;
  }

  // pre
  let maxFlow = 0;
  const curr = graph[nodeName];

  for (const { name, weight } of curr.to) {
    if (graph[name].open) {
      continue;
    }

    // still pre
    const adjustedTime = time - (weight + 1);
    const nodeFlow = adjustedTime * graph[name].flowRate;
    // recurse
    const flow = nodeFlow + walk(graph, name, adjustedTime);

    // post
    graph[name].open = false;

    if (flow > maxFlow) {
      maxFlow = flow;
    }
  }

  return maxFlow;
};

function getMaxPressureRelease(graph: Graph): number {
  const start = "AA";
  const time = 30;
  // open valve to make check for all valves open possible
  graph[start].open = true;

  return walk(graph, start, time);
}

console.log(getMaxPressureRelease(graph));
