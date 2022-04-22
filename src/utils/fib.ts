// NO CACHE
// const getFib = (n: number): number => {
//   if (n === 0) {
//     return 0;
//   }
//   if (n <= 1) {
//     return 1;
//   }

//   return getFib(n - 1) + getFib(n - 2);
// };
// console.time("execution time");
// console.log(getFib(45));
// console.timeEnd("execution time");

// ARRAY CACHE
// const cache: number[] = [];

// const getFib = (n: number): number => {
//   if (n === 0) {
//     return 0;
//   }
//   if (n <= 1) {
//     return 1;
//   }

//   // result in cache
//   if (cache[n]) {
//     return cache[n];
//   }

//   //  no result in cache
//   let result = getFib(n - 1) + getFib(n - 2);

//   // save result in cache
//   cache[n] = result;

//   return result;
// };
// console.time("execution time");
// console.log(getFib(1000));
// console.timeEnd("execution time");

//  OBJECT CACHE
interface CustomCache {
  [key: string]: number;
}

const cache: CustomCache = {};

const getFib = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  if (n <= 1) {
    return 1;
  }

  // result in cache
  if (cache[`${n}`]) {
    return cache[`${n}`];
  }

  //  no result in cache
  let result = getFib(n - 1) + getFib(n - 2);

  // save result in cache
  cache[`${n}`] = result;

  return result;
};
console.time("execution time");
console.log(getFib(1000));
console.timeEnd("execution time");
