package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"unicode"
)

func firstAndLast(s string) string {
	if len(s) == 1 {
		return s + s
	}

	if len(s) > 2 {
		return string(s[0]) + string(s[len(s)-1])
	}

	return s
}

func getNumString(line string) string {
	numStr := ""

	for _, char := range line {
		if unicode.IsDigit(char) {
			numStr += string(char)
		}
	}

	return numStr
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
