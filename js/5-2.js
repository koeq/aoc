import { log } from "./4-2.js";
import { vents, diagram } from "./5-1.js";

// inclusive range function
const numRange = (start, end) => {
  if (end >= start) {
    return new Array(end - start + 1).fill().map((d, i) => i + start);
  } else {
    return new Array(start - end + 1).fill().map((d, i) => start - i);
  }
};

const createDiagonalRanges = (vents) => {
  const ranges = [];

  for (let vent of vents) {
    let x1 = parseInt(vent[0][0]);
    let x2 = parseInt(vent[1][0]);
    let y1 = parseInt(vent[0][1]);
    let y2 = parseInt(vent[1][1]);

    let xRange = numRange(x1, x2);
    let yRange = numRange(y1, y2);

    ranges.push({ x: xRange, y: yRange });
  }
  return ranges;
};

const ranges = createDiagonalRanges(vents);

const countUpDiagramDiagonal = (diagram, ranges) => {
  for (let range of ranges) {
    // case x is stable
    if (range.x.length === 1) {
      for (let y of range.y) {
        diagram[y][range.x[0]]++;
      }
    }
    // case y is stable
    else if (range.y.length === 1) {
      for (let x of range.x) {
        diagram[range.y[0]][x]++;
      }
    } else {
      for (let i = 0; i < range.x.length; i++) {
        diagram[range.y[i]][range.x[i]]++;
      }
    }
  }
  return diagram;
};

const countedDiagonal = countUpDiagramDiagonal(diagram, ranges);

const countDiagonal = () => {
  let counter = 0;
  for (let row of countedDiagonal) {
    for (let num of row) {
      if (num >= 2) {
        counter++;
      }
    }
  }
  log(counter);
};

countDiagonal();
