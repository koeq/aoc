import { getInput } from "./utils/file-reader";
import { toNum } from "./utils/toNum";

const input = getInput(2);

const calculatePosition = (input: string[]) => {
  let x = 0;
  let y = 0;

  for (const directionAmount of input) {
    const splittedDirection = directionAmount.split(" ");
    const amount = parseInt(splittedDirection[1]);
    const direction = splittedDirection[0];

    // switch (splittedDirection[0]) {
    //   case "up":
    //     y -= amount;
    //     break;
    //   case "down":
    //     y += amount;
    //     break;
    //   case "forward":
    //     x += amount;
    //     break;
    // }

    // if (direction === "forward") {
    //   x += amount;
    // } else if (direction === "up") {
    //   y -= amount;
    // } else {
    //   y += amount;
    // }

    direction === "forward"
      ? (x += amount)
      : direction === "up"
      ? (y -= amount)
      : (y += amount);
  }

  return x * y;
};

// console.log(calculatePosition(input));
