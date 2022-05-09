const rawInput = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];

const input = rawInput.map((str) => str.split("-"));

type node = Record<string, string[]>;

const nodeInNodes = (nodes: node[], nodeName: string): node | undefined => {
  return nodes.find((node) => nodeName in node);
};

const createNodes = (input: string[][]): node[] => {
  const nodes: node[] = [];

  for (const link of input) {
    const node = nodeInNodes(nodes, link[0]);

    if (node) {
      node[link[0]].push(link[1]);
    } else {
      nodes.push({ [link[0]]: [link[1]] });
    }
  }

  return nodes;
};

const nodes = createNodes(input);
console.log(nodes);
