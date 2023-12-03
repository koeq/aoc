package main

import (
	"aoc/utils"
	"fmt"
	"os"
	"strconv"
)

func isSign(char rune) bool {
	unicode := int(char)

	// fullstop (46) does not count as a sign in this context
	return unicode >= 33 && unicode <= 47 && unicode != 46 || unicode >= 58 && unicode <= 64
}

func isDigit(char rune) bool {
	unicode := int(char)

	return unicode >= 48 && unicode <= 57
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	lines, err := utils.GetLines(file)
	if err != nil {
		panic(err)
	}

	sum := 0
	numBuff := ""
	shouldBeSummed := false

	for row, line := range lines {
		for col, char := range line {
			if isDigit(char) {
				numBuff += string(char)

				if shouldBeSummed {
					continue
				}

				// check adjacent for signs
				// TOP ROW
				if row-1 >= 0 {

					if col-1 >= 0 {
						if isSign(lines[row-1][col-1]) {
							shouldBeSummed = true
						}
					}

					if isSign(lines[row-1][col]) {
						shouldBeSummed = true
					}

					if col+1 < len(line) {
						if isSign(lines[row-1][col+1]) {
							shouldBeSummed = true
						}
					}

				}

				// ROW
				if col-1 >= 0 {
					if isSign(lines[row][col-1]) {
						shouldBeSummed = true
					}
				}

				if col+1 < len(line) {
					if isSign(lines[row][col+1]) {
						shouldBeSummed = true
					}
				}

				// BOTTOM ROW
				if row+1 < len(lines) {

					if col-1 >= 0 {
						if isSign(lines[row+1][col-1]) {
							shouldBeSummed = true
						}
					}

					if isSign(lines[row+1][col]) {
						shouldBeSummed = true
					}

					if col+1 < len(line) {
						if isSign(lines[row+1][col+1]) {
							shouldBeSummed = true
						}
					}

				}
			} else {
				// reset
				if numBuff == "" {
					continue
				}

				if shouldBeSummed {
					num, err := strconv.Atoi(numBuff)

					if err != nil {
						panic(err)
					}

					fmt.Println(num)
					sum += num
				}

				numBuff = ""
				shouldBeSummed = false
			}
		}

		// flush buffer
		if numBuff == "" {
			continue
		}

		if shouldBeSummed {
			num, err := strconv.Atoi(numBuff)

			if err != nil {
				panic(err)
			}

			fmt.Println(num)
			sum += num
		}

		numBuff = ""
		shouldBeSummed = false

	}

	fmt.Println(sum)
}
