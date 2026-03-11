package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	// "strings"
)

// var jwtToken = ""

func RequestAPI(metohd, url, bodyRequest string) (map[string]interface{}, error) {
	bodyReq := bytes.NewBuffer([]byte(bodyRequest))
	if bodyRequest == "" {
		bodyReq = nil
	}
	req, err := http.NewRequest(metohd, url, bodyReq)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	// req.Header.Set("X-API-KEY", config.GetConfig().WebsocketConfig.WSApiToken)

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Error making request:", err)
		return nil, err
	}
	defer resp.Body.Close()

	// Read the response body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return nil, err
	}

	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", string(respBody))
	if resp.Status[:3] != "200" {
		return nil, errors.New(string(respBody))
	}
	//err = InsertLogAPI(req_head, bodyRequest, string(respBody), resp.Status, url, metohd)
	//if err != nil {
	//	fmt.Println("Error reading response:", err)
	//	return nil, err
	//}
	var data map[string]interface{}
	err = json.Unmarshal(respBody, &data)
	if err != nil {
		log.Println("Error : ", err)
		return nil, err
	}
	return data, nil
}

func RequestAPINoBody(metohd, url string) (map[string]interface{}, error) {

	req, err := http.NewRequest(metohd, url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return nil, err
	}
	//token, err := SetToken()
	//if err != nil {
	//	fmt.Println("Error creating request:", err)
	//	return nil, err
	//}
	//authToken, err := RetrivieToken()
	// Set headers
	//authToken = "0238r2yfiwdhfliowyuelu"
	//signature := CreateLayananAPIWithToken(metohd, url, authToken, bodyRequest, token.APIkeySecret, token.TimeStamp)
	//fmt.Println("xpartnerid", token.APIkeyID)
	//fmt.Println("signature_key", token.Signatue_key)
	//fmt.Println("oauthId", token.OAuthID)
	//fmt.Println("signature", signature)
	//signature = "aojkdnfvwijneiu324t3298579t25bg2"
	//req.Header.Set("X-EXTERNAL-ID", token.X_external_id)
	//req.Header.Set("X-TIMESTAMP", token.TimeStamp)
	//req.Header.Set("X-SIGNATURE", signature)
	//req.Header.Set("X-CLIENT-KEY", token.OAuthID)
	//req.Header.Set("CHANNEL-ID", token.Channel_id)
	//req.Header.Set("X-PARTNER-ID", token.APIkeyID)
	// lowerCaseHeader := make(http.Header)
	// for key, value := range req.Header {
	// 	lowerCaseHeader[strings.ToUpper(key)] = value
	// }
	// req.Header = lowerCaseHeader
	req.Header.Set("Content-Type", "application/json")
	// req.Header.Set("X-API-KEY", config.GetConfig().WebsocketConfig.WSApiToken)

	//req.Header.Set("Authorization", "Bearer "+authToken)
	//req.Header.Set("Origin", token.Origin)
	//req_header_pre := req.Header
	// Convert the map to a JSON string
	//jsonHeader, err := json.Marshal(req_header_pre)
	//if err != nil {
	//	fmt.Println("Error:", err)
	//	return nil, err
	//}

	// Print the JSON data as a string
	//req_head := string(jsonHeader)
	//fmt.Println(req.Header)
	// Perform the request
	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Error making request:", err)
		return nil, err
	}
	defer resp.Body.Close()

	// Read the response body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return nil, err
	}

	// fmt.Println("Response Status:", resp.Status)
	// fmt.Println("Response Body:", string(respBody))
	//err = InsertLogAPI(req_head, bodyRequest, string(respBody), resp.Status, url, metohd)
	//if err != nil {
	//	fmt.Println("Error reading response:", err)
	//	return nil, err
	//}
	var data map[string]interface{}
	err = json.Unmarshal(respBody, &data)
	if err != nil {
		log.Println("Error : ", err)
		return nil, err
	}
	return data, nil
}
