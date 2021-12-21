// 7 days until reproduction
// after that 2 days until cycle for new fish begins
// --> 6-0 on reset birth of a fish with a initial timer of 8
// how many lantern fish are there after 80 days ?
import lineByLine from "n-readlines";

const liner = new lineByLine("./input6.txt");

const input = liner
  .next()
  .toString("utf-8")
  .split(",")
  .map((str) => parseInt(str));

// const input = [3, 4, 3, 1, 2];

const reproduction = (days, input) => {
  let fish = [...input];
  let temp = [...input];

  // simulate days days of reproduction
  for (let i = 0; i < days; i++) {
    // loop through fish by using the input arr
    // change temp to don't mess with the arrays length while looping
    // set input to the temp after every iteration to loop through newly created arr

    for (let j = 0; j < fish.length; j++) {
      // case 0
      if (fish[j] === 0) {
        temp[j] = 6;
        temp.push(8);
      } else {
        temp[j]--;
      }

      // set fish to
    }
    fish = [...temp];
  }
  console.log(temp.length);
};

reproduction(80, input);
