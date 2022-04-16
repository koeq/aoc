import { getInput } from "./utils/file-reader";

let input: string[] = getInput(3);

// 3.1
const getGammaRate = (input: string[]): string => {
  let gammaRate = "";
  let counters = [];

  for (const entry of input[0]) {
    counters.push(0);
  }

  console.log(counters);

  for (const binary of input) {
    for (let i = 0; i < binary.length; i++) {
      binary[i] === "0" ? counters[i]-- : counters[i]++;
    }
  }

  for (const counter of counters) {
    gammaRate += counter > 0 ? "1" : "0";
  }

  return gammaRate;
};

const gammaRate = getGammaRate(input);

const getEps = (gammaRate: string): string => {
  let eps = gammaRate.replace(/[0-1]/g, (v) => (v == "1" ? "0" : "1"));

  return eps;
};

const epsilonRate = getEps(gammaRate);
console.log(`Gamma Rate:   ${gammaRate}`);
console.log(`Epsilon Rate: ${epsilonRate}`);
console.log(parseInt(epsilonRate, 2) * parseInt(gammaRate, 2));
