package dbmod

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
	"database/sql"
	"fmt"
)

func InsertRow(obj any, table string) (int64, error) {
	query, err := createInsert(obj, table)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	fmt.Println(query)
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
	result, err := stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	lastIndx, _ := result.LastInsertId()

	return lastIndx, nil
}

func InsertRowTx(obj any, table string, con *sql.Tx) (int64, error) {
	query, err := createInsert(obj, table)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	fmt.Println(query)
	stmt, err := con.Prepare(query)

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	defer stmt.Close()
	result, err := stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	lastIndx, _ := result.LastInsertId()

	return lastIndx, nil
}
