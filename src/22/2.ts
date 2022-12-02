import { getInput } from "../../get-input";

// A -> Rock -> X
// B -> Paper -> Y
// C -> Scissors -> Z

// Scores:
// Rock -> 1
// Paper -> 2
// Scissors -> 3
// Lose -> 0
// Draw -> 3
// Win -> 6

const rock = {
  opponent: "A",
  self: "X",
  points: 1,
  win: "C",
  loose: "B",
};

const paper = {
  opponent: "B",
  self: "Y",
  points: 2,
  win: "A",
  loose: "C",
};

const scissors = {
  opponent: "C",
  self: "Z",
  points: 3,
  win: "B",
  loose: "A",
};

const possiblePlays = [rock, paper, scissors];

const input = getInput("./src/22/inputs/input-2.txt")
  ?.split("\n")
  .map((str) => str.split(" "))
  .filter((arr) => arr[0] !== "");

const getTotalScore = () => {
  if (!input) return;

  let totalScore = 0;

  for (const plays of input) {
    const self = possiblePlays.find((play) => play.self === plays[1]);
    const opponent = possiblePlays.find((play) => play.opponent === plays[0]);

    if (!self || !opponent) return;

    // WIN
    if (self?.win === opponent?.opponent) {
      totalScore += self?.points + 6;
    }

    // DRAW
    if (self.opponent === opponent.opponent) {
      totalScore += self.points + 3;
    }

    // LOOSE
    if (self.loose === opponent.opponent) {
      totalScore += self.points;
    }
  }

  return totalScore;
};

console.log(getTotalScore());
