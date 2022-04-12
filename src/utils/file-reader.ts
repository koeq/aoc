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
