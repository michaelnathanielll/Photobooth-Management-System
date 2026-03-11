package dbmod

import (
	"TemplateProject/errorHandle"
	"TemplateProject/jsonHandler"
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"time"
)

func GetVariableStruct(obj any) ([]string, error) {
	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("json"))
		//field_type := strings.ToLower(field.Tag.Get("type"))
		obj_struct += field_name
		if i < val.NumField()-1 {

			obj_struct += ","
		}
		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	return strings.Split(obj_struct, ","), nil
}

func createQuerySelect(obj any, table, where, order, limit, offset string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		field_json := strings.ToLower(field.Tag.Get("json"))
		field_act := strings.ToLower(field.Tag.Get("act"))
		field_type := strings.ToLower(field.Tag.Get("type"))
		if field_name != "" && field_type != "join" { //field_type := strings.ToLower(field.Tag.Get("type"))
			if field_act != "" && field_act != "ai" && field_act != "pass_update" && field_act != "coalesce"&& field_act != "def" {
				query += field_act + "(" + field_name + ")"
			} else if field_act == "coalesce" {
				field_to := strings.ToLower(field.Tag.Get("to"))
				if field_to != "" {
					field_name = " COALESCE(" + field_name + "," + field_to + ")"
				} else {
					field_var := strings.ToLower(field.Tag.Get("var"))
					if field_var == "string" {
						field_name = " COALESCE(" + field_name + ",'')"
					} else if field_var == "int" {
						field_name = " COALESCE(" + field_name + ",0)"
					}
				}
				query += field_name
			} else {
				query += field_name
			}
			obj_struct += field_json

			query += ","
			obj_struct += ","
		}
		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}
	if order != "" {
		query += " ORDER BY " + order
	}
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createQuerySelectJoin(obj any, table, join, where, order, limit, offset string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		field_json := strings.ToLower(field.Tag.Get("json"))
		field_type := strings.ToLower(field.Tag.Get("type"))
		if field_name != "" {
			value := ""
			if field_type == "join" {
				//field_table := strings.ToLower(field.Tag.Get("table"))
				field_alias := strings.ToLower(field.Tag.Get("alias"))
				value += field_alias + "." + field_name

			} else {
				value += table + "." + field_name
			}
			field_act := strings.ToLower(field.Tag.Get("act"))
			if field_act == "coalesce" {
				field_to := strings.ToLower(field.Tag.Get("to"))
				if field_to != "" {
					value = " COALESCE(" + value + "," + table + "." + field_to + ")"
				} else {
					field_var := strings.ToLower(field.Tag.Get("var"))
					if field_var == "string" {
						value = " COALESCE(" + value + ",'')"
					} else if field_var == "int" {
						value = " COALESCE(" + value + ",0)"
					}

				}
			} else if field_act != "" && field_act != "ai" && field_act != "pass_update" {
				field_var := strings.ToLower(field.Tag.Get("var"))
				if field_var == "string" {
					value = " COALESCE(" + value + ",'')"
				} else if field_var == "int" {
					value = " COALESCE(" + value + ",0)"
				} else if field_var != "" {
					value = strings.ToUpper(field_act) + "(" + value + "," + strings.ToUpper(field_var) + ")"
				} else {
					value = strings.ToUpper(field_act) + "(" + value + ")"
				}

			}
			obj_struct += field_json
			query += value
			query += ","
			obj_struct += ","
		}
		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + join
	if where != "" {
		query += " WHERE " + where
	}
	if order != "" {
		query += " ORDER BY " + order
	}
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createQuerySelectJoinGroupBy(obj any, table, join, where, order, groupBy, limit, offset string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		field_json := strings.ToLower(field.Tag.Get("json"))
		field_type := strings.ToLower(field.Tag.Get("type"))
		if field_type == "join" {
			//field_table := strings.ToLower(field.Tag.Get("table"))
			field_alias := strings.ToLower(field.Tag.Get("alias"))
			query += field_alias + "." + field_name
		} else if field_type != "" && field_type != "pk" {
			query += strings.ToUpper(field_type) + "(" + field_name + ")"
		} else {
			query += table + "." + field_name
		}

		obj_struct += field_json

		query += ","
		obj_struct += ","

		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + join
	if where != "" {
		query += " WHERE " + where
	}
	if groupBy != "" {
		query += " GROUP BY " + groupBy
	}
	if order != "" {
		query += " ORDER BY " + order
	}
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createQuerySelectGroupBy(obj any, table, where, limit, offset, groupBy string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		field_json := strings.ToLower(field.Tag.Get("json"))
		field_type := strings.ToLower(field.Tag.Get("type"))
		if field_name != "" {
			if field_type != "" {
				query += strings.ToUpper(field_type) + "(" + field_name + ")"
			} else {
				query += field_name
			}
			obj_struct += field_json

			query += ","
			obj_struct += ","
		}

		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}
	if groupBy != "" {
		query += " GROUP BY " + groupBy
	}
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createCustomQuerySelect(obj any, method, table, where, order, limit, offset string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		query += field_name
		obj_struct += field_name
		if i < val.NumField()-1 {
			query += ","
			obj_struct += ","
		}
		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query += " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}
	if order != "" {
		query += " ORDER BY " + order
	}
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createQueryRow(obj any, table, where, id string) (string, []string, error) {
	query := "SELECT "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	tipe_id := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_json := field.Tag.Get("json")
		field_name := field.Tag.Get("db")
		field_type := field.Tag.Get("type")
		field_act := strings.ToLower(field.Tag.Get("act"))
		field_var := strings.ToLower(field.Tag.Get("var"))
		if i == 0 {
			tipe_id = field.Type.Kind().String()
		}
		if field_name != "" && field_type != "join" {
			if field_act == "" || field_act == "ai" || field_act == "pass_update" {
				query += field_name
			} else {
				// fmt.Println(field_var)
				if field_act == "coalesce" && field_var == "string" {
					query += "COALESCE(" + field_name + ", '') as " + field_name
				} else if field_act == "coalesce" && field_var == "int" {
					query += "COALESCE(" + field_name + ", 0) as " + field_name
				} else {
					query += field_act + " (" + field_name + ")"
				}
			}
			obj_struct += field_json

			query += ","
			obj_struct += ","
		}

		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + table
	if where != "" {
		query += " WHERE " + where
	} else {
		query += " WHERE id = "
		if strings.Contains(tipe_id, "float") || strings.Contains(tipe_id, "int") {
			query += id
		} else {
			query += "'" + id + "'"
		}
	}

	return query, strings.Split(obj_struct, ","), nil
}

func createQuerySelectRowJoin(obj any, table, join, where string) (string, []string, error) {
	query := "SELECT "
	//table = "`" + table + "`"
	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", nil, err
	}
	obj_struct := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {
		//field := val.Field(i)
		field := val.Type().Field(i)
		//field_name :=
		field_name := strings.ToLower(field.Tag.Get("db"))
		field_act := strings.ToLower(field.Tag.Get("act"))
		field_var := strings.ToLower(field.Tag.Get("var"))
		field_json := strings.ToLower(field.Tag.Get("json"))
		field_type := strings.ToLower(field.Tag.Get("type"))
		value := ""
		if field_type == "join" {
			//field_table := strings.ToLower(field.Tag.Get("table"))
			field_alias := strings.ToLower(field.Tag.Get("alias"))
			value += field_alias + "." + field_name
		} else if field_name == "" {
			continue
		} else {
			value += table + "." + field_name
		}
		if field_act == "coalesce" && field_var == "string" {
			value = "COALESCE(" + value + ", '') as " + field_name
		} else if field_act == "coalesce" && field_var == "int" {
			value = "COALESCE(" + value + ", 0) as " + field_name
		}
		query += value
		//fmt.Println(i + 1)
		obj_struct += field_json
		//fmt.Println(field_json)
		query += ","
		obj_struct += ","

		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	}
	query = query[:len(query)-1]
	obj_struct = obj_struct[:len(obj_struct)-1]
	query += " FROM " + join

	query += " WHERE " + where
	//fmt.Println(len(strings.Split(obj_struct, ",")), obj_struct)
	return query, strings.Split(obj_struct, ","), nil
}

func createInsert(obj any, table string) (string, error) {
	Headquery := "INSERT INTO " + table + "("
	query := ""
	values := ""
	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", err
	}

	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {

		field := val.Type().Field(i)
		field_data := val.Field(i)
		//field_name :=
		field_name := field.Tag.Get("db")
		type_ := field.Tag.Get("type")
		act := field.Tag.Get("act")
		inst := field.Tag.Get("insert")
		if type_ != "pk" && act != "ai" && act != "def" && type_ != "join" && field_name != "" && type_ != "pass" {

			switch field.Type.Kind() {
			case reflect.Int:
				if act == "COALESCE" {
					vals := field_data.Interface().(int)
					if vals != 0 {
						query += field_name
						tmpVal := strconv.Itoa(vals)
						values += tmpVal
						query += ","
						values += ","
					}
				} else {
					query += field_name
					tmpVal := strconv.Itoa(field_data.Interface().(int))
					values += tmpVal // Handle integer fields
					query += ","
					values += ","
				}
			case reflect.Int64:
				if act == "COALESCE" {
					vals := field_data.Interface().(int64)
					if vals != 0 {
						query += field_name
						tmpVal := strconv.FormatInt(vals, 10)
						values += tmpVal
						query += ","
						values += ","
					}
				} else {
					query += field_name
					tmpVal := strconv.FormatInt(field_data.Interface().(int64), 10)
					values += tmpVal // Handle integer fields
					query += ","
					values += ","
				}
			case reflect.Float64:
				query += field_name
				tmpVal := strconv.FormatFloat(field_data.Interface().(float64), 'f', 16, 64)
				values += tmpVal
				query += ","
				values += ","
				// Handle integer fields
			case reflect.String:
				vals := field_data.Interface().(string)
				if act == "COALESCE" {
					if vals != "" {
						query += field_name
						tmpVal := vals
						tmpVal = strings.ReplaceAll(tmpVal, "'", "''")
						values += "'" + tmpVal + "'"
						query += ","
						values += ","
					}
				} else if act == "AsText" {
					query += field_name
					values += inst + "('" + vals + "')"
					query += ","
					values += ","
				} else {
					query += field_name
					tmpVal := field_data.Interface().(string)
					tmpVal = strings.ReplaceAll(tmpVal, "'", "''")
					values += "'" + tmpVal + "'"
					query += ","
					values += ","
				}

				// Handle integer fields
			case reflect.Bool:
				query += field_name
				tmpVal := field_data.Interface().(bool)
				if tmpVal {
					values += "1"
				} else {
					values += "0"
				}
				query += ","
				values += ","
				// values += tmpVal // Handle integer fields
			default:
				query += field_name
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				values += "'" + tmpVal + "'"
				query += ","
				values += ","
				continue
			}

		}
	}
	if query[0] == ',' {
		query = query[1:]
	}
	if values[0] == ',' {
		values = values[1:]
	}
	//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
	query = query[:len(query)-1]
	Headquery += query
	Headquery += ")" + " VALUES (" + values[:len(values)-1] + ")"
	return Headquery, nil
}

func createUpdate(obj any, table string) (string, error) {
	query := "UPDATE " + table + " SET "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", err
	}
	id_name := ""
	id_val := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {

		field := val.Type().Field(i)
		field_data := val.Field(i)
		//field_name :=
		field_name := field.Tag.Get("db")
		type_ := field.Tag.Get("type")
		if type_ == "pk" && type_ != "join" {
			id_name += field_name
			switch field.Type.Kind() {
			case reflect.Int:
				tmpVal := strconv.Itoa(field_data.Interface().(int))
				id_val += tmpVal // Handle integer fields
			case reflect.String:
				tmpVal := field_data.Interface().(string)
				id_val += "'" + tmpVal + "'" // Handle integer fields

			default:
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				query += "=" + "'" + tmpVal + "'"
				continue
			}

		}
		//act := field.Tag.Get("act")
		if type_ != "pk" && type_ != "join" {
			query += field_name

			switch field.Type.Kind() {
			case reflect.Int:
				tmpVal := strconv.Itoa(field_data.Interface().(int))
				query += "=" + tmpVal // Handle integer fields
			case reflect.String:
				tmpVal := field_data.Interface().(string)
				query += "=" + "'" + tmpVal + "'" // Handle integer fields

			default:
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				query += "=" + "'" + tmpVal + "'"
				continue
			}

			if i < val.NumField()-1 {
				query += ","
			}
		}
	}
	query += " WHERE " + id_name + " = " + id_val
	return query, nil
}

