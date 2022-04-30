export const equalChars = (str1: string, str2: string): boolean => {
  return (
    str1.split("").every((str) => str2.includes(str)) &&
    str2.split("").every((str) => str1.includes(str))
  );
};
