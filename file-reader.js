import lineByLine from "n-readlines";

export const liner = new lineByLine("./inputs/input1.txt");
export const getInput = (liner) => {
  const input = [];
  let line;

  while ((line = liner.next())) {
    let decoded = line.toString("utf-8");

    input.push(decoded);
  }

  return input;
};
