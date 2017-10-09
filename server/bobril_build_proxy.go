package server

import (
	"io"
	"net/http"
)

const bobrilBuildBasePath = "http://localhost:8080"

func isBobrilBuildRunning() bool {
	_, err := http.Get(bobrilBuildBasePath)
	if err != nil {
		return false
	}

	return true
}

func handleByBobrilBuild(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get(bobrilBuildBasePath + r.RequestURI)
	if err != nil {
		return
	}

	defer resp.Body.Close()

	for k, v := range resp.Header {
		w.Header().Set(k, v[0])
	}

	io.Copy(w, resp.Body)
}
