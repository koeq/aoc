import { getInput } from "./get-input";

const input = getInput("./src/22/inputs/input-14.txt")
  ?.split("\n")!
  .map((str) =>
    str.split("->").map((str) =>
      str
        .trim()
        .split(",")
        .map((str) => parseInt(str))
    )
  ) as [number, number][][];

input.pop();

const CAVE_INCREASE = 150;

// const testInput = `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`;

// let input = testInput.split("\n").map((str) =>
//   str.split("->").map((str) =>
//     str
//       .trim()
//       .split(",")
//       .map((str) => parseInt(str))
//   )
// ) as [number, number][][];

const createCave = (input: [number, number][][]) => {
  const cave: string[] = [];

  const edges = {
    x: {
      max: 0,
      min: Infinity,
    },

    // sand pouring point is 500, 0 -> min-y: 0
    y: {
      max: 0,
      min: 0,
    },
  };

  for (const line of input) {
    for (const [x, y] of line) {
      if (x > edges.x.max) {
        edges.x.max = x;
      }

      if (x < edges.x.min) {
        edges.x.min = x;
      }

      if (y > edges.y.max) {
        edges.y.max = y;
      }

      if (y < edges.y.min) {
        edges.y.min = y;
      }
    }
  }

  // create empty cave
  // adjust x by -493 to be 0 indexed
  for (let y = edges.y.min; y <= edges.y.max; y++) {
    // add one column where no stone is at start and end
    let row = "";
    for (
      let x = mapX(edges.x.min) - CAVE_INCREASE;
      x <= mapX(edges.x.max) + CAVE_INCREASE;
      x++
    ) {
      row += ".";
    }

    cave.push(row);
  }

  const stonePoints = [];

  for (const line of input) {
    for (let i = 0; i < line.length - 1; i++) {
      const [x1, y1] = line[i];
      const [x2, y2] = line[i + 1];

      // create points
      if (x1 === x2) {
        const low = Math.min(y1, y2);
        const high = Math.max(y1, y2);

        for (let y = low; y <= high; y++) {
          stonePoints.push([x1, y]);
        }
      }

      if (y1 === y2) {
        const low = Math.min(x1, x2);
        const high = Math.max(x1, x2);

        for (let x = low; x <= high; x++) {
          stonePoints.push([x, y1]);
        }
      }
    }
  }

  stonePoints.forEach(([x, y]) => {
    insert(cave, { x: mapX(x), y }, "#");
  });

  const secondToLastRow = ".".repeat(cave[0].length);
  const lastRow = "#".repeat(cave[0].length);

  cave.push(secondToLastRow);
  cave.push(lastRow);

  return cave;
};

const mapX = (x: number) => {
  // test input
  // return x - 493 + CAVE_INCREASE;
  return x - 439 + CAVE_INCREASE;
};

const insert = (
  cave: string[],
  point: { x: number; y: number },
  item: string
) => {
  const { x, y } = point;
  const arr = cave[y].split("");
  arr[x] = item;
  cave[y] = arr.join("");
};

const cave = createCave(input);

type Point = { x: number; y: number };

const fallTo = (from: Point): Point | undefined => {
  for (let y = from.y + 1; y < cave.length; y++) {
    if (cave[y][from.x] !== "#" && cave[y][from.x] !== "O") {
      continue;
    }

    // left

    if (cave[y][from.x - 1] === ".") {
      return fallTo({ x: from.x - 1, y });
    }

    // right
    if (cave[y][from.x + 1] === ".") {
      return fallTo({ x: from.x + 1, y: y });
    }

    if (cave[y - 1][from.x] === "+") {
      return;
    }

    return { x: from.x, y: y - 1 };
  }
};

const dropSand = () => {
  const source = { x: mapX(500), y: 0 };
  insert(cave, source, "+");

  // add one for + which in 2 is also resting sand
  let sandCounter = 1;
  let node = fallTo(source);

  while (node) {
    sandCounter++;
    insert(cave, node, "O");
    node = fallTo(source);
  }

  return sandCounter;
};

const sandCounter = dropSand();
console.log(JSON.stringify(cave, undefined, 2));
// console.log(cave);
console.log(sandCounter);
