package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type todo struct {
	ID     int    `json:"id"`
	Label  string `json:"label"`
	IsDone bool   `json:"isDone"`
}

var inMemoryTodos = map[int]*todo{}

func parseRequest(r *http.Request) *todo {
	decoder := json.NewDecoder(r.Body)
	var todo todo
	err := decoder.Decode(&todo)
	if err != nil {
		return nil
	}

	return &todo
}

func addOrUpdateTodo(w http.ResponseWriter, r *http.Request) {
	todo := parseRequest(r)
	if todo == nil {
		return
	}

	inMemoryTodos[todo.ID] = todo
}

func getTodos(w http.ResponseWriter, r *http.Request) {
	todos := []todo{}
	for _, todo := range inMemoryTodos {
		todos = append(todos, *todo)
	}

	bytes, err := json.Marshal(&todos)
	if err != nil {
		return
	}

	fmt.Println(todos)
	w.Write(bytes)
}

func removeTodo(w http.ResponseWriter, r *http.Request) {
	todo := parseRequest(r)
	if todo == nil {
		return
	}

	delete(inMemoryTodos, todo.ID)
}
