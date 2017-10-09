package main

import (
	"fmt"

	"github.com/jirgl/quadient-quest-speek-with-ai/server"
)

func main() {
	fmt.Println("Paste your azure subscription key for speech recognition:")
	key := ""
	fmt.Scanln(&key)
	server.Run(key)
}
