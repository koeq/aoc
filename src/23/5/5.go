package main

import (
	"aoc/utils"
	"fmt"
	"math"
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

func getMap(mapStrings []string) [][3]int {
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

func mapToLocation(mapsArr [7][][3]int, seed int) int {
	curr := seed

	for _, maps := range mapsArr {
		for _, m := range maps {
			sourceStart := m[1]
			destinationStart := m[0]
			rangeLength := m[2]

			sourceEnd := sourceStart + rangeLength - 1

			// curr outside mapping range
			if curr < sourceStart || curr > sourceEnd {
				continue
			}

			for i := 0; sourceStart+i <= sourceEnd; i++ {
				if curr == sourceStart+i {
					curr = destinationStart + i
					// break if correct mapping was found
					break
				}
			}
			// go to next map
			break
		}
	}

	return curr
}

func main() {
	splittedLines := utils.GetSplittedLines("input.txt", "\n\n")
	seedsNumStr := strings.Split(splittedLines[0], ":")[1]
	seeds := numStrToNumArr(seedsNumStr)

	// data structure -> array of 7 mapsArr, containing a slice of unknown length which holds all the mappings which are arrays of 3 containing the two ranges and the offset
	var mapsArr [7][][3]int

	seedToSoilStrings := strings.Split(splittedLines[1], "\n")
	soilToFertilizerStrings := strings.Split(splittedLines[2], "\n")
	fertilizerToWaterStrings := strings.Split(splittedLines[3], "\n")
	waterToLightStrings := strings.Split(splittedLines[4], "\n")
	lightToTemperatureStrings := strings.Split(splittedLines[5], "\n")
	temperatureToHumidityStrings := strings.Split(splittedLines[6], "\n")
	humidityToLocationStrings := strings.Split(splittedLines[7], "\n")

	mapsArr[0] = getMap(seedToSoilStrings)
	mapsArr[1] = getMap(soilToFertilizerStrings)
	mapsArr[2] = getMap(fertilizerToWaterStrings)
	mapsArr[3] = getMap(waterToLightStrings)
	mapsArr[4] = getMap(lightToTemperatureStrings)
	mapsArr[5] = getMap(temperatureToHumidityStrings)
	mapsArr[6] = getMap(humidityToLocationStrings)

	lowestLocation := math.MaxInt

	for _, seed := range seeds {
		location := mapToLocation(mapsArr, seed)

		if location < lowestLocation {
			lowestLocation = location
		}
	}

	fmt.Println(lowestLocation)
}
