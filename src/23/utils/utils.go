package utils

import (
	"bufio"
	"io"
	"os"
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
