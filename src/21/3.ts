import { create } from "ts-node";
import { getInput } from "./utils/file-reader";

// TEST-INPUT
// let input = [
//   "00100",
//   "11110",
//   "10110",
//   "10111",
//   "10101",
//   "01111",
//   "00111",
//   "11100",
//   "10000",
//   "11001",
//   "00010",
//   "01010",
// ];

let input: string[] = getInput(3);

const createCounters = (input: string[]): number[] => {
  let counters = [];

  for (const entry of input[0]) {
    counters.push(0);
  }

  for (const binary of input) {
    for (let i = 0; i < binary.length; i++) {
      binary[i] === "0" ? counters[i]-- : counters[i]++;
    }
  }
  return counters;
};

const counters = createCounters(input);

// 3.1
const getGammaRate = (counters: number[]): string => {
  let gammaRate = "";

  for (const counter of counters) {
    gammaRate += counter > 0 ? "1" : "0";
  }

  return gammaRate;
};

// const gammaRate = getGammaRate(input);

const getEps = (gammaRate: string): string => {
  let eps = gammaRate.replace(/[0-1]/g, (v) => (v == "1" ? "0" : "1"));

  return eps;
};

// const epsilonRate = getEps(gammaRate);
// console.log(`Gamma Rate:   ${gammaRate}`);
// console.log(`Epsilon Rate: ${epsilonRate}`);
// console.log(parseInt(epsilonRate, 2) * parseInt(gammaRate, 2));

// 3.2
// TO DO: DEBUG WITH TESTINPUT

const getOxygenGeneratorRating = (input: string[]): string | undefined => {
  let binaries = input.slice();

  for (let i = 0; i < counters.length; i++) {
    let counters = createCounters(binaries);
    const keeper = counters[i] >= 0 ? "1" : "0";
    binaries = binaries.filter((binary) => binary[i] === keeper);

    if (binaries.length === 1) {
      return binaries[0];
    }
  }
};

const oxygenGeneratorRating = parseInt(
  getOxygenGeneratorRating(input) || "",
  2
);

const getCo2ScrubberRating = (input: string[]): string | undefined => {
  let binaries = input.slice();

  for (let i = 0; i < counters.length; i++) {
    let counters = createCounters(binaries);

    const keeper = counters[i] >= 0 ? "0" : "1";
    binaries = binaries.filter((binary) => binary[i] === keeper);

    if (binaries.length === 1) {
      return binaries[0];
    }
  }
};

const co2ScrubberRating = parseInt(getCo2ScrubberRating(input) || "", 2);

console.log(`ox: ${oxygenGeneratorRating} co2: ${co2ScrubberRating}`);
console.log(oxygenGeneratorRating * co2ScrubberRating);
