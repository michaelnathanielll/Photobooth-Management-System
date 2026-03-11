package model

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"reflect"
	"strconv"
	"time"

	"github.com/google/uuid"
)

// tanggal >= '2024-09-01' AND tanggal <= '2024-09-31'

func createFileLog(namFile string) {

	// deteksi apakah file sudah ada
	var _, err = os.Stat(namFile)

	// buat file baru jika belum ada
	if os.IsNotExist(err) {
		file, err := os.Create(namFile)
		if err != nil {
			return
		}
		defer file.Close()
	}

	//fmt.Println("==> file berhasil dibuat", path)
}

func InsertLog(Ip string, namaApi string, lenRes interface{}, lenParam int) error {

	now := time.Now()
	namaFile := now.Format("20060102")
	ts := now.Format("2006-01-02 15:04:05")
	path := "log/aplikasi/" + namaFile + ".txt"
	createFileLog(path)
	jsonData, err := json.Marshal(lenRes)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	lenPara := strconv.Itoa(lenParam)
	var lenR string
	var jsonObjs interface{}
	switch v := lenRes.(type) {
	case string:
		fmt.Println("Response:", v)
		lenR = "1"
	default:
		json.Unmarshal(jsonData, &jsonObjs)
		objSlice, ok := jsonObjs.([]interface{})
		if !ok {
			fmt.Println("cannot convert the JSON objects")
			lenR = "1"
			//os.Exit(1)
		} else {
			lenR = strconv.Itoa(len(objSlice))
		}

	}

	format := "{<" + ts + ">;Ip:" + Ip + ";Nama API:" + namaApi + ";lenRespon:" + lenR + ";LenParam:" + lenPara + ";}"
	f, err := os.OpenFile(path,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
		return err
	}
	defer f.Close()
	if _, err := f.WriteString(format + "\n"); err != nil {
		log.Println(err)
		return err
	}
	return nil
}

func InsertLogError(Ip string, namaApi string, err error) error {

	now := time.Now()
	namaFile := now.Format("20060102")
	ts := now.Format("2006-01-02 15:04:05")
	path := "log/aplikasi/" + namaFile + ".txt"
	createFileLog(path)
	errRes := ""
	if err != nil {
		errRes = err.Error()
	}
	format := "{<" + ts + ">;Ip:" + Ip + ";Nama API:" + namaApi + ";error:" + errRes + ";}"
	f, err := os.OpenFile(path,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
		return err
	}
	defer f.Close()
	if _, err := f.WriteString(format + "\n"); err != nil {
		log.Println(err)
		return err
	}
	return nil
}

func UploadFotoFolder(file *multipart.FileHeader, id int64, folder string) (Response, error) {
	var res Response
	log.Println("Upload Foto")
	//source
	src, err := file.Open()
	if err != nil {
		log.Println(err.Error())
		return res, err
	}
	defer src.Close()
	nId := strconv.Itoa(int(id))
	// Destination
	dst, err := os.Create("uploads/" + folder + "/" + file.Filename)
	if err != nil {
		return res, err
	}

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		log.Println(err.Error())
		return res, err
	}
	dst.Close()
	if err = os.Rename("uploads/"+folder+"/"+file.Filename, "uploads/"+folder+"/"+folder+"-"+nId+".png"); err != nil {
		log.Println(err.Error())
		return res, err
	}

	err = UpdateDataFoto(folder, "foto", int(id))
	if err != nil {
		return res, err
	}

	res.Status = http.StatusOK
	res.Message = "Sukses Upload Foto"
	res.Data = file.Filename

	return res, nil
}

