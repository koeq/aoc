import { getInput, liner } from "../file-reader.js";

const input: string[] = getInput(liner);

const getIncreases = (input: string[]): number => {
  let increases = 0;
  for (let i = 0; i < input.length; i++) {
    
    parseInt(input[i]) < parseInt(input[i + 1]) ? increases++ : null;
  }

  return increases;
};

console.log(getIncreases(input));
