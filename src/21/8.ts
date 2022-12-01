import { getInput } from "./utils/file-reader";
import { equalChars } from "./utils/equal-chars";

// 8.1
const rawInput = getInput(8);

const encryptedMessage = rawInput
  .map((line) => line.split("|")[1])
  .map((output) => output.split(" ").filter((str) => str !== ""));

const uniqueSignalPatterns = rawInput
  .map((line) => line.split("|")[0])
  .map((output) => output.split(" ").filter((str) => str !== ""));

const uniqueSegmentToNumber = {
  "2": 1,
  "4": 4,
  "3": 7,
  "7": 8,
};

const getUniqueNumCount = (
  input: string[][],
  uniqueSegmentToNumber: { [k: string]: number }
) => {
  let counter = 0;

  for (const lineOutput of input) {
    for (const segments of lineOutput) {
      for (const uniqueSegmentsNum in uniqueSegmentToNumber) {
        if (parseInt(uniqueSegmentsNum) === segments.length) {
          counter++;
        }
      }
    }
  }
  return counter;
};
// console.log(getUniqueNumCount(encryptedMessage, uniqueSegmentToNumber));

// 8.2
// map of unique numbers:
//  segNum  num
//     "2": 1
//     "4": 4
//     "3": 7
//     "7": 8

// 1. find 1 and define segment 1 and 2
// 2. find 7 and define segment 0
// 3. find 4 and define segment 5 and 6
// 4. find 3 (len === 5) && a,b,d and define 3 and 6 and 5
// 5. find 5 (len === 5) && d,e,f,c and define 1 and 2
// 6. remove all known segments from 8 and define 4
// 7. -> all segments are known

// [-----] -> 0 -> d
// [    -] -> 1 -> ab -> a
// [    -] -> 2 -> ab -> b
// [-----] -> 3 -> c
// [-    ] -> 4
// [-    ] -> 5 -> ef -> e
// [-----] -> 6 -> ef -> f

// UTILS
const removeSegments =
  (segments: string) =>
  (from: string): string => {
    for (const char of segments) {
      from = from.replace(char, "");
    }

    return from;
  };

// MAIN
const decryptSegments = (encrypted: string[]) => {
  const segments: string[][] = [[], [], [], [], [], [], []];

  const one = encrypted.find((str) => str.length === 2) as string;
  const seven = encrypted.find((str) => str.length === 3) as string;
  const four = encrypted.find((str) => str.length === 4) as string;
  const three = encrypted.filter(
    (str) => str.length === 5 && str.includes(one[0]) && str.includes(one[1])
  )[0];
  const eight = encrypted.filter((str) => str.length === 7)[0];

  const removeOneFrom = removeSegments(one);
  const removeSevenFrom = removeSegments(seven);

  // 1.
  segments[1].push(one);
  segments[2].push(one);
  // 2.
  segments[0].push(removeOneFrom(seven));
  // 3.
  segments[5].push(removeOneFrom(four));
  segments[6].push(removeOneFrom(four));
  // 4.
  segments[6] = segments[6][0]
    .split("")
    .filter((str) => removeSevenFrom(three).includes(str));
  segments[3][0] = removeSegments(segments[6][0])(removeSevenFrom(three));
  segments[5] = segments[5][0]
    .split("")
    .filter((str) => str !== segments[6][0]);
  // 5.
  const five = encrypted.filter(
    (str) => str.length === 5 && str.includes(segments[5][0])
  )[0];
  segments[2] = segments[2][0].split("").filter((str) => five.includes(str));
  segments[1] = segments[1][0]
    .split("")
    .filter((str) => str !== segments[2][0]);
  // 6.
  const allExceptFour = segments
    .reduce((acc, curr) => [...acc, ...curr])
    .join("");
  segments[4][0] = removeSegments(allExceptFour)(eight);
  // 7.
  const zero = removeSegments(segments[6][0])(eight);
  const two = encrypted.filter(
    (str) => str.length === 5 && str !== five && str.includes(segments[4][0])
  )[0];

  const six = removeSegments(segments[1][0])(eight);
  const nine = removeSegments(segments[4][0])(eight);

  return {
    0: zero,
    1: one,
    2: two,
    3: three,
    4: four,
    5: five,
    6: six,
    7: seven,
    8: eight,
    9: nine,
  };
};

const decryptMessage = (
  message: string[],
  decryptedSegments: { [k: string]: string }
) => {
  let decryptedMessage = "";
  for (const encrypted of message) {
    for (const num in decryptedSegments) {
      decryptedSegments[num];
      if (equalChars(encrypted, decryptedSegments[num])) {
        decryptedMessage += num;
      }
    }
  }
  return parseInt(decryptedMessage);
};

const addEncryptedMessages = (rawInput: string[]): number => {
  let counter = 0;

  for (const line of rawInput) {
    const uniqueSignalPatterns = [line.split("|")[0]].flatMap((output) =>
      output.split(" ").filter((str) => str !== "")
    );

    const encryptedMessage = [line.split("|")[1]].flatMap((output) =>
      output.split(" ").filter((str) => str !== "")
    );

    const decryptedSegments = decryptSegments(uniqueSignalPatterns);
    counter += decryptMessage(encryptedMessage, decryptedSegments);
  }

  return counter;
};

console.log(addEncryptedMessages(rawInput));
