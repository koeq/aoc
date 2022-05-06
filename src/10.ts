import { getInput } from "./utils/file-reader";

// const input = [
//   "[({(<(())[]>[[{[]{<()<>>",
//   "[(()[<>])]({[<{<<[]>>(",
//   "{([(<{}[<>[]}>{[]{[(<()>",
//   "(((({<>}<{<{<>}{[]{[]{}",
//   "[[<[([]))<([[{}[[()]]]",
//   "[{[{({}]{}}([{[{{{}}([]",
//   "{<[[]]>}<{[{[{[]{()[[[]",
//   "[<(<(<(<{}))><([]([]()",
//   "<{([([[(<>()){}]>(<<{{",
//   "<{([{{}}[<[[[<>{}]]]>[]]",
// ];

const input = getInput(10);

interface Brackets {
  [k: string]: string;
}

const openToClose: Brackets = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const closeToOpen: Brackets = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const getCorruptedChunks = (input: string[]): string[] => {
  const corruptedChunks: string[] = [];
  const corruptedLines: string[] = [];

  for (let line = 0; line < input.length; line++) {
    const stack: string[] = [];
    let isLineCorrupted = false;

    // while (chunk < input[line].length && !isLineCorrupted) {
    for (
      let chunk = 0;
      chunk < input[line].length && !isLineCorrupted;
      chunk++
    ) {
      // chunk is opening
      if (input[line][chunk] in openToClose) {
        stack.push(input[line][chunk]);
        // chunk is closing and last on the stack is matching opening
      } else if (
        input[line][chunk] in closeToOpen &&
        closeToOpen[input[line][chunk]] === stack[stack.length - 1]
      ) {
        stack.pop();
        // chunk corrupts line
      } else {
        corruptedChunks.push(input[line][chunk]);
        corruptedLines.push(input[line]);
        // move to next line if current line is corrupted
        isLineCorrupted = true;
      }
    }
  }

  return corruptedChunks;
};

const corruptedChunks = getCorruptedChunks(input);

const pointsMapping: { [k: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const points = corruptedChunks.reduce(
  (acc, curr) => acc + pointsMapping[curr],
  0
);
console.log(points);
