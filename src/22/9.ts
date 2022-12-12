import { getInput } from "./get-input";

const moves = getInput("./src/22/inputs/input-9.txt")?.split("\n")!;
moves.pop();

interface Point {
  y: number;
  x: number;
}

const createHuge2DArray = (): boolean[][] => {
  const seen: boolean[][] = [];

  for (let i = 0; i < 1000; i++) {
    seen.push(new Array(1000).fill(false));
  }

  return seen;
};

const arePointsTouching = (head: Point, tail: Point) => {
  return Math.abs(head.y - tail.y) < 2 && Math.abs(head.x - tail.x) < 2;
};

const updateHead = (head: Point, direction: string) => {
  switch (direction) {
    case "U":
      head.y = head.y + 1;
      break;
    case "R":
      head.x = head.x + 1;
      break;
    case "D":
      head.y = head.y - 1;
      break;
    case "L":
      head.x = head.x - 1;
      break;
  }
};

const updateTail = (
  head: Point,
  tail: Point,
  seen: boolean[][],
  uniquePositionsCount: { count: number }
) => {
  // same row
  if (head.y === tail.y) {
    if (head.x > tail.x) {
      tail.x++;
    } else {
      tail.x--;
    }
  }

  // same column
  if (head.x === tail.x) {
    if (head.y > tail.y) {
      tail.y++;
    } else {
      tail.y--;
    }
  }

  // move diagonally
  // 0 0 0 h 0
  // 0 t 0 0 0
  if (head.y > tail.y && head.x > tail.x) {
    tail.y = tail.y + 1;
    tail.x = tail.x + 1;
  }

  // 0 h 0 0 0
  // 0 0 0 t 0
  if (head.y > tail.y && head.x < tail.x) {
    tail.y = tail.y + 1;
    tail.x = tail.x - 1;
  }

  // 0 t 0 0 0
  // 0 0 0 h 0
  if (head.y < tail.y && head.x > tail.x) {
    tail.y = tail.y - 1;
    tail.x = tail.x + 1;
  }

  // 0 0 0 t 0
  // 0 h 0 0 0
  if (head.y < tail.y && head.x < tail.x) {
    tail.y = tail.y - 1;
    tail.x = tail.x - 1;
  }

  // update seen if not seen
  if (!seen[tail.y][tail.x]) {
    seen[tail.y][tail.x] = true;
    uniquePositionsCount.count++;
  }
};

const walk = (
  head: Point,
  tail: Point,
  direction: string,
  amount: number,
  seen: boolean[][],
  uniquePositionsCount: { count: number }
) => {
  for (let i = 0; i < amount; i++) {
    updateHead(head, direction);

    // update tail
    if (!arePointsTouching(head, tail)) {
      updateTail(head, tail, seen, uniquePositionsCount);
    }
  }
};

const simulate = (seen: boolean[][]) => {
  const head = { y: 499, x: 499 };
  const tail = { y: 499, x: 499 };
  const uniquePositionsCount = { count: 1 };

  for (const move of moves) {
    const [direction, amount] = move.split(" ");
    walk(head, tail, direction, parseInt(amount), seen, uniquePositionsCount);
  }

  return uniquePositionsCount;
};

// 1
// const seen = createHuge2DArray();
// const uniquePositionCount = simulate(seen);
// console.log(uniquePositionCount.count);

// 2
interface Knots {
  [k: number]: Point;
  1: Point;
  2: Point;
  3: Point;
  4: Point;
  5: Point;
  6: Point;
  7: Point;
  8: Point;
  9: Point;
}

const updateSubsequentKnot = (
  first: Point,
  second: Point,
  seen: boolean[][],
  uniquePositionsCount: { count: number },
  updatingTail: boolean
) => {
  // same row
  if (first.y === second.y) {
    if (first.x > second.x) {
      second.x++;
    } else {
      second.x--;
    }
  }

  // same column
  if (first.x === second.x) {
    if (first.y > second.y) {
      second.y++;
    } else {
      second.y--;
    }
  }

  // move diagonally
  // 0 0 0 h 0
  // 0 t 0 0 0
  if (first.y > second.y && first.x > second.x) {
    second.y = second.y + 1;
    second.x = second.x + 1;
  }

  // 0 h 0 0 0
  // 0 0 0 t 0
  if (first.y > second.y && first.x < second.x) {
    second.y = second.y + 1;
    second.x = second.x - 1;
  }

  // 0 t 0 0 0
  // 0 0 0 h 0
  if (first.y < second.y && first.x > second.x) {
    second.y = second.y - 1;
    second.x = second.x + 1;
  }

  // 0 0 0 t 0
  // 0 h 0 0 0
  if (first.y < second.y && first.x < second.x) {
    second.y = second.y - 1;
    second.x = second.x - 1;
  }

  // update seen if not seen
  if (updatingTail && !seen[second.y][second.x]) {
    seen[second.y][second.x] = true;
    uniquePositionsCount.count++;
  }
};

const walk2 = (
  knots: Knots,
  direction: string,
  amount: number,
  seen: boolean[][],
  uniquePositionsCount: { count: number }
) => {
  for (let i = 0; i < amount; i++) {
    updateHead(knots[0], direction);

    for (let i = 0; i < 9; i++) {
      if (!arePointsTouching(knots[i], knots[i + 1])) {
        updateSubsequentKnot(
          knots[i],
          knots[i + 1],
          seen,
          uniquePositionsCount,
          i + 1 === 9
        );
      }
    }
  }
};

const simulate2 = (seen: boolean[][]) => {
  const knots = {
    0: { y: 499, x: 499 },
    1: { y: 499, x: 499 },
    2: { y: 499, x: 499 },
    3: { y: 499, x: 499 },
    4: { y: 499, x: 499 },
    5: { y: 499, x: 499 },
    6: { y: 499, x: 499 },
    7: { y: 499, x: 499 },
    8: { y: 499, x: 499 },
    9: { y: 499, x: 499 },
  };

  const uniquePositionsCount = { count: 1 };

  for (const move of moves) {
    const [direction, amount] = move.split(" ");
    walk2(knots, direction, parseInt(amount), seen, uniquePositionsCount);
  }

  return uniquePositionsCount;
};

const seen = createHuge2DArray();
const uniquePositionCount = simulate2(seen);
console.log(uniquePositionCount.count);
