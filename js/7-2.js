import lineByLine from "n-readlines";

const liner = new lineByLine("./input7.txt");
let input = liner
  .next()
  .toString("utf-8")
  .split(",")
  .map((str) => parseInt(str));

// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const getFuelCost = (arr, avg) => {
  let sum = 0;
  for (let num of arr) {
    let delta = Math.abs(num - avg);
    // calculate needed fuel for each difference via:
    // gaußsche summenformel delta (n = n**2 + n) / 2
    sum += (delta ** 2 + delta) / 2;
  }
  return sum;
};


// check for both whole numbered averages
const lowerAvg = Math.floor(
  input.reduce((prev, curr) => prev + curr) / input.length
);
const higherAvg = Math.ceil(
  input.reduce((prev, curr) => prev + curr) / input.length
);

const minFuelCost = Math.min(
  getFuelCost(input, lowerAvg),
  getFuelCost(input, higherAvg)
);
console.log(minFuelCost);
