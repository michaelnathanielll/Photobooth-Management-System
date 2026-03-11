package jsonHandler

import (
	"encoding/json"
	"fmt"
	"log"
)

func EncodeJson(string2 any) (string, error) {
	if string2 == nil {
		return "{}", nil
	}
	data, err := json.Marshal(string2)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return "", err
	}
	return string(data), nil
}

func DecodeJson(string2 string, data any) error {
	//var data interface{}
	// fmt.Println(string2)
	err := json.Unmarshal([]byte(string2), &data)
	if err != nil {
		log.Println("Error : ("+string2+")", err)
		return err
	}
	return nil
}

func MinifyJson(body string) string {
	var jsonData map[string]interface{}
	err := json.Unmarshal([]byte(body), &jsonData)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return ""
	}

	// Marshal the map back to a JSON string with minimal whitespace
	minifiedJSON, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return ""
	}
	return string(minifiedJSON)
}
