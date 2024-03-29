import { getInput } from "./get-input";

const input = getInput("./src/22/inputs/input-1.txt");

// 1
const arr = input?.split("\n");

const addedCals = [];
if (arr) {
  let acc = 0;
  for (const el of arr) {
    if (el !== "") {
      acc += parseInt(el);
    } else {
      addedCals.push(acc);
      acc = 0;
    }
  }
}

const res1 = addedCals.reduce((acc, curr) => (curr > acc ? curr : acc));
// console.log(res1);

const res2 = addedCals
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr);

console.log(res2);
