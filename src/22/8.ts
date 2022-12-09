import { getInput } from "../../get-input";

const trees = getInput("./src/22/inputs/input-8.txt")
  ?.split("\n")
  .filter((str) => str)!;

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

// 1
// const count = getVisibleCount();
// console.log(count);

// 2
const getMaxScenicScore = () => {
  let maxScenicScore = 0;

  for (let row = 0; row < trees.length; row++) {
    for (let column = 0; column < trees[row].length; column++) {
      const tree = parseInt(trees[row][column]);
      const scenicScore = getScenicScore(tree, row, column);

      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore;
      }
    }
  }

  return maxScenicScore;
};

const getScenicScore = (tree: number, row: number, column: number) => {
  let visibleTreesTop = 0;
  let visibleTreesBottom = 0;
  let visibleTreesLeft = 0;
  let visibleTreesRight = 0;

  // check top
  let i = row;
  while (i > 0) {
    if (parseInt(trees[i - 1][column]) < tree) {
      visibleTreesTop++;
    } else {
      visibleTreesTop++;
      break;
    }
    i--;
  }

  // check bottom
  i = row;
  while (i < trees.length - 1) {
    if (parseInt(trees[i + 1][column]) < tree) {
      visibleTreesBottom++;
    } else {
      visibleTreesBottom++;
      break;
    }
    i++;
  }

  // check left
  i = column;
  while (i > 0) {
    if (parseInt(trees[row][i - 1]) < tree) {
      visibleTreesLeft++;
    } else {
      visibleTreesLeft++;
      break;
    }
    i--;
  }

  // check right
  i = column;
  while (i < trees[row].length - 1) {
    if (parseInt(trees[row][i + 1]) < tree) {
      visibleTreesRight++;
    } else {
      visibleTreesRight++;
      break;
    }
    i++;
  }

  return (
    visibleTreesBottom * visibleTreesTop * visibleTreesLeft * visibleTreesRight
  );
};

const maxScenicScore = getMaxScenicScore();
console.log(maxScenicScore);
