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

func isAsterix(char rune) bool {
	unicode := int(char)

	return unicode == 42
}

func isDigit(char rune) bool {
	unicode := int(char)

	return unicode >= 48 && unicode <= 57
}

func addNumStrToSum(numStr string, sum int) int {
	num, err := strconv.Atoi(numStr)

	if err != nil {
		panic(err)
	}

	return sum + num
}

func one(lines [][]rune) {
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
					sum = addNumStrToSum(numBuff, sum)
				}

				numBuff = ""
				shouldBeSummed = false
			}
		}

		if numBuff == "" {
			continue
		}

		if shouldBeSummed {
			sum = addNumStrToSum(numBuff, sum)
		}

		numBuff = ""
		shouldBeSummed = false

	}

	fmt.Println(sum)
}

func two(lines [][]rune) {
	sum := 0

	for row, line := range lines {
		for col, char := range line {
			if !isAsterix(char) {
				continue
			}

			nums := getAdjacentNums(lines, row, col)

			if len(nums) != 2 {
				continue
			}

			sum += nums[0] * nums[1]
		}
	}

	fmt.Println(sum)
}

func getCompleteNum(lines [][]rune, row, col int) int {
	currRow := lines[row]
	rowLen := len(currRow)
	var numRunes []rune

	for c := col; c >= 0 && isDigit(currRow[c]); c-- {
		numRunes = append([]rune{currRow[c]}, numRunes...)
		currRow[c] = '.'
	}

	for c := col + 1; c < rowLen && isDigit(currRow[c]); c++ {
		numRunes = append(numRunes, currRow[c])
		currRow[c] = '.'
	}

	num, err := strconv.Atoi(string(numRunes))

	if err != nil {
		panic(err)
	}

	return num
}

func getAdjacentNums(lines [][]rune, row, col int) []int {
	rowCount := len(lines)
	colCount := len(lines[0])
	var nums []int

	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			currRow, currCol := row+i, col+j
			// check boundaries
			if currRow >= 0 && currRow < rowCount && currCol >= 0 && currCol < colCount {
				if !isDigit(lines[currRow][currCol]) {
					continue
				}

				// digit
				num := getCompleteNum(lines, currRow, currCol)
				nums = append(nums, num)
			}
		}
	}

	return nums
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

	one(lines)
	two(lines)
}
