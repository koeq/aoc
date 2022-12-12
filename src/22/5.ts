import { getInput } from "./get-input";
import { Stack } from "./stack";

const input = getInput("./src/22/inputs/input-5.txt")
  ?.split("\n")
  .filter((str) => str);

const stacksInput = input?.slice(0, 8);
const instructionsInput = input?.slice(9);

function createStacks(): Stack<string>[] | undefined {
  if (!stacksInput) return;
  const stacks: Stack<string>[] = [];

  // use last row of stacksInput for easy splitting
  const bottom = stacksInput[stacksInput.length - 1];
  // create stacks
  bottom.split("").forEach((_) => stacks.push(new Stack<string>()));

  // walking from the bottom to the top
  for (let i = stacksInput.length - 1; i >= 0; i--) {
    const row = stacksInput[i].split("");
    for (let j = 0; j < row.length; j++) {
      const str = row[j];

      if (/[A-Z]+/.test(str)) {
        stacks[j].push(str);
      }
    }
  }

  return stacks.filter((stack) => stack.length);
}

interface Instruction {
  amount: number;
  from: number;
  to: number;
}

const getInstrcutions = (): Instruction[] => {
  if (!instructionsInput) return [];

  return instructionsInput.map((instruction) => {
    const entrys = instruction.split(" ");

    return {
      amount: parseInt(entrys[1]),
      from: parseInt(entrys[3]),
      to: parseInt(entrys[5]),
    };
  });
};

const stacks = createStacks();
const instructions = getInstrcutions();

// 1
const moveStacks = () => {
  if (!instructions || !stacks) return;

  for (const instruction of instructions) {
    let i = 0;
    while (i < instruction.amount) {
      const content = stacks[instruction.from - 1].pop();

      if (content) {
        stacks[instruction.to - 1].push(content);
      }

      i++;
    }
  }
};

//2
const moveStacksAtOnce = () => {
  if (!instructions || !stacks) return;

  for (const instruction of instructions) {
    let i = 0;
    const crates = [];

    while (i < instruction.amount) {
      // save removed crates
      crates.unshift(stacks[instruction.from - 1].pop());

      i++;
    }
    crates.forEach((str) => {
      if (str) {
        stacks[instruction.to - 1].push(str);
      }
    });
  }
};

// 1
// moveStacks()

// 2
moveStacksAtOnce();
let message = "";
stacks?.forEach((stack) => (message += stack.peek()));
console.log(message);
