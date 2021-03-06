import { getInput } from "./utils/file-reader";
// const rawInput = ["11111", "19991", "19191", "19991", "11111"];
// const rawInput = [
//   "5483143223",
//   "2745854711",
//   "5264556173",
//   "6141336146",
//   "6357385478",
//   "4167524645",
//   "2176841721",
//   "6882881134",
//   "4846848554",
//   "5283751526",
// ];

const rawInput = getInput(11);

const input = rawInput.map((str) => str.split("").map((str) => parseInt(str)));

interface Point {
  x: number;
  y: number;
  value: number;
}

let counter = 0;

const flash = (point: Point, input: number[][]): number[][] => {
  const { x, y, value } = point;

  // 3. flashed points are set to 0
  input[y][x] = 0;
  counter++;
  // flash spreads to points around
  const topLeftDiagonal = y - 1 >= 0 &&
    x - 1 >= 0 && { x: x - 1, y: y - 1, value: input[y - 1][x - 1] };

  if (topLeftDiagonal && topLeftDiagonal.value !== 0) {
    input[y - 1][x - 1] = topLeftDiagonal.value + 1;
    topLeftDiagonal.value = topLeftDiagonal.value + 1;
    input = topLeftDiagonal.value > 9 ? flash(topLeftDiagonal, input) : input;
  }

  const topRightDiagonal = y - 1 >= 0 &&
    x + 1 < input[y - 1].length && {
      x: x + 1,
      y: y - 1,
      value: input[y - 1][x + 1],
    };

  if (topRightDiagonal && topRightDiagonal.value !== 0) {
    input[y - 1][x + 1] = topRightDiagonal.value + 1;
    topRightDiagonal.value = topRightDiagonal.value + 1;
    input = topRightDiagonal.value > 9 ? flash(topRightDiagonal, input) : input;
  }

  const bottomLeftDiagonal = y + 1 < input.length &&
    x - 1 >= 0 && { x: x - 1, y: y + 1, value: input[y + 1][x - 1] };

  if (bottomLeftDiagonal && bottomLeftDiagonal.value !== 0) {
    input[y + 1][x - 1] = bottomLeftDiagonal.value + 1;
    bottomLeftDiagonal.value = bottomLeftDiagonal.value + 1;
    input =
      bottomLeftDiagonal.value > 9 ? flash(bottomLeftDiagonal, input) : input;
  }

  const bottomRightDiagonal = y + 1 < input.length &&
    x + 1 < input[y + 1].length && {
      x: x + 1,
      y: y + 1,
      value: input[y + 1][x + 1],
    };

  if (bottomRightDiagonal && bottomRightDiagonal.value !== 0) {
    input[y + 1][x + 1] = bottomRightDiagonal.value + 1;
    bottomRightDiagonal.value = bottomRightDiagonal.value + 1;
    input =
      bottomRightDiagonal.value > 9 ? flash(bottomRightDiagonal, input) : input;
  }

  const top = y - 1 >= 0 && { x, y: y - 1, value: input[y - 1][x] };

  if (top && top.value !== 0) {
    input[y - 1][x] = top.value + 1;
    top.value = top.value + 1;
    input = top.value > 9 ? flash(top, input) : input;
  }

  const bottom = y + 1 < input.length && {
    x,
    y: y + 1,
    value: input[y + 1][x],
  };

  if (bottom && bottom.value !== 0) {
    input[y + 1][x] = bottom.value + 1;
    bottom.value = bottom.value + 1;
    input = bottom.value > 9 ? flash(bottom, input) : input;
  }

  const left = x - 1 >= 0 && { x: x - 1, y, value: input[y][x - 1] };

  if (left && left.value !== 0) {
    input[y][x - 1] = left.value + 1;
    left.value = left.value + 1;
    input = left.value > 9 ? flash(left, input) : input;
  }

  const right = x + 1 < input[y].length && {
    x: x + 1,
    y,
    value: input[y][x + 1],
  };

  if (right && right.value !== 0) {
    input[y][x + 1] = right.value + 1;
    right.value = right.value + 1;
    input = right.value > 9 ? flash(right, input) : input;
  }

  return input;
};

// 10.1
const step = (steps: number, input: number[][]) => {
  // simulate steps
  for (let i = 0; i < steps; i++) {
    // simulate...
    // 1. increase energy level by one
    input = input.map((arr) => arr.map((num) => num + 1));

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const point = { x, y, value: input[y][x] };
        // 2. point value > 9 --> flash! -> one point can only flash once
        if (point.value > 9) {
          input = flash(point, input);
        }
      }
    }
  }

  return input;
};

// const stepped = step(100, input);
// console.log(counter);

// 10.2

const allFlashed = (input: number[][]): boolean => {
  return input.every((arr) => arr.every((num) => num === 0));
};

const getSteps = (input: number[][]) => {
  let steps = 0;

  while (!allFlashed(input)) {
    steps++;
    input = input.map((arr) => arr.map((num) => num + 1));

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const point = { x, y, value: input[y][x] };

        if (point.value > 9) {
          input = flash(point, input);
        }
      }
    }
  }

  return steps;
};

const steps = getSteps(input);
console.log(steps);
