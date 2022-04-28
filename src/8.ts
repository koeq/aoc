import { getInput } from "./utils/fileReader";

const rawInput = getInput(8);

const input = rawInput
  .map((line) => line.split("|")[1])
  .map((output) => output.split(" ").filter((str) => str !== ""));

const getUniqueNumCount = (input: string[][]) => {
  const uniqueSegmentCountToNumber = {
    "2": 1,
    "4": 4,
    "3": 7,
    "7": 8,
  };

  let counter = 0;

  for (const lineOutput of input) {
    for (const segments of lineOutput) {
      for (const uniqueSegmentsNum in uniqueSegmentCountToNumber) {
        if (parseInt(uniqueSegmentsNum) === segments.length) {
          counter++;
        }
      }
    }
  }
  return counter;
};

console.log(getUniqueNumCount(input));
