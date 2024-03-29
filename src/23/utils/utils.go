package utils

import (
	"bufio"
	"io"
	"os"
	"strings"
)

func CreateGetLine(file *os.File) func() (string, error) {
	scanner := bufio.NewScanner(file)

	return func() (string, error) {
		if scanner.Scan() {
			return scanner.Text(), nil
		}

		if err := scanner.Err(); err != nil {
			return "", err
		}

		return "", io.EOF
	}
}

func GetLines(file *os.File) ([][]rune, error) {
	scanner := bufio.NewScanner(file)
	var lines [][]rune

	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, []rune(line))
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return lines, nil
}

func GetSplittedLines(fileName string, delimiter string) []string {
	content, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	return strings.Split(string(content), delimiter)
}

func IsValidGridIndex(grid [][]string, x, y int) bool {
	if y < 0 || y >= len(grid) {
		return false
	}

	if x < 0 || x >= len(grid[y]) {
		return false
	}

	return true
}

func Contains[T comparable](slice []T, element T) bool {
	for _, s := range slice {
		if s == element {
			return true
		}
	}

	return false
}
