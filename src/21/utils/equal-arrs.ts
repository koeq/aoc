export function equalArrs<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((entry, index) => {
    if (entry !== arr2[index]) {
      return false;
    }
    return true;
  });
}
