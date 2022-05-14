const rawInput = [
  "6,10",
  "0,14",
  "9,10",
  "0,3",
  "10,4",
  "4,11",
  "6,0",
  "6,12",
  "4,1",
  "0,13",
  "10,12",
  "3,4",
  "3,0",
  "8,4",
  "1,10",
  "2,14",
  "8,10",
  "9,0",
  "fold along y=7",
  "fold along x=5",
];

const createPointsAndFolds = () => {
  const points: string[] = [];
  const folds: string[] = [];

  rawInput.forEach((str) => {
    if (!str.includes("fold")) {
      points.push(str);
    } else {
      folds.push(str);
    }
  });
  return {
    points,
    folds,
  };
};

const { points: strPoints, folds: strFolds } = createPointsAndFolds();

// [[x,y],...]
const points: number[][] = strPoints.map((arr) =>
  arr.split(",").map((str) => parseInt(str))
);

// [{y: 7}, ...]
const folds = strFolds.map((str) => {
  const foldArr = str.split(" ")[2].split("=");
  return {
    [foldArr[0]]: foldArr[1],
  };
});

const maxX = points.reduce((acc, curr) => [Math.max(acc[0], curr[0])])[0];
const maxY = points.reduce(
  (acc, curr) => [Math.max(acc[0], curr[1])],
  [points[1][0]]
)[0];

const createBoard = (maxX: number, maxY: number): string[][][] => {
  const board: string[][][] = [];

  for (let y = 0; y <= maxY; y++) {
    board.push([]);
    for (let x = 0; x <= maxX; x++) {
      board[y].push([]);
    }
  }

  return board;
};

const board = createBoard(maxX, maxY);
