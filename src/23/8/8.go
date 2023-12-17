package main

import (
	"aoc/utils"
	"fmt"
	"os"
)

const FIRST_NODE_VAL = "AAA"
const FILE_PATH = "input.txt"

type Node struct {
	left  string
	right string
}

func main() {
	file, err := os.Open(FILE_PATH)

	if err != nil {
		panic(err)
	}

	lines, err := utils.GetLines(file)

	if err != nil {
		panic(err)
	}

	instructions := string(lines[0])
	nodes := lines[2:]

	nodeMap := make(map[string]Node)

	for _, n := range nodes {
		val := string(n[0]) + string(n[1]) + string(n[2])
		L := string(n[7]) + string(n[8]) + string(n[9])
		R := string(n[12]) + string(n[13]) + string(n[14])

		nodeMap[val] = Node{L, R}
	}

	nodeVal := FIRST_NODE_VAL

	for i := 0; ; i++ {
		index := i % len(instructions)
		direction := string(instructions[index])

		node := nodeMap[nodeVal]

		if direction == "L" {
			nodeVal = node.left
		} else {
			nodeVal = node.right
		}

		if nodeVal == "ZZZ" {
			fmt.Println(i + 1)
			break
		}
	}
}
