import { getInput } from "../../get-input";

// const testInput = `
// Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3

// Monkey 1:
//   Starting items: 54, 65, 75, 74
//   Operation: new = old + 6
//   Test: divisible by 19
//     If true: throw to monkey 2
//     If false: throw to monkey 0

// Monkey 2:
//   Starting items: 79, 60, 97
//   Operation: new = old * old
//   Test: divisible by 13
//     If true: throw to monkey 1
//     If false: throw to monkey 3

// Monkey 3:
//   Starting items: 74
//   Operation: new = old + 3
//   Test: divisible by 17
//     If true: throw to monkey 0
//     If false: throw to monkey 1`;

// const input = testInput?.split("\n").filter((str) => str.includes("  "))!;

const input = getInput("./src/22/inputs/input-11.txt")
  ?.split("\n")
  .filter((str) => str.includes("  "))!;

interface Monkey {
  items: number[];
  operation: string;
  test: {
    divisor: number;
    ifTrueToMonkey: number;
    ifFalseToMonkey: number;
  };
  inspectedItems: number;
}

const createMonkeys = () => {
  const monkeys: Monkey[] = [];
  let current: Monkey = {
    items: [],
    operation: "",
    test: { divisor: 0, ifFalseToMonkey: 0, ifTrueToMonkey: 0 },
    inspectedItems: 0,
  };

  for (const line of input) {
    const [action, actionContent] = line.split(": ");

    if (action.includes("Starting")) {
      const items = actionContent
        .trim()
        .split(", ")
        .map((str) => parseInt(str));

      current.items = items;
    }

    if (action.includes("Operation")) {
      const content = actionContent.trim().split("= ");
      current.operation = content[content.length - 1];
    }

    if (action.includes("Test")) {
      const content = actionContent.split(" ");

      current.test = {
        ...current.test,
        divisor: parseInt(content[content.length - 1]),
      };
    }

    if (action.includes("true")) {
      const content = actionContent.split(" ");

      current.test = {
        ...current.test,
        ifTrueToMonkey: parseInt(content[content.length - 1]),
      };
    }

    if (action.includes("false")) {
      const content = actionContent.split(" ");

      current.test = {
        ...current.test,
        ifFalseToMonkey: parseInt(content[content.length - 1]),
      };

      monkeys.push({ ...current });
    }
  }

  return monkeys;
};

const monkeys = createMonkeys();

const monkeyPlays = (monkey: Monkey) => {
  monkey.items.forEach((item) => {
    monkey.inspectedItems++;
    const old = item;
    const newLevel = eval(monkey.operation);

    // TEST
    const finalStessLevel = Math.floor(newLevel / 3);
    if (finalStessLevel % monkey.test.divisor === 0) {
      monkeys[monkey.test.ifTrueToMonkey].items.push(finalStessLevel);

      return;
    }

    monkeys[monkey.test.ifFalseToMonkey].items.push(finalStessLevel);
  });

  monkey.items = [];
};

const play = (rounds: number) => {
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      monkeyPlays(monkey);
    }
  }
};

play(20);
monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
console.log(monkeys[0].inspectedItems * monkeys[1].inspectedItems);
