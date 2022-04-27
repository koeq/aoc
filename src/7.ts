import { getInput } from "./utils/fileReader";

//  TEST INPUT
// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const input = getInput(7)[0]
  .split(",")
  .map((str) => parseInt(str));

const createPositionTracker = (input: number[]) => {
  const maxX = input.reduce((acc, curr) => Math.max(acc, curr));
  const positions = Array(maxX + 1).fill(0);

  for (const x of input) {
    positions[x]++;
  }
  return positions;
};

const positions = createPositionTracker(input);

// 7.1
const getMinimalConstantFuelCost = (positions: number[]) => {
  let minFuel = -1;

  positions.forEach((_, index) => {
    let fuelCost = 0;

    // calculate cost from position (index)
    for (let i = 0; i < positions.length; i++) {
      fuelCost += Math.abs(index - i) * positions[i];
    }

    if (minFuel === -1) {
      minFuel = fuelCost;
    } else if (fuelCost < minFuel) {
      minFuel = fuelCost;
    }
  });

  return minFuel;
};

// console.log(getMinimalConstantFuelCost(positions));

// 7.2
const getMinimalLinearFuelCost = (positions: number[]) => {
  let minFuel = -1;

  positions.forEach((_, index) => {
    let fuelCost = 0;

    // calculate cost from position (index)
    for (let i = 0; i < positions.length; i++) {
      const dist = Math.abs(index - i);
      // n + n-1 + ... + 1 === n*(n+1)/2
      const singleWayCost = (dist * (dist + 1)) / 2;
      fuelCost += singleWayCost * positions[i];
    }

    if (minFuel === -1) {
      minFuel = fuelCost;
    } else if (fuelCost < minFuel) {
      minFuel = fuelCost;
    }
  });

  return minFuel;
};

console.log(getMinimalLinearFuelCost(positions));
