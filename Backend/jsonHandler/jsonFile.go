package jsonHandler

import (
	"encoding/json"
	"os"
)

func ReadJSONFile(path string, obj any) (any, error) {
	// Baca isi file
	fileData, err := os.ReadFile(path)
	if err != nil {
		return obj, err
	}

	// Unmarshal data JSON ke struct
	err = json.Unmarshal(fileData, &obj)
	if err != nil {
		return obj, err
	}

	return obj, nil
}
