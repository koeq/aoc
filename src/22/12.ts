import { getInput } from "./get-input";

// const testInput = `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`;

// const input = testInput.split("\n")!;

const input = getInput("./src/22/inputs/input-12.txt")?.split("\n")!;
input.pop();

// not sure how solve "get shortest path problems"
// internet suggests Breadth-First-Search
// 1. create a seen matrix

interface Node {
  y: number;
  x: number;
  prev?: Node;
}

const createSeen = (start: Node | undefined) => {
  if (!start) {
    return;
  }

  const seen: boolean[][] = [];

  for (let i = 0; i < input.length; i++) {
    seen.push(new Array(input[0].length).fill(false));
  }

  // mark start as seen
  const { y, x } = start;
  seen[y][x] = true;

  return seen;
};

const createArr = (start: Node | undefined) => {
  if (!start) {
    return;
  }

  const arr: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    arr.push(new Array(input[0].length).fill("."));
  }

  return arr;
};

const getStartingAndEndNode = (): { start?: Node; end?: Node } | undefined => {
  let nodes: { start?: Node; end?: Node } = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "S") {
        nodes.start = { y, x };
      }

      if (input[y][x] === "E") {
        nodes.end = { y, x };
      }
    }
  }

  return nodes;
};

const getValidNeighbours = (node: Node, seen: boolean[][]) => {
  const oneApartOrStartEnd = (node: Node, neighbour: Node) => {
    const neighbourValue = input[neighbour.y][neighbour.x];
    let nodeValue = input[node.y][node.x];

    if (nodeValue === "S") {
      return neighbourValue.charCodeAt(0) - 97 <= 1;
    }

    if (neighbourValue === "E") {
      return 122 - nodeValue.charCodeAt(0) <= 1;
    }

    // console.log(`node: ${JSON.stringify(node)}, nodeValue: ${nodeValue}`);
    // console.log(
    //   `neighbour: ${JSON.stringify(
    //     neighbour
    //   )}, neighbourValue: ${neighbourValue}`
    // );

    if (neighbourValue.charCodeAt(0) <= nodeValue.charCodeAt(0)) {
      return true;
    }

    return neighbourValue.charCodeAt(0) - nodeValue.charCodeAt(0) === 1;
  };

  const neighbours: Node[] = [];

  const { y, x } = node;

  const top = { y: y - 1, x, prev: node };
  const right = { y, x: x + 1, prev: node };
  const bottom = { y: y + 1, x, prev: node };
  const left = { y, x: x - 1, prev: node };

  // top
  if (top.y >= 0 && !seen[top.y][x]) {
    if (oneApartOrStartEnd(node, top)) {
      neighbours.push(top);
    }
  }

  // right
  if (right.x < input[0].length && !seen[right.y][right.x]) {
    if (oneApartOrStartEnd(node, right)) {
      neighbours.push(right);
    }
  }

  // bottom
  if (bottom.y < input.length && !seen[bottom.y][bottom.x]) {
    if (oneApartOrStartEnd(node, bottom)) {
      neighbours.push(bottom);
    }
  }

  // left
  if (left.x >= 0 && !seen[y][left.x]) {
    if (oneApartOrStartEnd(node, left)) {
      neighbours.push(left);
    }
  }

  return neighbours;
};

let { start, end } = getStartingAndEndNode()!;

const seen = createSeen(start)!;

const solve = () => {
  const queue: Node[] = [];
  const prev = [];
  queue.push(start!);

  while (queue.length) {
    const node = queue.shift()!;

    // console.log(`${node} -> ${input[node.y][node.x]} `);

    // found end
    if (input[node.y][node.x] === "E") {
      console.log("reached end");

      break;
    }

    const neighbours = getValidNeighbours(node, seen);

    for (const neighbour of neighbours) {
      const { y, x } = neighbour;

      if (seen[y][x]) {
        continue;
      }

      // push to prev --> figure out how to recreate the path
      seen[y][x] = true;
      queue.push(neighbour);
      prev.push(neighbour);
    }
  }

  return prev;
};

// const prev = solve();
// const E = prev.find((node) => node.y === end!.y && node.x === end!.x);

const stepBack = (node: Node | undefined) => {
  let steps = 0;
  while (node) {
    console.log(input[node.y][node.x]);

    steps++;
    node = node.prev;
  }

  return steps;
};

// console.log(stepBack(E!));

// 2

const seen2 = createSeen(end)!;

console.log(input);
const getValidNeighbours2 = (node: Node, seen2: boolean[][]) => {
  const oneApartOrStartEnd2 = (node: Node, neighbour: Node) => {
    const neighbourValue = input[neighbour.y][neighbour.x];
    let nodeValue = input[node.y][node.x];

    // condition node - neigbour  <=  1
    // node === 122
    if (nodeValue === "E") {
      return 122 - neighbourValue.charCodeAt(0) <= 1;
    }

    return nodeValue.charCodeAt(0) - neighbourValue.charCodeAt(0) <= 1;
  };

  const neighbours: Node[] = [];

  const { y, x } = node;

  const top = { y: y - 1, x, prev: node };
  const right = { y, x: x + 1, prev: node };
  const bottom = { y: y + 1, x, prev: node };
  const left = { y, x: x - 1, prev: node };

  // top
  if (top.y >= 0 && !seen2[top.y][x]) {
    if (oneApartOrStartEnd2(node, top)) {
      neighbours.push(top);
    }
  }

  // right
  if (right.x < input[0].length && !seen2[right.y][right.x]) {
    if (oneApartOrStartEnd2(node, right)) {
      neighbours.push(right);
    }
  }

  // bottom
  if (bottom.y < input.length && !seen2[bottom.y][bottom.x]) {
    if (oneApartOrStartEnd2(node, bottom)) {
      neighbours.push(bottom);
    }
  }

  // left
  if (left.x >= 0 && !seen2[y][left.x]) {
    if (oneApartOrStartEnd2(node, left)) {
      neighbours.push(left);
    }
  }

  return neighbours;
};

const solve2 = () => {
  const queue: Node[] = [];
  const prev = [];
  queue.push(end!);

  while (queue.length) {
    console.log(queue);
    const node = queue.shift()!;

    // found end
    if (input[node.y][node.x] === "a") {
      console.log("reached end");

      break;
    }

    const neighbours = getValidNeighbours2(node, seen2);

    for (const neighbour of neighbours) {
      const { y, x } = neighbour;

      if (seen2[y][x]) {
        continue;
      }

      // push to prev --> figure out how to recreate the path
      seen2[y][x] = true;
      queue.push(neighbour);
      prev.push(neighbour);
    }
  }

  return prev;
};

const prev = solve2();

const a = prev.find((node) => input[node.y][node.x] === "a");
console.log(a);
console.log(stepBack(a!) - 1);
