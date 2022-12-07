import { getInput } from "../../get-input";

const instructions = getInput("./src/22/inputs/input-7.txt")
  ?.split("\n")
  .filter((str) => str);

interface File {
  name: string;
  size: number;
}

interface DirNode {
  name: string;
  files: File[];
  dirs: DirNode[];
  prev?: DirNode;
  size?: number;
}

const buildTree = (): DirNode | undefined => {
  if (!instructions) {
    return;
  }

  let curr: DirNode | undefined;
  const root: DirNode = { name: "/", dirs: [], files: [] };

  for (const instruction of instructions) {
    if (instruction[0] === "$") {
      const [$, command, location] = instruction.split(" ");

      if (command === "cd") {
        // go up
        if (location === "..") {
          curr = curr?.prev;
          continue;
        }

        if (location === "/") {
          curr = root;
          continue;
        }

        curr = curr?.dirs.find((dir) => dir.name === location);
      }
    } else {
      const [dirOrFilesize, name] = instruction.split(" ");
      if (dirOrFilesize === "dir") {
        curr?.dirs.push({ name, dirs: [], files: [], prev: curr });
      } else {
        curr?.files.push({ name, size: parseInt(dirOrFilesize) });
      }
    }
  }

  return root;
};

const root = buildTree();

const addSizes = (dir: DirNode | undefined) => {
  if (!dir) {
    return;
  }

  for (const directory of dir.dirs) {
    addSizes(directory);
  }

  const dirSize =
    dir.files.reduce((sizes, file) => sizes + file.size, 0) +
    dir.dirs.reduce(
      (sizes, directory) => (directory.size ? sizes + directory.size : sizes),
      0
    );

  dir.size = dirSize;
};

addSizes(root);

const max100000SizeDirs: DirNode[] = [];

const collectMax100000SizeDirs = (dir: DirNode | undefined) => {
  if (!dir) {
    return;
  }

  for (const directory of dir.dirs) {
    collectMax100000SizeDirs(directory);
  }

  if (!dir.size || dir.size <= 100000) {
    max100000SizeDirs.push(dir);
    return;
  }
};

collectMax100000SizeDirs(root);

// 1
// console.log(
//   max100000SizeDirs.reduce(
//     (sizes, dir) => (dir.size ? sizes + dir.size : sizes),
//     0
//   )
// );

// 2

const findSmallestTodDeleteDir = (toFree: number) => {
  if (!root || !root.size) {
    return;
  }

  let currentSmallest = root.size;

  const getToDeleteDirSize = (node: DirNode, toFree: number) => {
    if (!node.size || node.size < toFree) {
      return;
    }

    for (const dir of node.dirs) {
      getToDeleteDirSize(dir, toFree);
    }

    if (node.size < currentSmallest) {
      currentSmallest = node.size;
    }
  };

  getToDeleteDirSize(root, toFree);

  console.log(currentSmallest);
  return currentSmallest;
};

if (root && root.size) {
  const currentSpace = root.size;
  const unusedSpace = 70000000 - currentSpace;
  const toFree = 30000000 - unusedSpace;
  findSmallestTodDeleteDir(toFree);
}
