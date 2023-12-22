package main

import (
	"aoc/utils"
	"fmt"
	"io"
	"os"
)

const FILE_PATH = "input.txt"

type Vertex struct {
	x int
	y int
}

var pipeLeadsTo = map[string][]string{
	"|": {"N", "S"},
	"-": {"E", "W"},
	"L": {"N", "E"},
	"J": {"N", "W"},
	"7": {"S", "W"},
	"F": {"S", "E"},
	"S": {"N", "E", "S", "W"},
}

var pipeCanConnectTo = map[string][]string{
	"|": {"N", "S"},
	"-": {"E", "W"},
	"L": {"S", "W"},
	"J": {"S", "E"},
	"7": {"N", "E"},
	"F": {"N", "W"},
	"S": {"N", "E", "S", "W"},
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

func directionToVertex(v Vertex, direction string) Vertex {
	if direction == "W" {
		return Vertex{x: v.x - 1, y: v.y}
	}

	if direction == "E" {
		return Vertex{x: v.x + 1, y: v.y}
	}
	if direction == "N" {
		return Vertex{x: v.x, y: v.y - 1}
	}

	if direction == "S" {
		return Vertex{x: v.x, y: v.y + 1}
	}

	return v
}

func canConnect(newPipe string, direction string) bool {
	for _, d := range pipeCanConnectTo[newPipe] {
		if d == direction {
			return true
		}
	}
	return false
}

// next vertex not valid if:
// 1. out of bounds
// 2. already visited
// 3. it's pipe can't connect to current pipe
func getNextVertex(tiles [][]string, visited *[][]bool, v Vertex, pathLength int) (next Vertex, isNext bool) {
	pipe := tiles[v.y][v.x]
	possibleDirections := pipeLeadsTo[pipe]

	for _, direction := range possibleDirections {
		newV := directionToVertex(v, direction)

		// new vertex out of bounds
		if !utils.IsValidGridIndex(tiles, newV.x, newV.y) {
			continue
		}

		newPipe := tiles[newV.y][newV.x]

		if newPipe == "S" && pathLength <= 1 {
			continue
		}

		// new pipe can't connect or already visited
		if !canConnect(newPipe, direction) || (*visited)[newV.y][newV.x] {
			continue
		}

		return newV, true
	}

	return Vertex{-1, -1}, false
}

var successfulPathsLengths []int

func walk(tiles [][]string, visited *[][]bool, vertex Vertex, start Vertex, pathLength int) {
	if vertex == start && pathLength > 0 {
		successfulPathsLengths = append(successfulPathsLengths, pathLength)

		return
	}

	if tiles[vertex.y][vertex.x] != "S" {
		(*visited)[vertex.y][vertex.x] = true
	}

	nextVertex, isNext := getNextVertex(tiles, visited, vertex, pathLength)

	if isNext {
		walk(tiles, visited, nextVertex, start, pathLength+1)
	}

	if tiles[vertex.y][vertex.x] != "S" {
		(*visited)[vertex.y][vertex.x] = false
	}
}

func main() {
	file, err := os.Open(FILE_PATH)
	if err != nil {
		panic(err)
	}

	tiles := parseTiles(file)
	visited := createVisited(tiles)
	start := getStartingVertex(tiles)

	walk(tiles, &visited, start, start, 0)

	for _, length := range successfulPathsLengths {
		fmt.Println("Farthest:", length/2)
	}
}
