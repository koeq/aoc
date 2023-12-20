package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
)

const FILE_PATH = "input_test.txt"

func parseTiles(file *os.File) [][]string {
	var tiles [][]string

	getLine := utils.CreateGetLine(file)

	for {
		var tileRow []string
		line, err := getLine()

		if err == io.EOF {
			break
		}

		if err != nil {
			panic(err)
		}

		for _, tile := range line {
			tileRow = append(tileRow, string(tile))
		}

		tiles = append(tiles, tileRow)

	}

	return tiles
}

func main() {
	file, err := os.Open(FILE_PATH)
	if err != nil {
		panic(err)
	}

	tiles := parseTiles(file)

	for _, row := range tiles {
		fmt.Println(row)
	}
}
