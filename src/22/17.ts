import { isIfStatement } from "typescript";
import { getInput } from "./get-input";

// const input = getInput("./src/22/inputs/input-17.txt")!.split("\n");
// input.pop();

const printArrAsString = (content: unknown[]) => {
  for (const row of content) {
    console.log(JSON.stringify(row));
  }
};

const jets = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

type Content = "." | "#" | "@";
const shapes: Map<number, Content[][]> = new Map();
shapes.set(1, [[".", ".", "@", "@", "@", "@", "."]]);

shapes.set(2, [
  [".", ".", ".", "@", ".", ".", "."],
  [".", ".", "@", "@", "@", ".", "."],
  [".", ".", ".", "@", ".", ".", "."],
]);

shapes.set(3, [
  [".", ".", ".", ".", "@", ".", "."],
  [".", ".", ".", ".", "@", ".", "."],
  [".", ".", "@", "@", "@", ".", "."],
]);

shapes.set(4, [
  [".", ".", "@", ".", ".", ".", "."],
  [".", ".", "@", ".", ".", ".", "."],
  [".", ".", "@", ".", ".", ".", "."],
  [".", ".", "@", ".", ".", ".", "."],
]);

shapes.set(5, [
  [".", ".", "@", "@", ".", ".", "."],
  [".", ".", "@", "@", ".", ".", "."],
]);

const getShapeNum = (num: number) => {
  return num + 1 === 6 ? 1 : num + 1;
};

const sittingOnRockOrBottom = (tower: Content[][]): boolean => {
  for (let i = 0; i < tower.length; i++) {
    const row = tower[i];
    let containsCurrShape = false;

    for (let j = 0; j < row.length; j++) {
      const content = row[j];

      if (content === "@") {
        containsCurrShape ||= true;
        let nextRowInBounds = i + 1 < tower.length;

        // case 1: hitting rock
        if (nextRowInBounds && tower[i + 1][j] === "#") {
          return true;
        }
      }
    }

    // case 2: hitting bottom
    if (row === tower[tower.length - 1] && containsCurrShape) {
      return true;
    }
  }

  return false;
};

const extendTower = (tower: Content[][], shapeNum: number) => {
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  const shape = shapes.get(shapeNum)!;

  for (const row of shape) {
    tower.unshift(row);
  }
};

const blow = (tower: Content[][], jet: string) => {
  const direction = jet === ">" ? "right" : "left";
  const towerCopy = tower.map((arr) => arr.slice());

  for (let row = 0; row < tower.length; row++) {
    for (let col = 0; col < tower[row].length; col++) {
      if (direction === "right") {
        // can not blow to the right
        if (tower[row][tower[row].length - 1] === "@") {
          return tower;
        }

        if (tower[row][col - 1] === "@") {
          towerCopy[row] = tower[row].slice(0, tower[row].length - 1);
          towerCopy[row].unshift(".");
        }
      }

      if (direction === "left") {
        // can not blow to the left
        if (tower[row][0] === "@") {
          return tower;
        }

        if (tower[row][col] === "@") {
          towerCopy[row] = tower[row].slice(1, tower[row].length);
          towerCopy[row].push(".");
        }
      }
    }
  }

  return towerCopy;
};

const moveShape = (tower: Content[][]) => {};

const shapeToRock = (tower: Content[][]) => {};

const trimTower = (tower: Content[][]) => {};

function simulate(rocksNum: number) {
  let tower: Content[][] = [];

  let shapeNum = 0;
  let jet: string;
  let jetIndex = 0;
  const startingCol = 2;
  let lastRockMaxX = 0;

  for (let i = 0; i < rocksNum; i++) {
    shapeNum = getShapeNum(shapeNum);
    jet = jets[jetIndex % jets.length];

    // add rows to beginning of tower so that last rock and new rock are three rows apart
    extendTower(tower, shapeNum);

    printArrAsString(tower);

    while (!sittingOnRockOrBottom(tower)) {
      tower = blow(tower, jet);
      jetIndex++;
      moveShape(tower);
    }

    shapeToRock(tower);
    trimTower(tower);
  }
}

simulate(1);
