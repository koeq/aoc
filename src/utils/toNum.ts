//  convert string array to an array of numbers
export const toNum = (input: string[]): number[] => {
  const mapped = input.map((element) => parseInt(element));

  return mapped;
};
