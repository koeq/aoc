import { getInput } from "./utils/fileReader";

// TEST INPUT
// const input = [
//   [0, 9],
//   [5, 9],
//   [8, 0],
//   [0, 8],
//   [9, 4],
//   [3, 4],
//   [2, 2],
//   [2, 1],
//   [7, 0],
//   [7, 4],
//   [6, 4],
//   [2, 0],
//   [0, 9],
//   [2, 9],
//   [3, 4],
//   [1, 4],
//   [0, 0],
//   [8, 8],
//   [5, 5],
//   [8, 2],
// ];
console.time("track");
const rawInput = getInput(5);

const input = rawInput
  .flatMap((line) => line.split("->"))
  .map((coordinate) =>
    coordinate
      .trim()
      .split(",")
      .map((num) => parseInt(num))
  );

// IMPLEMENT COUNTER DIRECTLY
type amount = number;

interface CoveredCoordinates {
  [key: string]: amount;
}

const getCoveredCoordinates = (input: number[][]) => {
  const coveredCoordinates: CoveredCoordinates = {};

  let i = 0;
  while (i < input.length - 1) {
    const x1 = input[i][0];
    const y1 = input[i][1];
    const x2 = input[i + 1][0];
    const y2 = input[i + 1][1];

    if (x1 !== x2 && y1 !== y2) {
      i += 1;
      continue;
    }
    if (x1 !== x2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        if (coveredCoordinates[`${x}, ${y1}`]) {
          coveredCoordinates[`${x}, ${y1}`]++;
        } else {
          coveredCoordinates[`${x}, ${y1}`] = 1;
        }
      }
      i += 2;
    } else if (y1 !== y2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        if (coveredCoordinates[`${x1}, ${y}`]) {
          coveredCoordinates[`${x1}, ${y}`]++;
        } else {
          coveredCoordinates[`${x1}, ${y}`] = 1;
        }
      }
      i += 2;
    }
  }
  return coveredCoordinates;
};

const getDuplicates = (coveredCoordinates: CoveredCoordinates) => {
  let duplicates = 0;

  for (const coordinate in coveredCoordinates) {
    if (coveredCoordinates[coordinate] >= 2) {
      duplicates++;
    }
  }
  return duplicates;
};

const coveredCoordinates = getCoveredCoordinates(input);
console.log(getDuplicates(coveredCoordinates));
console.timeEnd("track");