func createUpdateAtTime(obj any, table string) (string, error) {
	query := "UPDATE " + table + " SET "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", err
	}
	id_name := ""
	id_val := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {

		field := val.Type().Field(i)
		field_data := val.Field(i)
		//field_name :=
		field_name := field.Tag.Get("db")
		type_ := field.Tag.Get("type")
		act_ := field.Tag.Get("act")
		if type_ == "pk" {
			id_name += field_name
			switch field.Type.Kind() {
			case reflect.Int:
				tmpVal := strconv.Itoa(field_data.Interface().(int))
				id_val += tmpVal // Handle integer fields
			case reflect.String:
				tmpVal := field_data.Interface().(string)
				id_val += "'" + tmpVal + "'" // Handle integer fields

			default:
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				query += "=" + "'" + tmpVal + "'"
				continue
			}

		}
		//act := field.Tag.Get("act")
		if type_ != "pk" && type_ != "join" {
			query += field_name

			switch field.Type.Kind() {
			case reflect.Int:
				tmpVal := strconv.Itoa(field_data.Interface().(int))
				query += "=" + tmpVal // Handle integer fields
			case reflect.String:
				tmpVal := field_data.Interface().(string)
				if tmpVal != "" && act_ != "pass_update" {
					query += "=" + "'" + tmpVal + "'"
				}
			default:
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				query += "=" + "'" + tmpVal + "'"
				continue
			}

			if i < val.NumField()-1 {
				query += ","
			}
		}
	}
	query += " , update_at ='" + time.Now().Format("2006-01-02 15:04:05") + "' "
	query += " WHERE " + id_name + " = " + id_val
	return query, nil
}
func createUpdatedAtTime(obj any, table string) (string, error) {
	query := "UPDATE " + table + " SET "

	val := reflect.ValueOf(obj)
	err := errors.New("")
	// Check if the provided object is a struct
	if val.Kind() != reflect.Struct {
		fmt.Println("Not a struct")
		err = errors.New("Not a struct")
		err = errorHandle.ErrorLine(err)
		return "", err
	}
	id_name := ""
	id_val := ""
	// Loop through all fields of the struct
	for i := 0; i < val.NumField(); i++ {

		field := val.Type().Field(i)
		field_data := val.Field(i)
		//field_name :=
		field_name := field.Tag.Get("db")
		type_ := field.Tag.Get("type")
		act_ := field.Tag.Get("act")
		if type_ == "pk" {
			id_name += field_name
			switch field.Type.Kind() {
			case reflect.Int:
				tmpVal := strconv.Itoa(field_data.Interface().(int))
				if tmpVal != "0" {
					id_val += tmpVal
				} // Handle integer fields
			case reflect.String:
				tmpVal := field_data.Interface().(string)
				if tmpVal != "" {
					id_val += "'" + tmpVal + "'"
				} // Handle integer fields

			default:
				// Handle unsupported types or handle them differently if necessary
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				query += "=" + "'" + tmpVal + "'"
				continue
			}

		}
		//act := field.Tag.Get("act")
		if type_ != "pk" && type_ != "join" && field_name != "" {

			indx_ := field.Tag.Get("insert")
			switch field.Type.Kind() {
			case reflect.Int:

				tmpVal := strconv.Itoa(field_data.Interface().(int))
				if tmpVal == "0" || act_ == "pass_update" {
					continue
				} else if tmpVal != "0" && act_ != "pass_update" {
					query += field_name
					query += "=" + tmpVal // Handle integer fields
					query += ","
				}
			case reflect.String:

				tmpVal := field_data.Interface().(string)
				// if field_name == "stnk_path" {
				// 	fmt.Println(":" + tmpVal + ";")
				// }
				if tmpVal == "" && act_ == "pass_update" {
					continue
				} else if tmpVal != "" {
					query += field_name
					// fmt.Println(":" + tmpVal + ";")
					if strings.ToUpper(act_) == "ASTEXT" {
						tmpVal := field_data.Interface().(string)
						query += "=" + indx_ + "('" + tmpVal + "')"
					} else {
						tmpVal := field_data.Interface().(string)
						query += "=" + "'" + tmpVal + "'"
					}
					query += ","
				}
				// Handle integer fields

			default:
				tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
				if tmpVal == "" || tmpVal == "0" || act_ == "pass_update" {
					continue
				}
				query += field_name
				// Handle unsupported types or handle them differently if necessary

				query += "=" + "'" + tmpVal + "'"
				query += ","
				continue
			}

		}
	}
	query = query[:len(query)-1]
	query += " , updated_at ='" + time.Now().Format("2006-01-02 15:04:05") + "' "
	query += " WHERE " + id_name + " = " + id_val
	return query, nil
}

