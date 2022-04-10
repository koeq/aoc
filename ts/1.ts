import { getInput, liner } from "../file-reader.js";

let input: string[] = getInput(liner);

// UTILS
const toNum = (input: string[]): number[] => {
  const mapped = input.map((element) => parseInt(element));

  return mapped;
};

const inputs = toNum(input);

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
const getIncreasedTriplets = (inputs: string[]): number => {
  let increases = 0;

  for (let i = 0; i < inputs.length; i++) {
    parseInt(inputs[i]) < parseInt(inputs[i + 1]) ? increases++ : null;
  }

  return increases;
};
