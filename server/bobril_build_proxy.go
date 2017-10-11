package server

import (
	"io"
	"net/http"
)

const bobrilBuildBasePath = "http://localhost:8080"

func isBobrilBuildRunning() bool {
	if _, err := http.Get(bobrilBuildBasePath); err == nil {
		return true
	}

	return false
}

func handleByBobrilBuild(w http.ResponseWriter, r *http.Request) {
	if resp, err := http.Get(bobrilBuildBasePath + r.RequestURI); err == nil {
		defer resp.Body.Close()

		for k, v := range resp.Header {
			w.Header().Set(k, v[0])
		}

		io.Copy(w, resp.Body)
	}
}