//
//func createInsertCustom(table string, value ...any) (string, []string, error) {
//	query := "INSERT INT0 " + table + "("
//	values := ""
//	val := reflect.ValueOf(obj)
//	err := errors.New("")
//	// Check if the provided object is a struct
//	if val.Kind() != reflect.Struct {
//		fmt.Println("Not a struct")
//		err = errors.New("Not a struct")
//		return "", nil, err
//	}
//	obj_struct := ""
//	// Loop through all fields of the struct
//	for i := 0; i < val.NumField(); i++ {
//
//		field := val.Type().Field(i)
//		field_data := val.Index(i)
//		//field_name :=
//		field_name := field.Tag.Get("db")
//		query += field_name
//		obj_struct += field_name
//		switch field.Type.Kind() {
//		case reflect.Int:
//			tmpVal := strconv.Itoa(field_data.Interface().(int))
//			values += tmpVal // Handle integer fields
//		case reflect.String:
//			tmpVal := field_data.Interface().(string)
//			values += "'" + tmpVal + "'" // Handle integer fields
//
//		default:
//			// Handle unsupported types or handle them differently if necessary
//			tmpVal, _ := jsonHandler.EncodeJson(field_data.Interface())
//			values += "'" + tmpVal + "'"
//			continue
//		}
//
//		if i < val.NumField()-1 {
//			query += ","
//			obj_struct += ","
//			values += ","
//		}
//		//fmt.Printf("%s: %v\n", val.Type().Field(i).Name, field.Interface())
//	}
//	query += ")" + " VALUE(" + values + ")"
//	return query, strings.Split(obj_struct, ","), nil
//}
