import lineByLine from "n-readlines";

// numbers
// 1  2  3  4  5  6  7  8  9
// wire count
// 2  5  5  4  5  6  3  7  6

// unique numbers 1,4,7,8
// how many unique numbers ?

const liner = new lineByLine("./input8.txt");

const parseInput = (liner) => {
  let line;
  let inputArr = [];
  while ((line = liner.next())) {
    // create arr for each row and arr for each word
    inputArr.push(line.toString("utf-8").split("| ")[1].split(" "));
  }
  return inputArr;
};

// input shape:
// [ [row1], [row2], ...]
const input = parseInput(liner);

const getUniqueCount = (input) => {
  let counter = 0;
  for (let row of input) {
    for (let word of row) {
      

      // find unique numbers
      switch(word.length) {
        // number 1
        case 2: 
          counter ++;
          break;
        // number 4
        case 4: 
          counter ++;
          break;
        // number 7
        case 3:
          counter++;
          break;
        // number 8
        case 7:
          counter++;
          break;
      }
    }
  }
  return counter;
}

const uniqueCount = getUniqueCount(input);

console.log(uniqueCount)
