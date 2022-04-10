import lineByLine from "n-readlines";
import { log } from "./4-2.js";

// export const liner = new lineByLine("./sampleInput5.txt");
export const liner = new lineByLine("./input5.txt");

const getVents = (liner) => {
  const vents = [];
  let line;

  while ((line = liner.next())) {
    let row = [];
    let ends = line.toString("utf-8").split("->");

    for (let end of ends) {
      row.push(end.trimStart().trimEnd().split(","));
    }
    vents.push(row);
  }

  return vents;
};

export const vents = getVents(liner);

// vents structure:
// [
//   [[x1,y1], [x2,y2]],  <- vent
//   [[...],[...]],
//   ...
// ]

const createDiagram = (vents) => {
  let maxX = 0;
  let maxY = 0;
  let diagram = [];

  for (let vent of vents) {
    for (let ending of vent) {
      if (ending[0] > maxX) {
        maxX = parseInt(ending[0]);
      } else if (ending[1] > maxY) {
        maxY = parseInt(ending[1]);
      }
    }
  }

  for (let y = 0; y <= maxY; y++) {
    let row = [];
    for (let x = 0; x <= maxX; x++) {
      row.push(0);
    }
    diagram.push(row);
  }

  return diagram;
};

export const diagram = createDiagram(vents);

const numRange = (start, end) => {
  return new Array(end - start + 1).fill().map((d, i) => i + start);
};

const createRanges = (vents) => {
  let ranges = [];

  for (let i = 0; i < vents.length; i++) {
    // case x values are equal

    let x1 = parseInt(vents[i][0][0]);
    let x2 = parseInt(vents[i][1][0]);
    let y1 = parseInt(vents[i][0][1]);
    let y2 = parseInt(vents[i][1][1]);

    if (x1 === x2) {
      ranges.push({
        stable: "x",
        x: x1,
        y: numRange(Math.min(y1, y2), Math.max(y1, y2)),
      });
    }
    // case y values are equal
    if (y1 === y2) {
      ranges.push({
        stable: "y",
        x: numRange(Math.min(x1, x2), Math.max(x1, x2)),
        y: y1,
      });
    }
  }
  return ranges;
};

// const ranges = createRanges(vents);

const countUpDiagram = (diagram, ranges) => {
  for (let range of ranges) {
    // case x is stable
    if (range.stable === "x") {
      for (let y of range.y) {
        diagram[y][range.x]++;
      }
    }
    // case y is stable
    else {
      for (let x of range.x) {
        diagram[range.y][x]++;
      }
    }
  }
  return diagram;
};

//  const counted = countUpDiagram(diagram, ranges);

export const count = () => {
  let counter = 0;
  for (let row of counted) {
    for (let num of row) {
      if (num >= 2) {
        counter++;
      }
    }
  }
  log(counter);
};

// count();
