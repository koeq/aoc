import { input } from "./6-1.js";

let count = Array(9).fill(0);

input.forEach((num) => count[num]++);

const simulate = (days, count) => {
  for (let i = 0; i < days; i++) {
    // remove zeros from beginning
    const zeros = count.shift();

    // add amount of zeros to the end (8th position)
    count.push(zeros);

    // add zeros to the 6th index
    count[6] += zeros;
  }

  let sum = count.reduce((prev, curr) => prev + curr);
  console.log(sum);
};

simulate(256, count);
