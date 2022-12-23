import { getInput } from "./get-input";

interface Points {
  sX: number;
  sY: number;
  bX: number;
  bY: number;
  distance: number;
}

// const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

// const input = testInput.split("\n")!;

const input = getInput("./src/22/inputs/input-15.txt")!.split("\n");
input.pop();

const parse = (input: string[]) => {
  const sensorsNBeacons: Points[] = [];

  for (const line of input) {
    const regex = /-?[0-9]+/g;
    const result = line.match(regex);

    if (result) {
      sensorsNBeacons.push({
        sX: parseInt(result[0]),
        sY: parseInt(result[1]),
        bX: parseInt(result[2]),
        bY: parseInt(result[3]),
        // Manhattan distance = |x1 - x2| + |y1 - y2|
        distance:
          Math.abs(parseInt(result[0]) - parseInt(result[2])) +
          Math.abs(parseInt(result[1]) - parseInt(result[3])),
      });
    }
  }

  return sensorsNBeacons;
};

const sensorsNBeacons = parse(input);

const beaconsOrSensorsInRowCount = (row: number, sensorsNBeacons: Points[]) => {
  const unique = new Set<string>();

  sensorsNBeacons
    .filter(({ bY, sY }) => bY === row || sY === row)
    .forEach(({ sX, sY, bX, bY }) => {
      if (sY === row) {
        unique.add(`${sX}, ${sY}`);
      }

      if (bY === row) {
        unique.add(`${bX}, ${bY}`);
      }
    });

  return unique.size;
};

const countNoBeaconsInRow = (row: number, sensorsNBeacons: Points[]) => {
  const noBeaconPoints = new Set<string>();

  const addNoBeaconPoints = (distance: number, sX: number, sY: number) => {
    for (let i = 0; i <= distance; i++) {
      noBeaconPoints.add(`${sX + i},${sY}`);
      noBeaconPoints.add(`${sX - i},${sY}`);
    }
  };

  for (const { sX, sY, distance } of sensorsNBeacons) {
    if (sY === row) {
      console.log("we're in row");
      addNoBeaconPoints(distance, sX, row);
    }

    if (sY < row) {
      if (sY + distance >= row) {
        const restDistance = distance - (row - sY);
        addNoBeaconPoints(restDistance, sX, row);
      }
    }

    if (sY > row) {
      if (sY - distance <= row) {
        const restDistance = distance - (sY - row);
        addNoBeaconPoints(restDistance, sX, row);
      }
    }
  }

  return noBeaconPoints.size;
};

// 1
// console.log(
//   countNoBeaconsInRow(2000000, sensorsNBeacons) -
//     beaconsOrSensorsInRowCount(2000000, sensorsNBeacons)
// );

// 2

const sensorReachesX = (x: number, sX: number, distance: number): boolean => {
  if (x === sX) {
    return true;
  }

  if (x < sX) {
    return sX - distance <= x;
  }

  // x is bigger
  return sX + distance >= x;
};

const getBeacon = (limit: number, sensorsNBeacons: Points[]) => {
  for (let y = 0; y <= limit; y++) {
    let x = 0;

    for (let i = 0; i < sensorsNBeacons.length; i++) {
      const { sX, sY, distance } = sensorsNBeacons[i];

      if (sY === y) {
        if (sensorReachesX(x, sX, distance)) {
          x = sX + distance + 1;
          // reset loop
          i = 0;
        }
      }

      if (sY < y) {
        if (sY + distance >= y) {
          const restDistance = distance - (y - sY);

          if (sensorReachesX(x, sX, restDistance)) {
            x = sX + restDistance + 1;
            i = 0;
          }
        }
      }

      if (sY > y) {
        if (sY - distance <= y) {
          const restDistance = distance - (sY - y);

          if (sensorReachesX(x, sX, restDistance)) {
            x = sX + restDistance + 1;
            i = 0;
          }
        }
      }
    }

    if (x <= limit) {
      return [y, x];
    }
  }

  return [0, 0];
};

const [y, x] = getBeacon(4000000, sensorsNBeacons)!;
console.log(y, x);

console.log(x * 4000000 + y);