func UploadFotoFolder1(file *multipart.FileHeader, path string) (string, error) {
	// var res Response
	log.Println("Upload Foto")
	//source
	src, err := file.Open()
	if err != nil {
		log.Println(err.Error())
		err = errorHandle.ErrorLine(err)
		return "", err
	}
	defer src.Close()
	// Destination
	dst, err := os.Create(path + "/" + file.Filename)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return "", err
	}

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		err = errorHandle.ErrorLine(err)
		return "", err
	}
	dst.Close()
	pathNew := path + "/" + uuid.NewString() + "-" + file.Filename
	if err = os.Rename(path+"/"+file.Filename, pathNew); err != nil {
		err = errorHandle.ErrorLine(err)
		return "", err
	}

	return pathNew, nil
}

func GetPhoto(path string, id string) string {
	result := "uploads/" + path + "/" + path + "-" + id + ".png"
	fmt.Println(result)
	return result
}

func UpdateDataFoto(tabel string, kolom string, id int) error {
	log.Println("mengubah status foto di DB")
	con, err := db.DbConnection()
	defer db.DbClose(con)
	if err != nil {
		log.Println("error: " + err.Error())
		return err
	}
	var query string

	query = fmt.Sprintf("UPDATE %s SET %s='%s' where id = %d", tabel, kolom, "ada", id)

	rows, err := con.Query(query)
	defer rows.Close()
	if err != nil {
		return err
	}
	defer con.Close()
	fmt.Println("status foto di edit")
	return nil
}

func ResponseInsert() Response {
	return Response{Status: http.StatusCreated, Message: "berhasil"}
}
func ResponseInsertWithMessage(message string) Response {
	return Response{Status: http.StatusCreated, Message: message}
}
func ResponseGet() Response {
	return Response{Status: http.StatusOK, Message: "berhasil"}
}
func ResponseGetWithMessage(message string) Response {
	return Response{Status: http.StatusOK, Message: message}
}

func ResponseError(err error) Response {
	return Response{Status: http.StatusInternalServerError, Message: "gagal", Data: err.Error()}
}

func GetDateNow() string {
	return time.Now().Format("2006-01-02")
}
func GetDateTimeNow() string {
	return time.Now().Format("2006-01-02 15:04:05")
}
func FormatDate(date string) string {
	return date[:10]
}
func FormatDateTime(date string) string {
	return date[:10] + date[11:18]
}

