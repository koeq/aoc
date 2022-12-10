import { getInput } from "../../get-input";

const instructions = getInput("./src/22/inputs/input-10.txt")?.split("\n")!;
instructions.pop();

const getSignalStrengthSum = () => {
  const cycles = [20, 60, 100, 140, 180, 220];
  let cycle = 0;
  let X = 1;
  let sum = 0;

  for (const input of instructions) {
    const [instruction, amount] = input.split(" ");

    if (instruction === "noop") {
      cycle++;
      if (cycles.includes(cycle)) {
        sum += cycle * X;
      }
      continue;
    }

    // read
    cycle++;

    if (cycles.includes(cycle)) {
      sum += cycle * X;
    }
    // execute
    cycle++;

    if (cycles.includes(cycle)) {
      sum += cycle * X;
    }

    // increment
    X = X + parseInt(amount);
  }

  return sum;
};

// const sum = getSignalStrengthSum();
// console.log(sum);

// 2
// screen size: 40 x 6 --> width: 0-39, height: 0-5
// sprite: 3 pixels --> X register sets horizontal position of the middle of the sprite
// CRT is tied to clock cycle --> draws one pixel per cycle '#'

const spriteAtCurrent = (spriteMid: number, currIndex: number) =>
  currIndex === spriteMid - 1 ||
  currIndex === spriteMid ||
  currIndex === spriteMid + 1;

const draw = () => {
  const screen: string[] = [];
  let row = "";
  let cycle = 0;
  let X = 1;
  let spriteMid = X;
  let currIndex = cycle % 40;

  for (const input of instructions) {
    const [instruction, amount] = input.split(" ");

    if (instruction === "noop") {
      row += spriteAtCurrent(spriteMid, currIndex) ? "#" : ".";

      cycle++;
      currIndex = cycle % 40;

      if (cycle % 40 === 0) {
        screen.push(row);
        row = "";
      }

      continue;
    }

    // begin instruction
    row += spriteAtCurrent(spriteMid, currIndex) ? "#" : ".";

    cycle++;
    currIndex = cycle % 40;

    if (cycle % 40 === 0) {
      screen.push(row);
      row = "";
    }

    // execute instruction
    row += spriteAtCurrent(spriteMid, currIndex) ? "#" : ".";

    cycle++;
    currIndex = cycle % 40;

    if (cycle % 40 === 0) {
      screen.push(row);

      row = "";
    }

    // increment
    X = X + parseInt(amount);
    spriteMid = X;
  }

  return screen;
};

const screen = draw();
console.log(screen);
