import { getTransformedStringArr as transformArr } from "./3-1.js";
import { arr } from "./3-1.js";

const countNums = (arr, index) => {
  const count = {
    ones: 0,
    zeros: 0,
  };
  for (let entry of arr[index]) {
    entry === "1" ? (count.ones += 1) : (count.zeros += 1);
  }

  return count;
};

const getOxygen = (arr) => {
  // make a copy of arr to mutate
  // unperformant use slice instead
  // let array = [...arr];
  let array = arr.slice();
  let index = 0;
  while (array.length > 1) {
    const transformedArr = transformArr(array);
    const count = countNums(transformedArr, index);

    if (count.ones >= count.zeros) {
      array = array.filter((subArr) => subArr[index] === "1");
    } else {
      array = array.filter((subArr) => subArr[index] === "0");
    }

    index++;
  }

  return array;
};
const getCo2 = (arr) => {
  // make a copy of arr to mutate
  let array = [...arr];
  let index = 0;
  while (array.length > 1) {
    const transformedArr = transformArr(array);
    const count = countNums(transformedArr, index);

    if (count.zeros <= count.ones) {
      array = array.filter((subArr) => subArr[index] === "0");
    } else {
      array = array.filter((subArr) => subArr[index] === "1");
    }
    index++;
  }

  return array;
};

const oxygenRating = getOxygen(arr);
const co2Rating = getCo2(arr);

console.log(
  `oxygenRating: ${parseInt(co2Rating, 2)}, co2Rating: ${parseInt(
    oxygenRating,
    2
  )}`
);

console.log(`result: ${parseInt(co2Rating, 2) * parseInt(oxygenRating, 2)}`);
