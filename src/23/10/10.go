package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
)

const FILE_PATH = "input_test.txt"

type Vertex struct {
	x int
	y int
}

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

func createVisited(tiles [][]string) [][]bool {
	var visited [][]bool

	for _, tileRow := range tiles {
		var visitedRow []bool

		for range tileRow {
			visitedRow = append(visitedRow, false)
		}

		visited = append(visited, visitedRow)
	}

	return visited
}

func getStartingVertex(tiles [][]string) Vertex {
	for y, tileRow := range tiles {
		for x, tile := range tileRow {
			if tile == "S" {
				return Vertex{x, y}
			}
		}
	}

	return Vertex{-1, -1}
}

func getNextVertex(tiles [][]string, v Vertex) Vertex {

}

func walk(tiles [][]string, visited [][]bool, v Vertex) {
	// mark as visited
	visited[v.y][v.x] = true

	nextVertex := getNextVertex(tiles, v)

}

func main() {
	file, err := os.Open(FILE_PATH)
	if err != nil {
		panic(err)
	}

	tiles := parseTiles(file)
	visited := createVisited(tiles)
	start := getStartingVertex(tiles)
	fmt.Println(start)

	walk(tiles, visited, start)

}
