import { toNum } from "./utils/toNum";
import { getInput } from "./utils/file-reader";

let input: string[] = getInput(1);

const mappedInput = toNum(input);

// 1.1
const getIncreases = (inputs: number[]): number => {
  let increases = 0;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i] < inputs[i + 1] ? increases++ : null;
  }

  return increases;
};

// console.log(getIncreases(inputs));

// 1.2
const getIncreasedTriplets = (inputs: number[]): number => {
  let increases = 0;

  for (let i = 0; i < inputs.length - 3; i++) {
    const firstTriplet = inputs.slice(i, i + 3);
    const secondTriplet = inputs.slice(i + 1, i + 4);

    firstTriplet.reduce((prev, curr) => prev + curr) <
    secondTriplet.reduce((prev, curr) => prev + curr)
      ? increases++
      : null;
  }

  return increases;
};

// console.log(getIncreasedTriplets(mappedInput));
