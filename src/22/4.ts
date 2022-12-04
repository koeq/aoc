import { getInput } from "../../get-input";

const input = getInput("./src/22/inputs/input-4.txt")
  ?.split("\n")
  .filter((str) => str);

const getFullyContainedSum = () => {
  if (!input) return;
  let sum = 0;

  for (const line of input) {
    const [first, second] = line.split(",");

    const [lowerFirst, upperFirst] = first
      .split("-")
      .map((str) => parseInt(str));

    const [lowerSecond, upperSecond] = second
      .split("-")
      .map((str) => parseInt(str));

    const firstContainsSecond =
      lowerFirst <= lowerSecond && upperFirst >= upperSecond;
    const secondContainsFirst =
      lowerSecond <= lowerFirst && upperSecond >= upperFirst;

    if (firstContainsSecond || secondContainsFirst) {
      sum++;
    }
  }

  return sum;
};

// console.log(getFullyContainedSum());

// 2
const getPartlyContainedSum = () => {
  if (!input) return;
  let sum = 0;

  for (const line of input) {
    const [first, second] = line.split(",");

    const [lowerFirst, upperFirst] = first
      .split("-")
      .map((str) => parseInt(str));

    const [lowerSecond, upperSecond] = second
      .split("-")
      .map((str) => parseInt(str));

    const firstOverlapsWithSecond =
      (lowerFirst <= lowerSecond && upperFirst >= lowerSecond) ||
      (upperFirst >= upperSecond && lowerFirst <= upperSecond);

    const secondOverlapsWithFirst =
      (lowerSecond <= lowerFirst && upperSecond >= lowerFirst) ||
      (upperSecond >= upperFirst && lowerSecond <= upperFirst);

    if (firstOverlapsWithSecond || secondOverlapsWithFirst) {
      sum++;
    }
  }

  return sum;
};

console.log(getPartlyContainedSum());
