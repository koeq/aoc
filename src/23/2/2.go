package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Game = struct {
	id  int
	rgb RGB
}

type RGB = [3]int

var log = fmt.Println
var rgbMax = [3]int{12, 13, 14}

func main() {
	file, err := os.Open("input.txt")

	if err != nil {
		panic("Unable to open file.")
	}

	games := make([]Game, 0, 100)
	getLine := utils.CreateGetLine(file)

	for {
		line, err := getLine()

		if err == io.EOF {
			break
		}

		if err != nil {
			panic(err)
		}

		var maxGameRGB RGB
		// Learning how to split strings
		game := strings.Split(line, ":")
		gameRGB := game[1]
		gameId, err := strconv.Atoi(strings.Fields(game[0])[1])

		if err != nil {
			panic(err)
		}

		regex := regexp.MustCompile("[,;]")
		cubeNums := regex.Split(gameRGB, -1)

		for _, cubeNum := range cubeNums {
			numColor := strings.Fields(cubeNum)
			numStr, color := numColor[0], numColor[1]

			num, err := strconv.Atoi(numStr)

			if err != nil {
				panic(err)
			}

			switch color {
			case "red":
				if num > maxGameRGB[0] {
					maxGameRGB[0] = num
				}
			case "green":
				if num > maxGameRGB[1] {
					maxGameRGB[1] = num
				}

			case "blue":
				if num > maxGameRGB[2] {
					maxGameRGB[2] = num

				}
			}
		}
		games = append(games, Game{id: gameId, rgb: maxGameRGB})
	}

	idSum := 0

	for _, game := range games {
		rgb := game.rgb
		if rgb[0] > rgbMax[0] || rgb[1] > rgbMax[1] || rgb[2] > rgbMax[2] {
			continue
		}

		idSum += game.id
	}

	log(idSum)
}
