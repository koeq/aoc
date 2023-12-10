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

func numStrToNumArrOf3(numStr string) [3]int {
	var nums [3]int

	for i, n := range strings.Fields(numStr) {
		if i > 3 {
			break
		}

		num, err := strconv.Atoi(string(n))
		if err != nil {
			panic(err)
		}

		nums[i] = num
	}

	return nums
}

func getMaps(mapStrings []string) [][3]int {
	var mapArr [][3]int
	for i, seedToSoil := range mapStrings {
		if i == 0 {
			continue
		}

		ranges := numStrToNumArrOf3(seedToSoil)
		mapArr = append(mapArr, ranges)
	}

	return mapArr
}

func main() {
	splittedLines := utils.GetSplittedLines("input_test.txt", "\n\n")
	seedsNumStr := strings.Split(splittedLines[0], ":")[1]
	seeds := numStrToNumArr(seedsNumStr)

	// data structure -> array of 7 maps, containing a slice of unknown length which holds all the mappings which are arrays of 3 containing the two ranges and the offset
	var maps [7][][3]int

	seedToSoilStrings := strings.Split(splittedLines[1], "\n")
	soilToFertilizerStrings := strings.Split(splittedLines[2], "\n")
	fertilizerToWaterStrings := strings.Split(splittedLines[3], "\n")
	waterToLightStrings := strings.Split(splittedLines[4], "\n")
	lightToTemperatureStrings := strings.Split(splittedLines[5], "\n")
	temperatureToHumidityStrings := strings.Split(splittedLines[6], "\n")
	humidityToLocationStrings := strings.Split(splittedLines[7], "\n")

	maps[0] = (getMaps(seedToSoilStrings))
	maps[1] = getMaps(soilToFertilizerStrings)
	maps[2] = getMaps(fertilizerToWaterStrings)
	maps[3] = getMaps(waterToLightStrings)
	maps[4] = getMaps(lightToTemperatureStrings)
	maps[5] = getMaps(temperatureToHumidityStrings)
	maps[6] = getMaps(humidityToLocationStrings)

	fmt.Println(seeds)

	for _, m := range maps {
		fmt.Println(m)
	}

}
