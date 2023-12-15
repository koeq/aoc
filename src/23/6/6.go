package main

import (
	"aoc/utils"
	"fmt"
	"strconv"
	"strings"
)

type Race struct {
	time     int
	distance int
}

func parseRacesOne() []Race {
	racesInput := utils.GetSplittedLines("input.txt", "\n")

	t := strings.Fields(strings.Split(racesInput[0], ":")[1])
	d := strings.Fields(strings.Split(racesInput[1], ":")[1])

	var races []Race

	for i := 0; i < len(t); i++ {
		time, err := strconv.Atoi(t[i])
		if err != nil {
			panic(err)
		}

		distance, err := strconv.Atoi(d[i])
		if err != nil {
			panic(err)
		}

		races = append(races, Race{time, distance})
	}

	return races
}

func parseRacesTwo() []Race {
	racesInput := utils.GetSplittedLines("input.txt", "\n")

	t := strings.Fields(strings.Split(racesInput[0], ":")[1])
	d := strings.Fields(strings.Split(racesInput[1], ":")[1])

	var timeStr string
	var distanceStr string

	for i := 0; i < len(t); i++ {
		timeStr += t[i]
		distanceStr += d[i]

	}

	time, err := strconv.Atoi(timeStr)
	if err != nil {
		panic(err)
	}

	distance, err := strconv.Atoi(distanceStr)
	if err != nil {
		panic(err)
	}

	return []Race{{time, distance}}
}

func main() {
	count := 1
	// races := parseRacesOne()
	races := parseRacesTwo()

	for _, race := range races {
		winningCount := 0
		time, distance := race.time, race.distance

		for chargingTime := 1; chargingTime < time; chargingTime++ {
			// speed equals charging time in mm/ms
			speed := chargingTime

			currDistance := speed * (time - chargingTime)

			if currDistance > distance {
				winningCount++
			}
		}

		count *= winningCount
	}

	fmt.Println(count)
}
