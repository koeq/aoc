import { getInput } from "../../get-input";

const trees = getInput("./src/22/inputs/input-8.txt")
  ?.split("\n")
  .filter((str) => str)!;

// const input = `30373
// 25512
// 65332
// 33549
// 35390`;

// const trees = input?.split("\n").filter((str) => str)!;

const isTreeOutside = (row: number, column: number) => {
  return (
    row === 0 ||
    row === trees.length - 1 ||
    column === 0 ||
    column === trees[row].length - 1
  );
};

const isTreeVisible = (tree: number, row: number, column: number) => {
  let visibleFromTop = true;
  let visibleFromBottom = true;
  let visibleFromLeft = true;
  let visibleFromRight = true;

  // check top
  let i = row;
  while (i > 0) {
    if (parseInt(trees[i - 1][column]) >= tree) {
      visibleFromTop = false;
    }
    i--;
  }

  // check bottom
  i = row;
  while (i < trees.length - 1) {
    if (parseInt(trees[i + 1][column]) >= tree) {
      visibleFromBottom = false;
    }
    i++;
  }

  // check left
  i = column;
  while (i > 0) {
    if (parseInt(trees[row][i - 1]) >= tree) {
      visibleFromLeft = false;
    }
    i--;
  }

  // check left
  i = column;
  while (i < trees[row].length - 1) {
    if (parseInt(trees[row][i + 1]) >= tree) {
      visibleFromRight = false;
    }
    i++;
  }

  return (
    visibleFromTop || visibleFromBottom || visibleFromLeft || visibleFromRight
  );
};

const getVisibleCount = () => {
  let counter = 0;

  for (let row = 0; row < trees.length; row++) {
    for (let column = 0; column < trees[row].length; column++) {
      const tree = parseInt(trees[row][column]);

      if (isTreeOutside(row, column)) {
        counter++;
        continue;
      }

      if (isTreeVisible(tree, row, column)) {
        counter++;
      }
    }
  }

  return counter;
};

const count = getVisibleCount();
console.log(count);
