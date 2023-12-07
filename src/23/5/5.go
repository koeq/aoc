package main

import (
	"aoc/utils"
	"fmt"
	"strconv"
	"strings"
)

func numStrToNumArr(numStr string) []int {
	var nums []int

	for _, n := range strings.Fields(numStr) {
		num, err := strconv.Atoi(string(n))
		if err != nil {
			panic(err)
		}

		nums = append(nums, num)
	}

	return nums
}

func main() {
	splittedLines := utils.GetSplittedLines("input_test.txt", "\n\n")
	seedsNumStr := strings.Split(splittedLines[0], ":")[1]
	seeds := numStrToNumArr(seedsNumStr)

	seedToSoilStr := strings.Split(splittedLines[1], "\n")
	for _, u := range seedToSoilStr {
		fmt.Println(string(u))
	}
	fmt.Println(seedToSoilStr)
	fmt.Println("------------------------")
	fmt.Println(seeds)
	fmt.Println(splittedLines[1])

	// for _, line := range splittedLines {
	// }
}
