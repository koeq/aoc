const rawInput = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];

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

  // assign empty array to end.nextNodes
  const end = nodes.find((obj) => obj.name === "end");
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
console.log(nodes);

type Path = string[];

// utils
// const isLowerCase = (str: string) => {
//   return str === str.toLowerCase();
// };

// const linkInPath = (str: string, path: Path) => {
//   return path.some((node) => node === str);
// };

// const walk = (node: node, path: Path, paths: Path[]) => {
//   // access first prop
//   const nodeName = Object.keys(node)[0];
//   const links = node[nodeName];
//   path = [...path, nodeName];

//   if (nodeName === "end") {
//     paths.push(path);
//   } else {
//     for (const link of links) {
//       if (isLowerCase(link) && !linkInPath(link, path)) {
//         path = walk(nodes.filter((obj) => obj[link])[0], path, paths);
//       }

//       if (!isLowerCase(link)) {
//         path = walk(nodes.filter((obj) => obj[link])[0], path, paths);
//       }
//     }
//   }

//   if (path[path.length - 1] !== "end") {
//     path.pop();
//   }
//   return path;
// };

// const createPaths = (nodes: node[]): Path[] => {
//   const paths: Path[] = [];
//   const path: Path = [];
//   const start = nodes.filter((obj) => obj.start)[0];

//   walk(start, path, paths);

//   return paths;
// };

// const paths = createPaths(nodes);
// console.log(paths);

// create better nodes:
//  const `{nodeName}` = {
//    node: `${nodeName}`
//    nodes: []
// }