func DecodeMapStringTime(data map[string]interface{}, obj interface{}) {
	elem := reflect.ValueOf(obj).Elem()
	typeOfElem := elem.Type()
	for i := 0; i < elem.NumField(); i++ {
		field := elem.Field(i)
		tag := typeOfElem.Field(i).Tag.Get("json")
		if val, ok := data[tag]; ok {
			switch field.Kind() {
			case reflect.Float64:
				tmp, ok := val.(float64)
				if !ok {
					tmp1, ok := val.(float32)
					if !ok {
						tmp2 := val.(string)
						tmp, _ = strconv.ParseFloat(tmp2, 64)
					} else {
						tmp = float64(tmp1)
					}
				}
				field.SetFloat(tmp)
			case reflect.Float32:
				field.SetFloat(float64(val.(float32)))
			case reflect.Int:
				field.SetInt(val.(int64)) // Assuming val is int64
			case reflect.Struct:
				jsonVal, err := json.Marshal(val)
				if err != nil {
					continue
				}
				if err := json.Unmarshal(jsonVal, field.Addr().Interface()); err != nil {
					continue
				}
			default:
				if reflect.ValueOf(val).Type() == reflect.TypeOf(time.Time{}) {
					if v, ok := val.(time.Time); ok {
						tmp := v.Format("2006-01-02 15:04:05")
						field.Set(reflect.ValueOf(tmp))
					}
				} else {
					field.Set(reflect.ValueOf(val))
				}
			}
		}
	}
}
func DecodeMapStringV1(data map[string]interface{}, obj interface{}) {
	elem := reflect.ValueOf(obj).Elem() // Get the value of the struct pointer
	typeOfElem := elem.Type()           // Get the type of the struct

	for i := 0; i < elem.NumField(); i++ { // Iterate through struct fields
		field := elem.Field(i)
		tag := typeOfElem.Field(i).Tag.Get("json")

		// Skip unexported fields (private fields in Go are unexported)
		if !field.CanSet() {
			continue
		}

		if val, ok := data[tag]; ok {
			// Safeguard for kind matching to avoid panic
			switch field.Kind() {
			case reflect.Float64:
				// Convert value to float64 if necessary
				switch v := val.(type) {
				case float64:
					field.SetFloat(v)
				case float32:
					field.SetFloat(float64(v))
				case string:
					tmp, err := strconv.ParseFloat(v, 64)
					if err == nil {
						field.SetFloat(tmp)
					}
				case int:
					field.SetFloat(float64(v))
				case int64:
					field.SetFloat(float64(v))
				}

			case reflect.Float32:
				// Convert value to float32 if necessary
				switch v := val.(type) {
				case float64:
					field.SetFloat(float64(v))
				case float32:
					field.SetFloat(float64(v))
				case string:
					tmp, err := strconv.ParseFloat(v, 32)
					if err == nil {
						field.SetFloat(tmp)
					}
				case int:
					field.SetFloat(float64(v))
				case int64:
					field.SetFloat(float64(v))
				}

			case reflect.Int, reflect.Int64:
				// Convert value to int64 if necessary
				switch v := val.(type) {
				case int:
					field.SetInt(int64(v))
				case int64:
					field.SetInt(v)
				case float64:
					field.SetInt(int64(v))
				case string:
					tmp, err := strconv.ParseInt(v, 10, 64)
					if err == nil {
						field.SetInt(tmp)
					}
				}

			case reflect.String:
				// Directly set string values
				if v, ok := val.(time.Time); ok {
					formatTag := typeOfElem.Field(i).Tag.Get("format")
					formatDate := ""
					if formatTag == "datetime" {
						formatDate = "2006-01-02 15:04:05"
					} else if formatTag == "time" {
						formatDate = "15:04"
					} else if formatTag == "date" {
						formatDate = "2006-01-02"
					} else {
						formatDate = "2006-01-02 15:04:05"
					}
					tmp := v.Format(formatDate)
					field.Set(reflect.ValueOf(tmp))
				} else if v, ok := val.(string); ok {
					field.SetString(v)
				}

			case reflect.Struct:
				// Handle nested struct by marshaling and unmarshaling
				jsonVal, err := json.Marshal(val)
				if err != nil {
					continue
				}
				if err := json.Unmarshal(jsonVal, field.Addr().Interface()); err != nil {
					continue
				}

			default:
				// Generic fallback for any other types
				field.Set(reflect.ValueOf(val))
			}
		}
	}
}

func DecodeMapString(data map[string]interface{}, obj interface{}) {
	elem := reflect.ValueOf(obj).Elem()
	typeOfElem := elem.Type()
	for i := 0; i < elem.NumField(); i++ {
		field := elem.Field(i)
		tag := typeOfElem.Field(i).Tag.Get("json")
		if val, ok := data[tag]; ok {
			// fmt.Println(val, field.Kind(), tag, reflect.TypeOf(val))
			switch field.Kind() {
			case reflect.Float64:
				tmp, ok := val.(float64)
				if !ok {
					tmp1, ok := val.(float32)
					if !ok {
						tmp2 := val.(string)
						tmp, _ = strconv.ParseFloat(tmp2, 64)
					} else {
						tmp = float64(tmp1)
					}
				}
				field.SetFloat(tmp)
			case reflect.Float32:
				field.SetFloat(float64(val.(float32)))
			case reflect.Int:
				field.SetInt(val.(int64)) // Assuming val is int64
			case reflect.Struct:
				jsonVal, err := json.Marshal(val)
				if err != nil {
					continue
				}
				if err := json.Unmarshal(jsonVal, field.Addr().Interface()); err != nil {
					continue
				}
			default:
				field.Set(reflect.ValueOf(val))
			}
		}
	}
}

