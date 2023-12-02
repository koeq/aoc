package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"unicode"
)

var numbers = map[string]string{
	"zero":  "0",
	"one":   "1",
	"two":   "2",
	"three": "3",
	"four":  "4",
	"five":  "5",
	"six":   "6",
	"seven": "7",
	"eight": "8",
	"nine":  "9",
}

type Match struct {
	Word  string
	Index int
}

func findNumberWords(input string) []string {
	numberWords := []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	var matches []Match

	for _, word := range numberWords {
		start := 0
		for {
			index := strings.Index(input[start:], word)
			if index == -1 {
				break
			}
			matches = append(matches, Match{Word: word, Index: start + index})
			start += index + 1 // Move past the last found index
		}
	}

	// Sort matches based on their indices
	sort.Slice(matches, func(i, j int) bool {
		return matches[i].Index < matches[j].Index
	})

	// Extract just the words from the sorted matches
	var orderedMatches []string
	for _, match := range matches {
		orderedMatches = append(orderedMatches, match.Word)
	}

	return orderedMatches
}

func getNumString(line string) string {
	splittedLine := make([]string, 10)
	numStr := ""
	charBuff := ""

	for _, char := range line {
		// case NUMBER
		if unicode.IsDigit(char) {
			if charBuff != "" {
				// add prev charBuff
				splittedLine = append(splittedLine, charBuff)
			}

			// reset buffer
			charBuff = ""

			splittedLine = append(splittedLine, string(char))
			continue
		}

		// case CHAR
		charBuff += string(char)

	}

	if charBuff != "" {
		splittedLine = append(splittedLine, charBuff)
	}

	for _, str := range splittedLine {
		_, err := strconv.Atoi(str)

		if err == nil {
			numStr += str
		}

		numberWords := findNumberWords(str)
		for _, number := range numberWords {
			numStr += numbers[number]
		}
	}

	return numStr
}

func firstAndLast(s string) string {
	if len(s) == 1 {
		return s + s
	}

	if len(s) > 2 {
		return string(s[0]) + string(s[len(s)-1])
	}

	return s
}

func main() {
	var sum int

	file, err := os.Open("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	getLine := utils.CreateGetLine(file)

	for {
		line, err := getLine()

		if err == io.EOF {
			break
		}

		if err != nil {
			log.Fatal(err)
		}

		numStr := getNumString(line)
		twoDigitStr := firstAndLast((numStr))
		num, err := strconv.Atoi(twoDigitStr)

		if err != nil {
			log.Fatal(err)
		}

		sum += num
	}

	fmt.Println(sum)
}
