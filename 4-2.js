import { numInput, boards, columnsToRows } from "./4-1.js";

const log = (input) => {
  console.log(input);
};

const findWinningBoard = (boards, numInput) => {
  let result = [...boards];
  let winningNums = [];
  let indexList = new Set();

  for (let num of numInput) {
    winningNums.push(num);

    for (let i = 0; i < result.length; i++) {
      // loop trough ROWS

      for (let j = 0; j < result[i].length; j++) {
        // check ROW

        if (result[i][j].every((num) => winningNums.includes(num))) {
          indexList.add(i);
        }
      }

      // create array where columns are rows
      let columnBoard = columnsToRows(result[i]);

      // loop through COLUMNS

      for (let j = 0; j < columnBoard.length; j++) {
        // check COLUMN

        if (columnBoard[j].every((num) => winningNums.includes(num))) {
          // remove board from results
          indexList.add(i);
        }
      }
    }
    if (indexList.size === 100) {
      return {
        set: indexList,
        winningNums,
      };
    }
  }
};

const result = findWinningBoard(boards, numInput);
// log(result);

const indexArr = [...result.set];
const lastIndex = indexArr[indexArr.length - 1];

const getLastWinningBoard = (boards, lastIndex, winningNums) => {
  const lastBoard = boards[lastIndex];
  const unmarked = [];

  for (let row of lastBoard) {
    for (let num of row) {
      if (!winningNums.includes(num)) {
        unmarked.push(num);
      }
    }
  }

  const sum = unmarked.reduce((prev, curr) => parseInt(prev) + parseInt(curr));
  console.log(sum * parseInt(winningNums[winningNums.length - 1]));
};

getLastWinningBoard(boards, lastIndex, result.winningNums);
