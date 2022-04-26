import { getInput } from "./utils/fileReader";

// TEST INPUT
// const rawInput = ["3, 4, 3, 1, 2"];

const rawInput = getInput(6);
const input = rawInput[0].split(",").map((str) => parseInt(str));

const getPopulationCount = (input: number[], cycles: number) => {
  let tracker = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const fish of input) {
    tracker[fish]++;
  }

  for (let i = 1; i <= cycles; i++) {
    const nextTracker = [];
    nextTracker.unshift(tracker[0]);
    // iterate from 8th index to 1st index
    for (let j = tracker.length - 1; j > 0; j--) {
      //  add the fishes that just duplicated to index 6
      if (j === 7) {
        nextTracker.unshift(tracker[j] + tracker[0]);
      } else {
        nextTracker.unshift(tracker[j]);
      }
    }
    tracker = nextTracker;
    // console.log(`after day ${i}: ${tracker}`);
  }
  return tracker;
};

console.log(getPopulationCount(input, 256).reduce((acc, curr) => acc + curr));
