package main

import (
	"testing"
)

func TestJokerCombinations(t *testing.T) {
	tests := []struct {
		name     string
		hand     string
		expected HandType
	}{
		// Test cases for original ranking system
		{name: "High Card", hand: "23456", expected: HighCard},
		{name: "One Pair", hand: "A23A4", expected: OnePair},
		{name: "Two Pair", hand: "23432", expected: TwoPair},
		{name: "Three of a Kind", hand: "TTT98", expected: ThreeOfAKind},
		{name: "Full House", hand: "23332", expected: FullHouse},
		{name: "Four of a Kind", hand: "AA8AA", expected: FourOfAKind},
		{name: "Five of a Kind", hand: "AAAAA", expected: FiveOfAKind},

		// Test cases for ranking system with jokers
		{name: "Joker as High Card", hand: "J2345", expected: OnePair},
		{name: "Joker in One Pair", hand: "AJA34", expected: ThreeOfAKind},
		{name: "Joker in Three of a Kind", hand: "AATJJ", expected: FourOfAKind},
		{name: "Joker in One Pair", hand: "AAJJK", expected: FourOfAKind},
		{name: "Joker in Four of a Kind", hand: "AAAAJ", expected: FiveOfAKind},
		{name: "All Jokers", hand: "JJJJJ", expected: FiveOfAKind},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h, jCount := getHandType(tt.hand)
			handType := getHandTypeWithJs(h, jCount)

			if handType != tt.expected {
				t.Errorf("TestJokerCombinations %s failed: expected %v, got %v", tt.name, tt.expected, handType)
			}
		})
	}
}
