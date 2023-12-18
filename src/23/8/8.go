package main

import (
	"aoc/utils"
	"fmt"
	"os"
)

const FIRST_NODE_VAL = "AAA"
const FILE_PATH = "input.txt"

type Node struct {
	val   string
	left  string
	right string
}

func createNodeMap(nodes [][]rune) map[string]Node {
	nodeMap := make(map[string]Node)

	for _, n := range nodes {
		val := string(n[0]) + string(n[1]) + string(n[2])
		L := string(n[7]) + string(n[8]) + string(n[9])
		R := string(n[12]) + string(n[13]) + string(n[14])

		nodeMap[val] = Node{val, L, R}
	}

	return nodeMap
}

func getNextNodeVal(nodeVal string, instruction string, nodeMap map[string]Node) string {
	node := nodeMap[nodeVal]

	if instruction == "L" {
		return node.left
	}

	return node.right
}

func one(instructions string, nodeMap map[string]Node) {
	nodeVal := FIRST_NODE_VAL

	for i := 0; ; i++ {
		index := i % len(instructions)
		instruction := string(instructions[index])
		nodeVal = getNextNodeVal(nodeVal, instruction, nodeMap)

		if nodeVal == "ZZZ" {
			fmt.Println(i + 1)
			break
		}
	}
}

func filterNodes(nodeMap map[string]Node) []Node {
	var nodes []Node

	for _, node := range nodeMap {
		if string(node.val[2]) == "A" {
			nodes = append(nodes, node)
		}
	}

	return nodes
}

// greatest common divisor (GCD) via Euclidean algorithm
func GCD(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

// find Least Common Multiple (LCM) via GCD
func LCM(a, b int, integers ...int) int {
	result := a * b / GCD(a, b)

	for i := 0; i < len(integers); i++ {
		result = LCM(result, integers[i])
	}

	return result
}

func two(instructions string, nodeMap map[string]Node) {
	nodes := filterNodes(nodeMap)
	var steps []int

	// loop through instructions
	for _, node := range nodes {
		nextNodeVal := node.val
		for i := 0; ; i++ {
			// wrap arround for repeated instructions
			index := i % len(instructions)
			instruction := string(instructions[index])

			nextNodeVal = getNextNodeVal(nextNodeVal, instruction, nodeMap)

			if string(nextNodeVal[2]) == "Z" {
				steps = append(steps, i+1)
				break
			}
		}

	}

	fmt.Println(LCM(steps[0], steps[1], steps[2:]...))
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
	nodeMap := createNodeMap(nodes)

	// one(instructions, nodeMap)
	two(instructions, nodeMap)
}
