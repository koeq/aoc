import { getInput } from "./get-input";

const input = getInput("./src/20/inputs/input-1.txt")
  ?.split("\n")
  .map((str) => parseInt(str))!;

input.pop();
const sum = 2020;

// C(n,r) = n!/(r!(n-r)!) -> C are the combinations, n the objects, r the samples
function sumEquals(input: number[]) {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === sum) {
        return [input[i], input[j]];
      }
    }
  }

  return [];
}

const [first, second] = sumEquals(input);
console.log(first * second);
