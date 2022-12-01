import { getInput } from "./utils/file-reader";

interface Rule {
  [k: string]: string;
}

// const rawInput = [
//   "NNCB",
//   "",
//   "CH -> B",
//   "HH -> N",
//   "CB -> H",
//   "NH -> C",
//   "HB -> C",
//   "HC -> B",
//   "HN -> C",
//   "NN -> C",
//   "BH -> H",
//   "NC -> B",
//   "NB -> B",
//   "BN -> B",
//   "BB -> N",
//   "BC -> B",
//   "CC -> N",
//   "CN -> C",
// ];

const rawInput = getInput(14);

const polymerTemplate = rawInput.slice(0, 1).join();
const insertionRules = rawInput.slice(2).reduce((acc, curr) => {
  return {
    ...acc,
    [curr.split("->")[0].trim()]: curr.split("->")[1].trim(),
  };
}, {});

// 14.1
// algorithm
// 1. for each step
// 2. figure out pairs
// 3. insert between pairs according to insertion rules
//    -> create new template to avoid matching problems when inserting
// 4. return outcome as new template

const getPairs = (polymerTemplate: string) => {
  const pairs: string[] = [];

  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    pairs.push(`${polymerTemplate[i]}${polymerTemplate[i + 1]}`);
  }

  return pairs;
};

const insert = (pairs: string[], insertionRules: Rule) => {
  let newTemplate = "";

  for (const pair of pairs) {
    newTemplate += `${pair[0]}${insertionRules[pair]}`;
  }

  // add last letter of last pair
  newTemplate += pairs[pairs.length - 1][1];

  return newTemplate;
};

const step = (steps: number, template: string) => {
  for (let i = 0; i < steps; i++) {
    const pairs = getPairs(template);
    template = insert(pairs, insertionRules);
  }
  return template;
};

const count = (template: string) => {
  const counter: { [k: string]: number } = {};
  for (const char of template) {
    // check if value exists -> return 1 if not
    //                       -> return value + 1 if so
    counter[char] = (counter[char] || 0) + 1;
  }

  return counter;
};

const getMaxMinDiff = (counter: { [k: string]: number }) => {
  const nums: number[] = [];

  for (const char in counter) {
    nums.push(counter[char]);
  }

  const max = nums.reduce((acc, curr) => Math.max(acc, curr));
  const min = nums.reduce((acc, curr) => Math.min(acc, curr));

  return max - min;
};

// const template = step(3, polymerTemplate);
// const counter = count(template);
// const diff = getMaxMinDiff(counter);
// console.log(diff);

// 14.2
// Template:     NNCB
// After step 1: NCNBCHB
// After step 2: NBCCNBBBCBHCB -> length = 13 --> pairs = length - 1 === 12
// After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
// After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB

// Pairs counted from template
//  {
// "NN": 1,
// "NC": 1,
// "CB": 1,
// }
// After          step 1        step2
//  {
// "NN": 1, -1     --> 0
// "NC": 1, +1 -1  --> 1
// "CB": 1, -1     --> 0
// "CN": 0, +1     --> 1
// "NB": 0, +1     --> 1
// "BC": 0, +1     --> 1
// "CH": 0, +1     --> 1
// "HB": 0, +1     --> 1
// }

// count in the pairs:
// => N: 3, C: 4, B: 3, H: 2

// if count % 2 !== 0
// count = Math.round(count/2) ->
// else count = count/2
// => N: 2, C: 2, B: 2, H: 1

const createCounter = (
  insertionRules: { [k: string]: string },
  pairs: string[]
) => {
  const counter: { [k: string]: number } = {};

  for (const rule in insertionRules) {
    counter[rule] = 0;
  }

  for (const pair of pairs) {
    counter[pair]++;
  }

  return counter;
};

const pairs = getPairs(polymerTemplate);
const counter = createCounter(insertionRules, pairs);

const count2 = (
  counter: {
    [k: string]: number;
  },
  insertionRules: {
    [k: string]: string;
  }
) => {
  // don't iterate over the object we're manipulating
  const newCounter = { ...counter };

  for (const pair in counter) {
    if (counter[pair]) {
      const insert = insertionRules[pair];
      const firstPairPart = pair[0];
      const secondPairPart = pair[1];
      newCounter[`${firstPairPart}${insert}`] += counter[pair];
      newCounter[`${insert}${secondPairPart}`] += counter[pair];
      newCounter[pair] -= counter[pair];
    }
  }

  return newCounter;
};

const step2 = (steps: number, counter: { [k: string]: number }) => {
  for (let i = 0; i < steps; i++) {
    counter = count2(counter, insertionRules);
  }
  return counter;
};
const counted = step2(40, counter);

const countLetters = (counted: { [k: string]: number }) => {
  const lettersCounter: { [k: string]: number } = {};

  for (const pair in counted) {
    const firstPairPart = pair[0];
    const secondPairPart = pair[1];
    lettersCounter[firstPairPart] =
      (lettersCounter[firstPairPart] || 0) + counted[pair];
    lettersCounter[secondPairPart] =
      (lettersCounter[secondPairPart] || 0) + counted[pair];
  }

  for (const letter in lettersCounter) {
    if (lettersCounter[letter] % 2 === 0) {
      lettersCounter[letter] = lettersCounter[letter] / 2;
    } else {
      lettersCounter[letter] = Math.round(lettersCounter[letter] / 2);
    }
  }

  return lettersCounter;
};

const lettersCounter = countLetters(counted);

const getDelta = (lettersCounter: { [k: string]: number }) => {
  let max = 0;
  let min = 0;

  for (const letter in lettersCounter) {
    if (!max) {
      max = lettersCounter[letter];
    } else {
      max = lettersCounter[letter] > max ? lettersCounter[letter] : max;
    }

    if (!min) {
      min = lettersCounter[letter];
    } else {
      min = lettersCounter[letter] < min ? lettersCounter[letter] : min;
    }
  }

  return max - min;
};

const delta = getDelta(lettersCounter);
console.log(delta);
