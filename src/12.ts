import { getInput } from "./utils/file-reader";

const rawInput = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];
// const rawInput = getInput(12);
const input = rawInput.map((str) => str.split("-"));

interface node {
  name: string;
  nextNodes: string[];
}

const nodeInNodes = (nodes: node[], nodeName: string): node | undefined => {
  return nodes.find((node) => node.name === nodeName);
};

const createNodes = (input: string[][]): node[] => {
  const nodes: node[] = [];

  for (const link of input) {
    const from = nodeInNodes(nodes, link[0]);
    const to = nodeInNodes(nodes, link[1]);

    if (from) {
      from.nextNodes.push(link[1]);
    } else {
      nodes.push({ name: link[0], nextNodes: [link[1]] });
    }

    if (to) {
      to.nextNodes.push(link[0]);
    } else {
      nodes.push({ name: link[1], nextNodes: [link[0]] });
    }
  }

  // assign empty array to "end".nextNodes
  const end = nodes.find((node) => node.name === "end");
  if (end) {
    end.nextNodes = [];
  }

  // filter out "start" from nextNodes
  // -> you can't go back to start
  return nodes.map((obj) => {
    return {
      ...obj,
      nextNodes: obj.nextNodes.filter((str) => str !== "start"),
    };
  });
};

const nodes = createNodes(input);

type Path = string[];

// utils
const isLowerCase = (str: string) => {
  return str === str.toLowerCase();
};

const nodeInPath = (str: string, path: Path) => {
  return path.some((node) => node === str);
};

const walk = (node: node, path: Path, paths: Path[]) => {
  // access first prop
  const nodeName = node.name;
  const nextNodes = node.nextNodes;
  path = [...path, nodeName];

  if (nodeName === "end") {
    paths.push(path);
  } else {
    for (const nextNodeName of nextNodes) {
      if (isLowerCase(nextNodeName) && !nodeInPath(nextNodeName, path)) {
        walk(
          nodes.filter((node) => node.name === nextNodeName)[0],
          path,
          paths
        );
      }

      if (!isLowerCase(nextNodeName)) {
        walk(
          nodes.filter((node) => node.name === nextNodeName)[0],
          path,
          paths
        );
      }
    }
  }
};

const createPaths = (nodes: node[]): Path[] => {
  const paths: Path[] = [];
  const path: Path = [];
  const start = nodes.filter((node) => node.name === "start")[0];

  walk(start, path, paths);

  return paths;
};

const paths = createPaths(nodes);
console.log(paths.length);
