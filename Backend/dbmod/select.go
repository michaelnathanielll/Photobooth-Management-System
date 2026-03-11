package dbmod

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
	"database/sql"
	"fmt"
	"reflect"
)

func SelectQuery(obj any, table, where, order, limit, offset string) (any, error) {
	query, varStruct, err := createQuerySelect(obj, table, where, order, limit, offset)
	fmt.Println(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}

func SelectQueryCustom(obj any, query, limit, offset string) (any, error) {
	varStruct, err := GetVariableStruct(obj)
	fmt.Println(query)
	if limit != "" {
		query += " LIMIT " + limit
	}
	if offset != "" {
		query += " OFFSET " + offset
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	// fmt.Println(query)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanType := reflect.TypeOf(x)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(x.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}

func SelectQueryJoin(obj any, table, where, order, limit, offset, join string) (any, error) {
	query, varStruct, err := createQuerySelectJoin(obj, table, join, where, order, limit, offset)
	fmt.Println(query)
	// fmt.Println("varStruct", varStruct)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else if scanType.Kind() == reflect.Bool {
				if x.(int) == 0 {
					data[varStruct[i]] = false
				} else {
					data[varStruct[i]] = true
				}
			} else {
				data[varStruct[i]] = x
			}

		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}

func SelectQueryJoinGrouby(obj any, table, where, order, groupBy, limit, offset, join string) (any, error) {
	query, varStruct, err := createQuerySelectJoinGroupBy(obj, table, join, where, order, groupBy, limit, offset)
	fmt.Println(query)
	// fmt.Println("varStruct", varStruct)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}

func SelectQueryGroupBy(obj any, table, where, groupBy, limit, offset string) (any, error) {
	query, varStruct, err := createQuerySelectGroupBy(obj, table, where, limit, offset, groupBy)
	// fmt.Println(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}
func SelectQueryGroupByRow(obj any, table, where, groupBy, limit, offset string) (any, error) {
	query, varStruct, err := createQuerySelectGroupBy(obj, table, where, limit, offset, groupBy)
	// fmt.Println(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = data
	}
	return arrObj, nil
}
func SelectQueryGroupByJoin(obj any, table, join, where, groupBy, limit, offset string) (any, error) {
	query, varStruct, err := createQuerySelectJoinGroupBy(obj, table, join, where, "", groupBy, limit, offset)
	fmt.Println(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	rows, err := stmt.Query()
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	scanPointers := make([]interface{}, len(cols))
	dest := make([]interface{}, len(cols))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}
	var arrObj = []map[string]interface{}{}
	for rows.Next() {
		err = rows.Scan(scanPointers...) // Scan into slice of pointers
		if err != nil {
			return nil, err
		}
		data := make(map[string]interface{})
		for i, x := range dest {
			scanValue := x
			scanType := reflect.TypeOf(scanValue)
			if scanType.Kind() == reflect.Slice {
				data[varStruct[i]] = string(scanValue.([]byte))
			} else {
				data[varStruct[i]] = x
			}
		}
		arrObj = append(arrObj, data)
	}
	return arrObj, nil
}

func SelectQueryRow(obj any, table, where, id string) (any, error) {
	query, varStruct, err := createQueryRow(obj, table, where, id)
	fmt.Println(query)
	// fmt.Println(varStruct)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}

	defer stmt.Close()
	scanPointers := make([]interface{}, len(varStruct))
	dest := make([]interface{}, len(varStruct))
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}

	err = stmt.QueryRow().Scan(scanPointers...)
	if err == sql.ErrNoRows {
		err = sql.ErrNoRows
		return nil, err
	} else if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}

	data := make(map[string]interface{})
	for i, x := range dest {
		scanValue := x
		scanType := reflect.TypeOf(scanValue)
		if scanType.Kind() == reflect.Slice {
			data[varStruct[i]] = string(scanValue.([]byte))
		} else {
			data[varStruct[i]] = x
		}
	}

	return data, nil
}

func SelectQueryRowJoin(obj any, table, join, where string) (any, error) {
	query, varStruct, err := createQuerySelectRowJoin(obj, table, join, where)
	fmt.Println(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer stmt.Close()
	//val := reflect.ValueOf(obj)
	cols := len(varStruct)
	scanPointers := make([]interface{}, cols)
	dest := make([]interface{}, cols)
	for i := range scanPointers {
		scanPointers[i] = &dest[i]
	}

	err = stmt.QueryRow().Scan(scanPointers...)
	// fmt.Println(err)
	if err == sql.ErrNoRows {
		// fmt.Println(err)
		return nil, sql.ErrNoRows
	} else if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}

	data := make(map[string]interface{})
	for i, x := range dest {
		scanValue := x
		scanType := reflect.TypeOf(scanValue)
		if scanType.Kind() == reflect.Slice {
			data[varStruct[i]] = string(scanValue.([]byte))
		} else {
			data[varStruct[i]] = x
		}
	}

	return data, nil
}

func GetTotalFromDB(query string) (int, error) {
	var total int
	var err error
	con, err := db.DbConnection()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	defer stmt.Close()
	err = stmt.QueryRow().Scan(&total)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return 0, err
	}
	return total, nil
}

//func SelectJoin() (any, error) {
//
//}
