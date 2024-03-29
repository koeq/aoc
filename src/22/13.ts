import { getInput } from "./get-input";

const input = getInput("./src/22/inputs/input-13.txt")?.split("\n")!;
input.pop();

// this logic seems flawed
interface NestedArray<T> extends Array<T | NestedArray<T>> {}
type Tuple = [number[] | NestedArray<number>, number[] | NestedArray<number>];

const groupInput = (input: string[]) => {
  const groupedInput: Tuple[] = [];
  let left: number[] | NestedArray<number> = [];
  let right: number[] | NestedArray<number> = [];

  for (let i = 0; i < input.length; i = i + 3) {
    left = eval(input[i]);
    right = eval(input[i + 1]);
    groupedInput.push([left, right]);
  }

  return groupedInput;
};

const groupedInput = groupInput(input);

// Compare left and right
// Rules
// 1. both values integers:
//       --> lower integer should come first
// 2. both values are list:
//      --> check items for decision
//      --> if run out of values left -> correct order
//      --> if same length and no decision continue to next part of input -> no decision
// 3. one value is a integer:
//      --> convert integer to list that contains the integer
//      --> retry comparison

const isInOrder = (
  left: number | number[] | NestedArray<number>,
  right: number | number[] | NestedArray<number>
): boolean | undefined => {
  // CASE 1: both integers
  if (typeof left === "number" && typeof right === "number") {
    return left < right ? true : left > right ? false : undefined;
  }

  // CASE 3: one value is a integer
  if (typeof left === "number" && Array.isArray(right)) {
    return isInOrder([left], right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return isInOrder(left, [right]);
  }

  // CASE 2: both values are lists
  if (Array.isArray(left) && Array.isArray(right)) {
    // same length
    if (left.length === right.length) {
      for (let i = 0; i < left.length; i++) {
        const res = isInOrder(left[i], right[i]);
        if (res) {
          return true;
        }
        if (res === false) {
          return false;
        }
      }
    }

    // left shorter
    if (left.length < right.length) {
      for (let i = 0; i < left.length; i++) {
        const res = isInOrder(left[i], right[i]);
        if (res === false) {
          return false;
        }

        if (res === true) {
          return true;
        }
      }

      return true;
    }

    // left longer
    if (left.length > right.length) {
      for (let i = 0; i < right.length; i++) {
        const res = isInOrder(left[i], right[i]);
        if (res === false) {
          return false;
        }

        if (res === true) {
          return true;
        }
      }

      return false;
    }
  }
};

const countCorrectOrder = (groupedInput: Tuple[]): number[] => {
  let inOrderIndicies: number[] = [];

  for (let i = 0; i < groupedInput.length; i++) {
    const [left, right] = groupedInput[i];
    const res = isInOrder(left, right);

    if (res) {
      inOrderIndicies.push(i + 1);
    }
  }

  return inOrderIndicies;
};

// const inOrderIndices = countCorrectOrder(groupedInput);
// console.log(inOrderIndices.reduce((acc, curr) => acc + curr));

// 2
const getLinearInput = (input: string[]) => {
  const filteredInput: NestedArray<number>[] = [];

  for (const str of input) {
    if (str.length) {
      filteredInput.push(eval(str));
    }
  }

  return filteredInput;
};
const linearInput = getLinearInput(input);
linearInput.push([[2]]);
linearInput.push([[6]]);

const bubbleSort = (input: NestedArray<number>) => {
  for (let j = 0; j < input.length; j++) {
    for (let i = 0; i < input.length - 1 - j; i++) {
      if (!isInOrder(input[i], input[i + 1])) {
        const temp = input[i + 1];
        input[i + 1] = input[i];
        input[i] = temp;
      }
    }
  }

  return input.map((entry) => JSON.stringify(entry));
};

const stringifiedSorted = bubbleSort(linearInput);
console.log(
  (stringifiedSorted.indexOf("[[2]]") + 1) *
    (stringifiedSorted.indexOf("[[6]]") + 1)
);
