import { getInput } from "../../get-input";

const input = getInput("./src/22/inputs/input-4.txt")
  ?.split("\n")
  .filter((str) => str);

const getFullyContainedSum = () => {
  if (!input) return;
  let sum = 0;

  for (const line of input) {
    const [first, second] = line.split(",");
    const [lowerFirst, upperFirst] = first.split("-");
    const [lowerSecond, upperSecond] = second.split("-");

    const firstContainsSecond =
      parseInt(lowerFirst) <= parseInt(lowerSecond) &&
      parseInt(upperFirst) >= parseInt(upperSecond);
    const secondContainsFirst =
      parseInt(lowerSecond) <= parseInt(lowerFirst) &&
      parseInt(upperSecond) >= parseInt(upperFirst);

    if (firstContainsSecond || secondContainsFirst) {
      sum++;
    }
  }

  return sum;
};

console.log(getFullyContainedSum());
