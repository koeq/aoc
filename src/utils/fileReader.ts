import lineByLine from "n-readlines";

export const getInput = (fileNum: number) => {
  const liner = new lineByLine(`./inputs/input${fileNum}.txt`);
  const input = [];
  let line;
  while ((line = liner.next())) {
    let decoded = line.toString("utf-8");
    input.push(decoded);
  }
  return input;
};

interface BingoInput {
  boards: (number | string | undefined)[][][];
  nums: number[];
}


// 4
export const getBingoInput = () => {
  const liner = new lineByLine(`./inputs/input4.txt`);
  let boardsInput: number[][] = [];
  let nums: number[] = [];
  let lineCount = 1;
  let boards = [];

  let line;
  while ((line = liner.next())) {
    let decoded = line.toString("utf-8");

    if (lineCount === 1) {
      nums = decoded.split(",").map((entry) => parseInt(entry));
    } else if (lineCount > 2) {
      let row = decoded
        .split(" ")
        .filter((entry) => entry != "")
        .map((entry) => parseInt(entry));
      boardsInput.push(row);
    }

    lineCount++;
  }

  let board: number[][] = [];

  for (const row of boardsInput) {
    if (row.length === 0) {
      boards.push(board);
      board = [];
    } else {
      board.push(row);
    }
  }

  return {
    boards: boards,
    nums: nums,
  };
};
