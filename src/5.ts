import { getInput } from "./utils/fileReader";

// test-input
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

const rawInput = getInput(5);

// WTF
const input = rawInput
  .map((line) => line.split("->"))
  .flat()
  .map((str) => str.split(","))
  .map((arr) => [parseInt(arr[0]), parseInt(arr[1])]);

const getCoveredCoordinates = (input: number[][]) => {
  const coveredCoordinates: number[][] = [];

  let i = 0;
  while (i < input.length) {
    const x1 = input[i][0];
    const y1 = input[i][1];
    const x2 = input[i + 1][0];
    const y2 = input[i + 1][1];

    // console.log(`i: ${i}`);
    // console.log(`x1: ${x1} y1: ${y1} x2: ${x2} y2: ${y2} `);
    if (x1 !== x2 && y1 !== y2) {
      i += 2;
      continue;
    }
    if (x1 !== x2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        coveredCoordinates.push([x, y1]);
      }
      i += 2;
    } else if (y1 !== y2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        coveredCoordinates.push([x1, y]);
      }
      i += 2;
    }
  }
  return coveredCoordinates;
};

interface CoordinateCount {
  [key: string]: number;
}

const getCoordinateCount = (coveredCoordinates: number[][]) => {
  const coordinateCount: CoordinateCount = {};

  for (const coordinate of coveredCoordinates) {
    coordinateCount[`${coordinate}`] = coordinateCount[`${coordinate}`]
      ? coordinateCount[`${coordinate}`] + 1
      : 1;
  }

  return coordinateCount;
};

const getDuplicates = (coordinateCount: CoordinateCount) => {
  let counter = 0;

  for (const coordinate in coordinateCount) {
    if (coordinateCount[coordinate] > 1) {
      counter++;
    }
  }
  return counter;
};

const coveredCoordinates = getCoveredCoordinates(input);
const coordinateCount = getCoordinateCount(coveredCoordinates);
console.log(getDuplicates(coordinateCount));
