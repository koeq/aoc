import { getInput } from "./get-input";

const backpacks = getInput("./src/22/inputs/input-3.txt")
  ?.split("\n")
  .filter((backpack) => backpack);

const getDuplicates = (): string[] | undefined => {
  if (!backpacks) return;
  let duplicates: string[] = [];

  for (const backpack of backpacks) {
    const uniqueDuplicates = new Set<string>();
    const mid = backpack.length / 2;
    const lower = backpack.slice(0, mid);
    const upper = backpack.slice(mid, backpack.length);

    for (const char of lower) {
      if (upper.includes(char)) {
        uniqueDuplicates.add(char);
      }
    }

    duplicates = [...duplicates, ...uniqueDuplicates];
  }

  return duplicates;
};

const duplicates = getDuplicates();

// Priorities
// a-z -> 1-26 ---> UTF-16 Code 097-122 --> charCode - 96
// Lower case -> charCode >= 097 && charCode <= 122
// A-Z -> 27-52 ---> UTF-16 Code 065-090 ---> charCode - 38
// Upper case -> charCode >= 065 && charCode <= 90

const getPrioriety = (char: string): number => {
  // Lowercase
  const charCode = char.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
    // Upper case
  } else {
    return charCode - 38;
  }
};

const getPriorietySum = (duplicates: string[] | undefined) => {
  let sum = 0;

  duplicates?.forEach((duplicate) => {
    sum = sum + getPrioriety(duplicate);
  });

  return sum;
};

// console.log(getPriorietySum(duplicates));

const getDuplicatesOfThree = () => {
  if (!backpacks) return;
  let duplicates: string[] = [];

  for (let i = 0; i < backpacks.length; i += 3) {
    const uniqueDuplicates = new Set<string>();
    const first = backpacks[i];
    const second = backpacks[i + 1];
    const third = backpacks[i + 2];

    for (const char of first) {
      if (second.includes(char) && third.includes(char)) {
        uniqueDuplicates.add(char);
      }
    }

    duplicates = [...duplicates, ...uniqueDuplicates];
  }

  return duplicates;
};

const duplicatesOfThree = getDuplicatesOfThree();
console.log(getPriorietySum(duplicatesOfThree));
