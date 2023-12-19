package main

import (
	"aoc/utils"
	"fmt"
	"os"
	"strconv"
	"strings"
)

const FILE_PATH = "input.txt"

func parseSequences(file *os.File) [][]int {
	var sequences [][]int

	lines, err := utils.GetLines(file)
	if err != nil {
		panic(err)
	}

	for _, line := range lines {
		var sequence []int

		for _, seq := range strings.Fields(string(line)) {
			num, err := strconv.Atoi(seq)
			if err != nil {
				panic(err)
			}

			sequence = append(sequence, num)
		}
		sequences = append(sequences, sequence)
	}

	return sequences
}

func getNextSequence(sequence []int) (next []int, allZeros bool) {
	allZeros = true

	for i := 0; i < len(sequence)-1; i++ {
		nextNum := sequence[i+1] - sequence[i]

		next = append(next, nextNum)

		if nextNum != 0 {
			allZeros = false
		}
	}

	return next, allZeros
}
func getExtrapolated(sequence []int) int {
	var allZeros bool
	var sequenceSeries [][]int

	sequenceSeries = append(sequenceSeries, sequence)

	nextSequence := sequence

	// create sequence series
	for {
		nextSequence, allZeros = getNextSequence(nextSequence)
		sequenceSeries = append(sequenceSeries, nextSequence)

		if allZeros {
			break
		}
	}

	// add addtitional zero
	lastSeries := &sequenceSeries[len(sequenceSeries)-1]
	*lastSeries = append(*lastSeries, 0)

	// extrapolate next value in next sequence
	for i := len(sequenceSeries) - 1; i >= 1; i-- {
		currSeries := sequenceSeries[i]
		nextSeries := &sequenceSeries[i-1]

		currLastNum := currSeries[len(currSeries)-1]
		nextLastNum := (*nextSeries)[len(*nextSeries)-1]

		*nextSeries = append(*nextSeries, currLastNum+nextLastNum)
	}

	return sequenceSeries[0][len(sequenceSeries[0])-1]
}

func main() {
	file, err := os.Open(FILE_PATH)
	if err != nil {
		panic(err)
	}

	sequences := parseSequences(file)

	var extrapolatedNums []int

	for _, sequence := range sequences {
		extrapolatedNums = append(extrapolatedNums, getExtrapolated(sequence))
	}

	sum := 0

	for _, e := range extrapolatedNums {
		sum += e
	}

	fmt.Println(sum)
}
