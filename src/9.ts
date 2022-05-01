import { getInput } from "./utils/fileReader";

// TEST INPUT
// const rawInput = [
//   "2199943210",
//   "3987894921",
//   "9856789892",
//   "8767896789",
//   "9899965678",
// ];

const rawInput = getInput(9);

const input: number[][] = rawInput.map((line) =>
  line.split("").map((str) => parseInt(str))
);

const getLowPoints = (input: number[][]): number[] => {
  const lowPoints: number[] = [];

  for (let rows = 0; rows < input.length; rows++) {
    for (let columns = 0; columns < input[rows].length; columns++) {
      let lowest = true;
      const point = input[rows][columns];
      // check adjacent points in row
      if (rows - 1 >= 0 && point >= input[rows - 1][columns]) {
        lowest = false;
      } else if (rows + 1 < input.length && point >= input[rows + 1][columns]) {
        lowest = false;
      }
      // check adjacent points in columns
      else if (columns - 1 >= 0 && point >= input[rows][columns - 1]) {
        lowest = false;
      } else if (
        columns + 1 < input[rows].length &&
        point >= input[rows][columns + 1]
      ) {
        lowest = false;
      }

      if (lowest) {
        lowPoints.push(point);
      }
    }
  }
  return lowPoints;
};

const lowPoints = getLowPoints(input);

console.log(lowPoints.reduce((acc, curr) => acc + curr) + lowPoints.length);
