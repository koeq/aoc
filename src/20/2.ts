import { isGetAccessor } from "typescript";
import { getInput } from "./get-input";

const input = getInput("./src/20/inputs/input-2.txt")?.split("\n")!;
input.pop();

// const testInput = `1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc`.split("\n");

interface Parsed {
  low: number;
  high: number;
  char: string;
  password: string;
}

const parseInput = (input: string[]): Parsed[] => {
  return input.map((str) => {
    let [lowHigh, char, password] = str.split(" ");
    const [low, high] = lowHigh.split("-");
    char = char.split(":")[0];

    return { low: parseInt(low), high: parseInt(high), char, password };
  });
};

const parsed = parseInput(input);

console.log(
  parsed.reduce((acc, curr) => {
    const { low, high, char, password } = curr;
    let charCount = 0;

    for (const c of password) {
      if (c === char) {
        charCount++;
      }
    }

    return charCount >= low && charCount <= high ? ++acc : acc;
  }, 0)
);
