package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type hand struct {
	cards    string
	bid      int
	handType string
}

var cardTypes = map[string]int{
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"T": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
	"A": 14,
}

var handTypes = map[string]int{
	"high-card":       1,
	"one-pair":        2,
	"two-pair":        3,
	"three-of-a-kind": 4,
	"full-house":      5,
	"four-of-a-kind":  6,
	"five-of-a-kind":  7,
}

func getHandType(cards string) (handtype string) {
	cardCount := map[string]int{
		"2": 0,
		"3": 0,
		"4": 0,
		"5": 0,
		"6": 0,
		"7": 0,
		"8": 0,
		"9": 0,
		"T": 0,
		"J": 0,
		"Q": 0,
		"K": 0,
		"A": 0,
	}

	for _, card := range cards {
		cardCount[string(card)]++
	}

	var hasThree, hasPair bool
	pairCount := 0

	for _, count := range cardCount {
		if count == 5 {
			return "five-of-a-kind"
		}

		if count == 4 {
			return "four-of-a-kind"
		}

		if count == 3 {
			hasThree = true
		}

		if count == 2 {
			pairCount++
			hasPair = true
		}
	}

	if hasThree {
		if !hasPair {
			return "three-of-a-kind"
		}

		return "full-house"
	}

	if pairCount == 2 {
		return "two-pair"
	}

	if hasPair {
		return "one-pair"
	}

	return "high-card"
}

func parseHandsInput(file *os.File) []hand {
	var hands []hand
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		splittedLine := strings.Fields(line)
		cards := splittedLine[0]
		handType := getHandType(cards)

		bid, err := strconv.Atoi(splittedLine[1])
		if err != nil {
			panic(err)
		}

		hands = append(hands, hand{cards, bid, handType})
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	return hands
}

func main() {
	file, err := os.Open("input_test.txt")
	if err != nil {
		panic(err)
	}

	defer file.Close()

	hands := parseHandsInput(file)
	fmt.Println(hands)
}