func DecodeMapStringArray(data []map[string]interface{}, obj interface{}) {
	sliceValue := reflect.ValueOf(obj).Elem()
	sliceType := sliceValue.Type().Elem()

	for _, item := range data {
		newItem := reflect.New(sliceType).Elem()
		// fmt.Println(item)
		for i := 0; i < newItem.NumField(); i++ {
			field := newItem.Field(i)
			tag := sliceType.Field(i).Tag.Get("json")
			val, ok := item[tag]
			if !ok {
				continue
			}
			// fmt.Println(val, field.Kind(), tag, reflect.TypeOf(val))
			switch field.Kind() {
			case reflect.Float64:
				switch v := val.(type) {
				case float64:
					field.SetFloat(v)
				case float32:
					field.SetFloat(float64(v))
				case string:
					tmp, err := strconv.ParseFloat(v, 64)
					if err == nil {
						field.SetFloat(tmp)
					}
				case int:
					field.SetFloat(float64(v))
				case int64:
					field.SetFloat(float64(v))
				}
			case reflect.Float32:
				// Convert value to float32 if necessary
				switch v := val.(type) {
				case float64:
					field.SetFloat(float64(v))
				case float32:
					field.SetFloat(float64(v))
				case string:
					tmp, err := strconv.ParseFloat(v, 32)
					if err == nil {
						field.SetFloat(tmp)
					}
				case int:
					field.SetFloat(float64(v))
				case int64:
					field.SetFloat(float64(v))
				}
			case reflect.Int, reflect.Int64:
				switch v := val.(type) {
				case int:
					field.SetInt(int64(v))
				case int64:
					field.SetInt(v)
				case float64:
					field.SetInt(int64(v))
				case string:
					tmp, err := strconv.ParseInt(v, 10, 64)
					if err == nil {
						field.SetInt(tmp)
					}
				} // Assuming val is int64

			case reflect.String:
				// Directly set string values
				if v, ok := val.(time.Time); ok {
					formatTag := sliceType.Field(i).Tag.Get("format")
					formatDate := ""
					if formatTag == "datetime" {
						formatDate = "2006-01-02 15:04:05"
					} else if formatTag == "date" {
						formatDate = "2006-01-02"
					} else if formatTag == "time" {
						formatDate = "15:04"
					} else {
						formatDate = "2006-01-02 15:04:05"
					}
					tmp := v.Format(formatDate)
					field.Set(reflect.ValueOf(tmp))
				} else if v, ok := val.(string); ok {
					field.SetString(v)
				}

			case reflect.Struct:
				jsonVal, err := json.Marshal(val)
				if err != nil {
					continue
				}
				if err := json.Unmarshal(jsonVal, field.Addr().Interface()); err != nil {
					continue
				}
			default:
				if reflect.ValueOf(val).Type() == reflect.TypeOf(time.Time{}) {
					if v, ok := val.(time.Time); ok {
						tmp := v.Format("2006-01-02 15:04:05")
						field.Set(reflect.ValueOf(tmp))
					}
				} else {
					field.Set(reflect.ValueOf(val))
				}
			}
		}

		sliceValue.Set(reflect.Append(sliceValue, newItem))
	}
}

func convertMinutesToDHMS(minutes int) string {
	days := minutes / 1440         // 1 hari = 1440 menit
	hours := (minutes % 1440) / 60 // Sisa menit setelah dibagi hari, dibagi lagi 60 untuk jam
	minutes = minutes % 60         // Sisa menit setelah dibagi jam

	var result string

	if days > 0 {
		result += fmt.Sprintf("%dHr ", days)
	}
	if hours > 0 {
		result += fmt.Sprintf("%dJ ", hours)
	}
	if minutes > 0 {
		result += fmt.Sprintf("%dM", minutes)
	}

	// Jika tidak ada komponen yang ditambahkan, tampilkan 0m
	if result == "" {
		result = "0M"
	}

	return result
}
