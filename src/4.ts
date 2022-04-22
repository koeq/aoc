import { getBingoInput } from "./utils/fileReader";

// TEST-INPUT
// const nums = [
//   7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
//   20, 8, 19, 3, 26, 1,
// ];

// const boards = [
//   [
//     [22, 13, 17, 11, 0],
//     [8, 2, 23, 4, 24],
//     [21, 9, 14, 16, 7],
//     [6, 10, 3, 18, 5],
//     [1, 12, 20, 15, 19],
//   ],

//   [
//     [3, 15, 0, 2, 22],
//     [9, 18, 13, 17, 5],
//     [19, 8, 7, 25, 23],
//     [20, 11, 10, 24, 4],
//     [14, 21, 16, 12, 6],
//   ],

//   [
//     [14, 21, 17, 24, 4],
//     [10, 16, 15, 9, 19],
//     [18, 8, 23, 26, 20],
//     [22, 11, 13, 6, 5],
//     [2, 0, 12, 3, 7],
//   ],
// ];

const { boards, nums } = getBingoInput();

// OBJECTIVE:
// 1. figure out which board will have a first complete row or column
// 2. sum up the remaining numbers of that board
// 3. mulitply that sum with the last drawn number

const isWinningRow = (row: (number | string | undefined)[]): boolean => {
  return row.every((entry) => entry === "x");
};

const isWinningColumn = (board: (number | string | undefined)[][]): boolean => {
  const ROW_LENGTH = board[0].length;

  for (let i = 0; i < ROW_LENGTH; i++) {
    if (board.every((row) => row[i] === "x")) {
      return true;
    }
  }

  return false;
};

interface Winners {
  board: (number | string | undefined)[][];
  num: number;
}

const getWinners = (
  boardsInput: (number | undefined)[][][],
  nums: number[]
): Winners => {
  let boards: (number | string | undefined)[][][] = boardsInput.slice();
  console.log(performance.now());

  for (const num of nums) {
    for (const board of boards) {
      // iterate rows in board
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        // iterate entrys in rows
        for (
          let entryIndex = 0;
          entryIndex < board[rowIndex].length;
          entryIndex++
        ) {
          let entry = board[rowIndex][entryIndex];
          if (entry === num) {
            board[rowIndex][entryIndex] = "x";
          }
        }
        if (isWinningRow(board[rowIndex])) {
          return {
            board: board,
            num: num,
          };
        }
        if (isWinningColumn(board)) {
          return {
            board: board,
            num: num,
          };
        }
      }
    }
  }

  throw new Error("There is no winning board!");
};

const winner = getWinners(boards, nums);

const getRemainingBoardSum = (
  board: (number | string | undefined)[][]
): number => {
  let sum = 0;

  for (const row of board) {
    for (const entry of row) {
      if (typeof entry === "number") {
        sum += entry;
      }
    }
  }

  return sum;
};

// console.log(winner.board);
// console.log(winner.num);
console.log(getRemainingBoardSum(winner.board) * winner.num);

// 4.2
const getLastWinners = (
  boardsInput: (number | string | undefined)[][][],
  nums: number[]
): Winners => {
  let boards: (number | string | undefined)[][][] = boardsInput.slice();

  let winningBoards: number[] = [];

  for (const num of nums) {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      // iterate rows in boards[boardIndex]
      for (let rowIndex = 0; rowIndex < boards[boardIndex].length; rowIndex++) {
        // iterate entrys in rows
        for (
          let entryIndex = 0;
          entryIndex < boards[boardIndex][rowIndex].length;
          entryIndex++
        ) {
          let entry = boards[boardIndex][rowIndex][entryIndex];
          if (entry === num) {
            boards[boardIndex][rowIndex][entryIndex] = "x";
          }
        }
        if (
          isWinningRow(boards[boardIndex][rowIndex]) &&
          !winningBoards.includes(boardIndex)
        ) {
          if (boards.length - winningBoards.length === 1) {
            return {
              board: boards[boardIndex],
              num: num,
            };
          }
          winningBoards.push(boardIndex);
        }
      }
      if (
        isWinningColumn(boards[boardIndex]) &&
        !winningBoards.includes(boardIndex)
      ) {
        if (boards.length - winningBoards.length === 1) {
          return {
            board: boards[boardIndex],
            num: num,
          };
        }
        winningBoards.push(boardIndex);
      }
    }
  }

  throw new Error("There is no winning board!");
};

// const lastWinner = getLastWinners(boards, nums);

// console.log(lastWinner.board);
// console.log(lastWinner.num);
// console.log(getRemainingBoardSum(lastWinner.board) * lastWinner.num);
