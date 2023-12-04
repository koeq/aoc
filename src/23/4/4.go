package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

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
