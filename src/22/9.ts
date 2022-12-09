import { getInput } from "../../get-input";

// const testInput = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;

// const moves = testInput.split("\n");

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
const seen = createHuge2DArray();
const uniquePositionCount = simulate(seen);
console.log(uniquePositionCount.count);
