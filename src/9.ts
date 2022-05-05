import { isGetAccessor } from "typescript";
import { getInput } from "./utils/file-reader";

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

// 8.1
interface LowPoint {
  rows: number;
  columns: number;
  value: number;
}

const getLowPoints = (input: number[][]): LowPoint[] => {
  const lowPoints: LowPoint[] = [];

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
        lowPoints.push({ rows, columns, value: input[rows][columns] });
      }
    }
  }
  return lowPoints;
};

const lowPoints = getLowPoints(input);

// console.log(
//   lowPoints.map((points) => points.value).reduce((acc, curr) => acc + curr) +
//     lowPoints.length
// );

// 8.2

interface Point {
  row: number;
  column: number;
  value: number;
}

const countBasinLength = (
  rows: number,
  columns: number,
  basinLength: { value: number }
) => {
  basinLength.value++;
  input[rows][columns] = 9;

  if (rows - 1 >= 0 && input[rows - 1][columns] !== 9) {
    countBasinLength(rows - 1, columns, basinLength);
  }
  if (rows + 1 < input.length && input[rows + 1][columns] !== 9) {
    countBasinLength(rows + 1, columns, basinLength);
  }
  if (columns - 1 >= 0 && input[rows][columns - 1] !== 9) {
    countBasinLength(rows, columns - 1, basinLength);
  }
  if (columns + 1 < input[rows].length && input[rows][columns + 1] !== 9) {
    countBasinLength(rows, columns + 1, basinLength);
  }
};

const getBasinLength = (lowPoints: LowPoint[]) => {
  const basinLengths: number[] = [];
  for (const lowPoint of lowPoints) {
    const basinLength: { value: number } = { value: 0 };
    let { rows, columns } = lowPoint;
    countBasinLength(rows, columns, basinLength);
    basinLengths.push(basinLength.value);
  }

  return basinLengths;
};

const basinLengths = getBasinLength(lowPoints);

console.log(
  basinLengths
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr)
);
