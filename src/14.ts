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
    if (char in counter) {
      // why does counter[char]++ don't work?
      counter[char] = counter[char] + 1;
    } else {
      counter[char] = 1;
    }
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

const template = step(10, polymerTemplate);
const counter = count(template);
const diff = getMaxMinDiff(counter);
console.log(diff);
