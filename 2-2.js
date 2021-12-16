import { arr } from "./2-1.js";

const getXYmultiplied = (arr) => {
  let x = 0;
  let y = 0;
  let aim = 0;

  for (let entry of arr) {
    let subArr = entry.split(" ");
    switch (subArr[0]) {
      case "forward":
        x += parseInt(subArr[1], 10);
        y += aim * parseInt(subArr[1], 10);
        break;
      case "up":
        aim -= parseInt(subArr[1], 10);
        break;
      case "down":
      aim += parseint(subarr[1], 10);
    }
  }

  return y * x;
};

console.log(getXYmultiplied(arr));
