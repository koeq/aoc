import { getInput, liner } from "../file-reader.js";
const input = getInput(liner);
const getIncreases = (input) => {
    let increases = 0;
    for (let i = 0; i < input.length; i++) {
        parseInt(input[i]) < parseInt(input[i + 1]) ? increases++ : null;
    }
    return increases;
};
console.log(getIncreases(input));
//# sourceMappingURL=1.js.map