import { getInput } from "./get-input";

const input = getInput("./src/20/inputs/input-1.txt")
  ?.split("\n")
  .map((str) => parseInt(str))!;

input.pop();
const sum = 2020;

// C(n,r) = n!/(r!(n-r)!) -> C are the combinations, n the objects, r the samples
function twoSumEquals(input: number[]) {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === sum) {
        return [input[i], input[j]];
      }
    }
  }

  return [];
}

// const [first, second] = twoSumEquals(input);
// console.log(first * second);

function threeSumEquals(input: number[]) {
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let z = j + 1; z < input.length; z++) {
        if (input[i] + input[j] + input[z] === sum) {
          return [input[i], input[j], input[z]];
        }
      }
    }
  }

  return [];
}

const [first, second, third] = threeSumEquals(input);
console.log(first * second * third);
