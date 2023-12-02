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
var RGB_MAX = [3]int{12, 13, 14}

func getMaxRGB(gameRGBs []string) RGB {
	var maxGameRGB RGB

	for _, rgbValue := range gameRGBs {
		numColor := strings.Fields(rgbValue)
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

	return maxGameRGB
}

func getPossibleGamesIdSum(games []Game) {
	sum := 0

	for _, game := range games {
		rgb := game.rgb
		if rgb[0] > RGB_MAX[0] || rgb[1] > RGB_MAX[1] || rgb[2] > RGB_MAX[2] {
			continue
		}

		sum += game.id
	}

	log(sum)
}

func getGamesPowerSum(games []Game) {
	sum := 0

	for _, game := range games {
		rgb := game.rgb
		r, g, b := rgb[0], rgb[1], rgb[2]

		sum += r * g * b
	}

	log(sum)
}

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

		// Learning how to split strings
		game := strings.Split(line, ":")
		gameRounds := game[1]
		gameId, err := strconv.Atoi(strings.Fields(game[0])[1])

		if err != nil {
			panic(err)
		}

		regex := regexp.MustCompile("[,;]")
		gameRGBs := regex.Split(gameRounds, -1)
		maxGameRGB := getMaxRGB(gameRGBs)
		games = append(games, Game{id: gameId, rgb: maxGameRGB})
	}

	log("1:")
	getPossibleGamesIdSum(games)
	log("2:")
	getGamesPowerSum(games)
}
