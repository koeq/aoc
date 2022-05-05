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

// utils

const notVisitedBefore = (
  point: { row: number; column: number },
  visitedPoints: Point[]
): boolean => {
  if (
    visitedPoints.some(
      ({ row, column }) => row === point.row && column === point.column
    )
  ) {
    return false;
  }

  return true;
};

interface Point {
  row: number;
  column: number;
  value: number;
}

const countBasinLength = (
  rows: number,
  columns: number,
  visitedPoints: Point[]
) => {
  const point = { row: rows, column: columns, value: input[rows][columns] };

  visitedPoints.push(point);

  if (
    rows - 1 >= 0 &&
    notVisitedBefore({ row: rows - 1, column: columns }, visitedPoints) &&
    input[rows - 1][columns] !== 9
  ) {
    countBasinLength(rows - 1, columns, visitedPoints);
  }
  if (
    rows + 1 < input.length &&
    notVisitedBefore({ row: rows + 1, column: columns }, visitedPoints) &&
    input[rows + 1][columns] !== 9
  ) {
    countBasinLength(rows + 1, columns, visitedPoints);
  }
  if (
    columns - 1 >= 0 &&
    notVisitedBefore({ row: rows, column: columns - 1 }, visitedPoints) &&
    input[rows][columns - 1] !== 9
  ) {
    countBasinLength(rows, columns - 1, visitedPoints);
  }
  if (
    columns + 1 < input[rows].length &&
    notVisitedBefore({ row: rows, column: columns + 1 }, visitedPoints) &&
    input[rows][columns + 1] !== 9
  ) {
    countBasinLength(rows, columns + 1, visitedPoints);
  }
};

const getBasinLength = (lowPoints: LowPoint[]) => {
  const basinLengths: number[] = [];
  for (const lowPoint of lowPoints) {
    // lowPoint is included in basinLength
    const visitedPoints: Point[] = [];
    let { rows, columns } = lowPoint;
    countBasinLength(rows, columns, visitedPoints);
    basinLengths.push(visitedPoints.length);
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
