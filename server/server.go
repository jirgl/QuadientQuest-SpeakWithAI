package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type subscription struct {
	Key string `json:"key"`
}

//Run func launches http server
func Run(subscriptionKey string) {
	directory, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	if isBobrilBuildRunning() {
		http.HandleFunc("/", handleByBobrilBuild)
	} else {
		fs := http.FileServer(http.Dir(directory + "/client/dist"))
		http.Handle("/", fs)
	}

	http.HandleFunc("/api/addTodo", addOrUpdateTodo)
	http.HandleFunc("/api/updateTodo", addOrUpdateTodo)
	http.HandleFunc("/api/getTodos", getTodos)
	http.HandleFunc("/api/removeTodo", removeTodo)
	http.HandleFunc("/api/subscription", func(w http.ResponseWriter, r *http.Request) {
		if bytes, err := json.Marshal(&subscription{Key: subscriptionKey}); err == nil {
			w.Write(bytes)
		}
	})
	fmt.Println("Server is running at http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
