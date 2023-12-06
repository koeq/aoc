package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func one(file *os.File) {
	getLine := utils.CreateGetLine(file)
	sum := 0

	for {
		line, err := getLine()

		if err == io.EOF {
			break
		}

		if err != nil {
			panic(err)
		}

		joinedNums := strings.Split(strings.Split(line, ":")[1], "|")
		winningNums := strings.Fields(joinedNums[0])
		nums := strings.Fields(joinedNums[1])

		points := 0

		for _, winning := range winningNums {
			for _, num := range nums {
				if winning == num {
					if points == 0 {
						points = 1
					} else {
						points *= 2
					}

				}
			}
		}

		sum += points
	}

	fmt.Println(sum)
}

type card struct {
	instances   int
	winningNums []int
	nums        []int
}

func createCard(line []rune) *card {
	card := card{instances: 1, winningNums: make([]int, 0, 50), nums: make([]int, 0, 50)}

	joinedNums := strings.Split(strings.Split(string(line), ":")[1], "|")
	winningNums := strings.Fields(joinedNums[0])
	nums := strings.Fields(joinedNums[1])

	for _, winning := range winningNums {
		w, err := strconv.Atoi(winning)
		if err != nil {
			panic(err)
		}

		card.winningNums = append(card.winningNums, w)
	}

	for _, num := range nums {
		n, err := strconv.Atoi(num)
		if err != nil {
			panic(err)
		}

		card.nums = append(card.nums, n)
	}

	return &card
}

func getMatchCount(card card) int {
	counter := 0

	for _, w := range card.winningNums {
		for _, n := range card.nums {
			if w != n {
				continue
			}

			counter++
		}
	}

	return counter
}

func two(file *os.File) {
	lines, err := utils.GetLines(file)
	if err != nil {
		panic(err)
	}

	var cards []card

	for _, line := range lines {
		card := *createCard(line)
		cards = append(cards, card)
	}

	for currIndex, card := range cards {
		matchCount := getMatchCount(card)

		if matchCount == 0 {
			continue
		}

		// Add one instance for each instance of our current card as long as we have match counts and cards left
		for i := 1; i <= matchCount && currIndex+i < len(cards); i++ {
			cards[currIndex+i].instances += 1 * card.instances
		}
	}

	sum := 0
	for _, card := range cards {
		sum += card.instances
	}

	fmt.Println(sum)
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	// one(file)

	two((file))

	file.Close()
}
