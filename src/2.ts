import { getInput } from "./utils/file-reader";
import { toNum } from "./utils/toNum";

const input = getInput(2);

const calculatePosition = (input: string[]) => {
  let x = 0;
  let y = 0;

  for (const direction of input) {
    const splittedDirection = direction.split(" ");
    const amount = parseInt(splittedDirection[1]);

    switch (splittedDirection[0]) {
      case "up":
        y -= amount;
        break;
      case "down":
        y += amount;
        break;
      case "forward":
        x += amount;
        break;
    }
  }

  return x * y;
};

// console.log(calculatePosition(input));
