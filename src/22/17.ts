import { getInput } from "./get-input";

let input = getInput("./src/22/inputs/input-17.txt")!.split("\n");
input.pop();
let jets = input.join();

// const jets = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

const printArrAsString = (arr: unknown[]) => {
  for (const row of arr) {
    console.log(JSON.stringify(row));
  }

  console.log("\n");
};

type Content = "." | "#" | "@" | "-";
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

        // case 2: hitting bottom
        if (nextRowInBounds && tower[i + 1][j] === "-") {
          return true;
        }
      }
    }
  }

  return false;
};

const extendTower = (tower: Content[][], shapeNum: number) => {
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  tower.unshift([".", ".", ".", ".", ".", ".", "."]);
  const shape = shapes.get(shapeNum)!;

  for (let row = shape.length - 1; row >= 0; row--) {
    tower.unshift(shape[row]);
  }
  return tower;
};

const blow = (tower: Content[][], jet: string) => {
  const dir = jet === ">" ? "right" : "left";
  const towerCopy = tower.map((arr) => arr.slice());

  for (let row = 0; row < tower.length; row++) {
    if (dir === "right") {
      // from the end to avoid changing the "next" content
      // #@.
      for (let col = tower[row].length - 1; col >= 0; col--) {
        if (tower[row][col] === "@") {
          let nextIsOutOfBounce = col + 1 >= tower[row].length;

          // can not blow
          if (nextIsOutOfBounce || tower[row][col + 1] === "#") {
            // throw copy away
            return tower;
          }
          // shift to the right
          towerCopy[row][col + 1] = "@";
          towerCopy[row][col] = ".";
        }
      }
    }

    if (dir === "left") {
      for (let col = 0; col < tower[row].length; col++) {
        if (tower[row][col] === "@") {
          let nextIsOutOfBounce = col - 1 < 0;

          // can not blow
          if (nextIsOutOfBounce || tower[row][col - 1] === "#") {
            return tower;
          }
          // shift to the left
          towerCopy[row][col - 1] = "@";
          towerCopy[row][col] = ".";
        }
      }
    }
  }

  return towerCopy;
};

const moveShape = (tower: Content[][]) => {
  const towerCopy = tower.map((arr) => arr.slice());

  for (let row = tower.length - 1; row >= 0; row--) {
    for (let col = tower[row].length - 1; col >= 0; col--) {
      if (tower[row][col] === "@") {
        towerCopy[row + 1][col] = "@";
        towerCopy[row][col] = ".";
      }
    }
  }

  return towerCopy;
};

const shapeToRock = (tower: Content[][]) => {
  tower.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "@") row[i] = "#";
    }
  });

  return tower;
};

const trimTower = (tower: Content[][]): Content[][] => {
  let lastRockIndex: number = Infinity;

  for (let row = 0; row < tower.length; row++) {
    for (const content of tower[row]) {
      if (content === "#") {
        lastRockIndex = row;
        return tower.slice(lastRockIndex);
      }
    }
  }

  return [];
};

function simulate(rocksNum: number) {
  let tower: Content[][] = [["-", "-", "-", "-", "-", "-", "-"]];
  let shapeNum = 0;
  let jetIndex = 0;

  for (let i = 0; i < rocksNum; i++) {
    shapeNum = getShapeNum(shapeNum);

    // add rows to beginning of tower so that last rock and new rock are three rows apart
    extendTower(tower, shapeNum);

    while (true) {
      let jet = jets[jetIndex % jets.length];
      jetIndex += 1;
      tower = blow(tower, jet);

      if (!sittingOnRockOrBottom(tower)) {
        tower = moveShape(tower);
      } else {
        break;
      }
    }

    tower = shapeToRock(tower);
    tower = trimTower(tower);
  }

  return tower;
}

console.log(simulate(2022).length - 1);
