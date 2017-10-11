package server

import (
	"encoding/json"
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
	if err := decoder.Decode(&todo); err != nil {
		return nil
	}

	return &todo
}

func addOrUpdateTodo(w http.ResponseWriter, r *http.Request) {
	if todo := parseRequest(r); todo != nil {
		inMemoryTodos[todo.ID] = todo
	}
}

func getTodos(w http.ResponseWriter, r *http.Request) {
	todos := []todo{}
	for _, todo := range inMemoryTodos {
		todos = append(todos, *todo)
	}

	if bytes, err := json.Marshal(&todos); err == nil {
		w.Write(bytes)
	}
}

func removeTodo(w http.ResponseWriter, r *http.Request) {
	if todo := parseRequest(r); todo != nil {
		delete(inMemoryTodos, todo.ID)
	}
}
