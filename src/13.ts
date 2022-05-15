import { isIfStatement } from "typescript";
import { getInput } from "./utils/file-reader";

interface Folds {
  [x: string]: number;
}

interface TopBottom {
  top: string[][][];
  bottomReversed: string[][][];
}

interface LeftRight {
  left: string[][][];
  right: string[][][];
}

// const rawInput = [
//   "6,10",
//   "0,14",
//   "9,10",
//   "0,3",
//   "10,4",
//   "4,11",
//   "6,0",
//   "6,12",
//   "4,1",
//   "0,13",
//   "10,12",
//   "3,4",
//   "3,0",
//   "8,4",
//   "1,10",
//   "2,14",
//   "8,10",
//   "9,0",

//   "fold along y=7",
//   "fold along x=5",
// ];
const rawInput = getInput(13);

const createPointsAndFolds = () => {
  const points: string[] = [];
  const folds: string[] = [];

  rawInput.forEach((str) => {
    if (str.length !== 0 && !str.includes("fold")) {
      points.push(str);
    } else if (str.length !== 0) {
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
    [foldArr[0]]: parseInt(foldArr[1]),
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

const insertPoints = () => {
  for (const point of points) {
    board[point[1]][point[0]].push("#");
  }
};

insertPoints();

const fold = (firstHalf: string[][][], secondHalf: string[][][]) => {
  const folded: string[][][] = [];

  for (let row = 0; row < firstHalf.length; row++) {
    folded.push([]);
    for (let col = 0; col < firstHalf[row].length; col++) {
      folded[row].push([]);
      if (firstHalf[row][col][0] === "#" || secondHalf[row][col][0] === "#") {
        folded[row][col].push("#");
      } else {
        folded[row][col].push(".");
      }
    }
  }

  return folded;
};

const foldUp = (foldingRow: number, board: string[][][]) => {
  const { top, bottomReversed }: TopBottom = {
    top: board.slice(0, foldingRow),
    bottomReversed: board.slice(foldingRow + 1).reverse(),
  };

  return fold(top, bottomReversed);
};

const foldLeft = (foldingCol: number, board: string[][][]) => {
  const { left, right }: LeftRight = {
    left: board.map((arr) => arr.slice(0, foldingCol)),
    right: board.map((arr) => arr.slice(foldingCol + 1).reverse()),
  };

  return fold(left, right);
};

// 13.1
// const foldOnce = (folds: Folds[], board: string[][][]) => {
//   for (const fold of folds) {
//     if (fold.x) {
//       return (board = foldLeft(fold.x, board));
//     } else if (fold.y) {
//       return (board = foldUp(fold.y, board));
//     }
//   }

//   return board;
// };

// const newBoard = foldOnce(folds, board);

// const countPoints = (newBoard: string[][][]) => {
//   let counter = 0;

//   for (const row of newBoard) {
//     for (const column of row) {
//       if (column[0] === "#") {
//         counter++;
//       }
//     }
//   }

//   return counter;
// };

// console.log(countPoints(newBoard));

// 13.2
const foldAll = (folds: Folds[], board: string[][][]) => {
  console.log(folds);
  for (const fold of folds) {
    if (fold.x) {
      board = foldLeft(fold.x, board);
    } else if (fold.y) {
      board = foldUp(fold.y, board);
    }
  }

  return board;
};

const newBoard = foldAll(folds, board).map((arr) =>
  arr.map((arr) => arr.join())
);

console.dir(newBoard, { maxArrayLength: null });

const check = [
  [ "#", "#", "#", ".", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", ".", ".", "#", "#", "#", ".", ".", ".", "#", "#", ".", ".", "#", ".", ".", "#", ".",],
  [ "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", "#", ".", ".", ".", ".", ".", "#", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", ".", ],
  [ "#", ".", ".", "#", ".", ".", ".", "#", ".", ".", "#", "#", ".", ".", ".", ".", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", ".", ".", "#", "#", "#", "#", ".", ],
  [ "#", "#", "#", ".", ".", ".", "#", ".", ".", ".", "#", ".", "#", ".", ".", ".", "#", ".", ".", ".", "#", ".", ".", ".", ".", "#", "#", "#", ".", ".", "#", ".", "#", "#", ".", "#", ".", ".", "#", ".", ],
  [ "#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", ".", ],
  [ "#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", ".", ".", ".", "#", "#", "#", ".", "#", ".", ".", "#", ".", ],
];
