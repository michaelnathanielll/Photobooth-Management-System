package dbmod

import (
	"reflect"
)

func DecodeMapString(data map[string]interface{}, obj interface{}) {
	elem := reflect.ValueOf(obj).Elem()
	typeOfElem := elem.Type()
	for i := 0; i < elem.NumField(); i++ {
		// fmt.Println(i)
		field := elem.Field(i)
		tag := typeOfElem.Field(i).Tag.Get("json")
		if val, ok := data[tag]; ok {
			switch field.Kind() {
			case reflect.Float64:
				if reflect.TypeOf(val).Kind() == reflect.Float64 {
					field.SetInt(int64(val.(float64)))
				}
			case reflect.Int:
				if reflect.TypeOf(val).Kind() == reflect.Int64 {
					field.SetInt(val.(int64))
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

		for i := 0; i < newItem.NumField(); i++ {
			field := newItem.Field(i)
			tag := sliceType.Field(i).Tag.Get("json")
			val, ok := item[tag]
			if !ok {
				continue
			}

			switch field.Kind() {
			case reflect.Float64:
				field.SetInt(int64(val.(float64)))
			case reflect.Int:
				field.SetInt(val.(int64)) // Assuming val is int64
			default:
				field.Set(reflect.ValueOf(val))
			}
		}

		sliceValue.Set(reflect.Append(sliceValue, newItem))
	}
}
