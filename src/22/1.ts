import fs from "fs";

const getInput = () => {
  let input;

  try {
    input = fs.readFileSync("./src/22/inputs/input-1.txt", "utf-8");
  } catch (err) {
    console.log(err);
  }

  return input;
};

const input = getInput();

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
