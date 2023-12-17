package main

import (
	"aoc/sort"
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Hand struct {
	cards    string
	bid      int
	handType HandType
}

type HandType string

const (
	HighCard     HandType = "high-card"
	OnePair      HandType = "one-pair"
	TwoPair      HandType = "two-pair"
	ThreeOfAKind HandType = "three-of-a-kind"
	FullHouse    HandType = "full-house"
	FourOfAKind  HandType = "four-of-a-kind"
	FiveOfAKind  HandType = "five-of-a-kind"
)

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
	// updated for 7.2
	"J": 1,
	"Q": 12,
	"K": 13,
	"A": 14,
}

var handTypes = map[HandType]int{
	"high-card":       1,
	"one-pair":        2,
	"two-pair":        3,
	"three-of-a-kind": 4,
	"full-house":      5,
	"four-of-a-kind":  6,
	"five-of-a-kind":  7,
}

func getHandType(cards string) (handtype HandType, jCount int) {
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

	jCount = cardCount["J"]

	var hasThree, hasPair bool
	pairCount := 0

	for cardType, count := range cardCount {
		// Skip jokers
		if cardType == "J" {
			continue
		}

		if count == 5 {
			return FiveOfAKind, jCount
		}

		if count == 4 {
			return FourOfAKind, jCount
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
			return ThreeOfAKind, jCount
		}

		return FullHouse, jCount
	}

	if pairCount == 2 {
		return TwoPair, jCount
	}

	if hasPair {
		return OnePair, jCount
	}

	return HighCard, jCount
}

// only possible without Jokers
// high-card       -> 0J
// two-pair        -> 0J

// possible with one/multiple jokers
// one-pair 			 -> high-card + 1J
// three-of-a-kind -> one-pair + 1J, high-card + 2J
// full-house      ->  two-pair + 1J
// four-of-a-kind  -> three-of-a-kind + 1J, one-pair + 2J, high-card + 3J
// five-of-a-kind  -> four-of-a-kind + 1J, three-of-a-kind + 2J, one-pair + 3J, high-card + 4J
func getHandTypeWithJs(h HandType, jCount int) (handType HandType) {
	// apply joker transformations
	switch h {
	case HighCard:
		switch jCount {
		case 1:
			return OnePair
		case 2:
			return ThreeOfAKind
		case 3:
			return FourOfAKind
		case 4:
			return FiveOfAKind
		case 5:
			return FiveOfAKind
		}

	case OnePair:
		switch jCount {
		case 1:
			return ThreeOfAKind
		case 2:
			return FourOfAKind
		case 3:
			return FiveOfAKind
		}

	case TwoPair:
		switch jCount {
		case 1:
			return FullHouse
		}

	case ThreeOfAKind:
		switch jCount {
		case 1:
			return FourOfAKind
		case 2:
			return FiveOfAKind
		}

	case FourOfAKind:
		switch jCount {
		case 1:
			return FiveOfAKind
		}
	}

	return h
}

func parseHandsInput(file *os.File) []Hand {
	var hands []Hand
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		splittedLine := strings.Fields(line)
		cards := splittedLine[0]
		h, jCount := getHandType(cards)
		handType := getHandTypeWithJs(h, jCount)

		bid, err := strconv.Atoi(splittedLine[1])
		if err != nil {
			panic(err)
		}

		hands = append(hands, Hand{cards, bid, handType})
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	return hands
}

// returns:
//
// 1 if x > y
//
// 0 if x == y
//
// -1 if x < y
func compareHands(x, y Hand) int {
	xHandScore := handTypes[x.handType]
	yHandScore := handTypes[y.handType]

	if xHandScore > yHandScore {
		return 1
	}

	if xHandScore < yHandScore {
		return -1
	}

	for i, _ := range x.cards {
		xCard := string(x.cards[i])
		yCard := string(y.cards[i])

		xCardScore := cardTypes[xCard]
		yCardScore := cardTypes[yCard]

		if xCardScore > yCardScore {
			return 1
		}

		if xCardScore < yCardScore {
			return -1
		}
	}

	return 0
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	defer file.Close()

	hands := parseHandsInput(file)
	sort.Quicksort(hands, 0, len(hands)-1, compareHands)

	counter := 0

	for i, hand := range hands {
		rank := i + 1
		counter += hand.bid * rank
	}

	fmt.Println(counter)
}
