package main

import (
	"aoc/utils"
	"fmt"
	"math"
	"strconv"
	"strings"
)

func createSeeds(seedsNumStr string) []int {
	seedsRanges := numStrToNumArr(seedsNumStr)
	var seeds []int

	for i := 0; i < len(seedsRanges)-1; i += 2 {
		start := seedsRanges[i]
		rangeCount := seedsRanges[i+1]

		fmt.Println("still building seeds")
		for s := 0; s < rangeCount; s++ {
			seeds = append(seeds, start+s)
		}
	}

	return seeds
}

func createSeedRanges(seedsNumStr string) [][3]int {
	seedsRanges := numStrToNumArr(seedsNumStr)
	var ranges [][3]int

	for i := 0; i < len(seedsRanges)-1; i += 2 {
		start := seedsRanges[i]
		rangeLength := seedsRanges[i+1]
		end := start + rangeLength - 1

		ranges = append(ranges, [3]int{start, end, rangeLength})
	}

	return ranges
}

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
	fmt.Println("building map")
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

	fmt.Println("mapping to location")
	for _, maps := range mapsArr {
		for _, m := range maps {
			sourceStart := m[1]
			destinationStart := m[0]
			rangeLength := m[2]

			sourceEnd := sourceStart + rangeLength - 1

			// curr inside range
			if curr >= sourceStart && curr <= sourceEnd {
				offset := curr - sourceStart

				curr = destinationStart + offset
				break
			}
		}
	}

	return curr
}

func mapSeedRangeToLocation(mapsArr [7][][3]int, seedRange [3]int) int {
	seedRanges := [][3]int{seedRange}

	for _, maps := range mapsArr {
		var newSeedRanges [][3]int

		for _, seedRange := range seedRanges {
			mapped := false

			for _, mapEntry := range maps {
				destinationStart := mapEntry[0]
				mapStart := mapEntry[1]
				mapEnd := mapStart + mapEntry[2] - 1
				seedStart := seedRange[0]
				seedEnd := seedStart + seedRange[2] - 1

				if seedEnd >= mapStart && seedStart <= mapEnd {
					mapped = true
					overlapStart := max(seedStart, mapStart)
					overlapEnd := min(seedEnd, mapEnd)
					overlapLength := overlapEnd - overlapStart + 1

					newStart := destinationStart + (overlapStart - mapStart)
					newSeedRanges = append(newSeedRanges, [3]int{newStart, newStart + overlapLength - 1, overlapLength})

					// Handle the part before the overlap
					if seedStart < overlapStart {
						handleUnmappedRange(&newSeedRanges, maps, seedStart, overlapStart-1)
					}

					// Handle the part after the overlap
					if seedEnd > overlapEnd {
						handleUnmappedRange(&newSeedRanges, maps, overlapEnd+1, seedEnd)
					}
				}
			}

			// If this range was not mapped, carry it over to the next mapping as is.
			if !mapped {
				newSeedRanges = append(newSeedRanges, seedRange)
			}
		}

		// Prepare the seedRanges for the next iteration.
		seedRanges = newSeedRanges
	}

	lowestLocation := math.MaxInt
	for _, rangeItem := range seedRanges {
		if rangeItem[0] < lowestLocation {
			lowestLocation = rangeItem[0]
		}
	}

	return lowestLocation
}

func handleUnmappedRange(newSeedRanges *[][3]int, maps [][3]int, start, end int) {
	isMapped := false

	for _, m := range maps {
		if isInRange(start, m[1], m[1]+m[2]-1) || isInRange(end, m[1], m[1]+m[2]-1) {
			isMapped = true
			break
		}
	}
	if !isMapped {
		*newSeedRanges = append(*newSeedRanges, [3]int{start, end, end - start + 1})
	}
}

func isInRange(num, start, end int) bool {
	return num >= start && num <= end
}

// max returns the maximum of two integers
func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func main() {
	splittedLines := utils.GetSplittedLines("input.txt", "\n\n")
	seedsNumStr := strings.Split(splittedLines[0], ":")[1]
	seedRanges := createSeedRanges(seedsNumStr)

	fmt.Println("all seed built")

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

	for _, seedRange := range seedRanges {

		location := mapSeedRangeToLocation(mapsArr, seedRange)

		if location < lowestLocation {
			lowestLocation = location
		}
	}

	fmt.Println(lowestLocation)
}
