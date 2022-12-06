import { getInput } from "../../get-input";

const input = getInput("./src/22/inputs/input-6.txt");

const getProcessedCountBeforeFourUnique = () => {
  if (!input) {
    return;
  }

  const getMaxCharCount = (arr: string[]) => {
    const max = Math.max(
      ...arr.map((char) =>
        arr.reduce(
          (counter, currChar) => (currChar === char ? ++counter : counter),
          0
        )
      )
    );

    return max;
  };

  // 0 1 2 3 4
  for (let i = 0; i < input.length - 3; i++) {
    if (getMaxCharCount(input.slice(i, i + 4).split("")) === 1) {
      return i + 4;
    }
  }
};

const processedCount = getProcessedCountBeforeFourUnique();
console.log(processedCount);
