import lineByLine from "n-readlines";

const liner = new lineByLine("./input7.txt");
let input = liner
  .next()
  .toString("utf-8")
  .split(",")
  .map((str) => parseInt(str));

// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const getMedianSum = (arr, median) => {
  let sum = 0;
  for (let num of arr) {
    sum += Math.abs(num - median);
  }
  return sum;
};

const leastFuel = (input) => {
  let median1;
  let median2;

  // sort ascending --> doesen't matter though as long as it is sorted
  const sorted = input.sort((a,b) => a-b);
  console.log(sorted);

  // case even length of input
  if (sorted.length % 2 === 0) {
    // check for both middle elements
    median1 = sorted[sorted.length / 2 - 1];
    median2 = sorted[sorted.length / 2];
    // console.log(median1, median2);

    // return smaller of the two sums
    return Math.min(
      getMedianSum(sorted, median1),
      getMedianSum(sorted, median2)
    );
  }
  // case uneven length of input
  else {
    median1 = sorted[Math.floor(sorted.length / 2)];
    return getMedianSum(sorted, median1);
  }
};

console.log(leastFuel(input));
