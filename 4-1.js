import lineByLine from "n-readlines";

const liner = new lineByLine("./input4.txt");

export const numInput = liner.next().toString("utf-8").split(",");

// lines after numInput und create the bingo boards

const createBoards = (liner) => {
  let line;
  let boards = [];
  let counter;
  let arr;

  while ((line = liner.next())) {
    if (line.toString("utf-8").length <= 1) {
      counter = 0;
      arr = [];
    } else if (line.toString("utf-8").length > 1) {
      // replace more than one whitespace with regex
      arr.push(
        line.toString("utf-8").trimStart().replace(/  +/g, " ").split(" ")
      );
      counter++;
      if (counter === 5) {
        boards.push(arr);
      }
    }
  }

  return boards;
};

export const boards = createBoards(liner);

// how do i find a winning board?
// push numbers into array
// check winning nums against rows and columns
// check rows:
// row: boards[0][0]

export const columnsToRows = (arr) => {
  let columnsArr = [];

  for (let l = 0; l < 6; l++) {
    columnsArr.push([]);
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 6; j++) {
      columnsArr[j].push(arr[i][j]);
    }
  }

  return columnsArr;
};

const findWinningBoard = (boards, numInput) => {
  let result = {};
  let winningNums = [];

  for (let num of numInput) {
    winningNums.push(num);

    for (let i = 0; i < boards.length; i++) {
      // loop trough ROWS
      for (let row of boards[i]) {
        // check ROW
        if (row.every((num) => winningNums.includes(num))) {
          return (result = {
            board: boards[i],
            index: i,
            winningNums: winningNums,
          });
        }
      }

      // create array where columns are rows
      let columnBoard = columnsToRows(boards[i]);
      // loop through COLUMNS
      for (let columnRow of columnBoard) {
        // check COLUMN
        if (columnRow.every((num) => winningNums.includes(num))) {
          return (result = {
            board: boards[i],
            index: i,
            winningNums: winningNums,
          });
        }
      }
    }
  }
};

const bingoResult = findWinningBoard(boards, numInput);

const calculateSum = ({ board, winningNums }) => {
  let sum = 0;

  board.forEach((row) => {
    let filtered = row.filter((num) => !winningNums.includes(num));
    if (filtered.length > 0) {
      sum += filtered.reduce((prev, curr) => parseInt(prev) + parseInt(curr));
    }
  });

  return sum;
};

const sum = calculateSum(bingoResult);
// console.log(bingoResult.winningNums);
// console.log(sum);
