import fs from "fs";

export const getInput = (path: string) => {
  let input;

  try {
    input = fs.readFileSync(path, "utf-8");
  } catch (err) {
    console.log(err);
  }

  return input;
};
