package dbmod

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
	"database/sql"
	"fmt"
	"time"
)

func UpdateRow(obj any, table string) (any, error) {
	query, err := createUpdate(obj, table)
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
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	return obj, nil
}

func UpdateRowAtTime(obj any, table string) (any, error) {
	query, err := createUpdateAtTime(obj, table)
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
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	return obj, nil
}

func UpdatedRowAtTime(obj any, table string) (any, error) {
	query, err := createUpdatedAtTime(obj, table)
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
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	return obj, nil
}

func UpdatedRowAtTimeTX(obj any, table string, con *sql.Tx) (any, error) {
	query, err := createUpdatedAtTime(obj, table)
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	fmt.Println(query)

	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return 0, err
	}
	return obj, nil
}

func UpdateRowAtTimeCustom(update_col string, where string, table string) error {
	query := "UPDATE " + table + " SET " + update_col + ",updated_at = '" + time.Now().Format("2006-01-02 15:04:05") + "' WHERE " + where
	fmt.Println(query)
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	return nil
}

func UpdateRowAtTimeCustomTx(update_col string, where string, table string, con *sql.Tx) error {
	query := "UPDATE " + table + " SET " + update_col + ",updated_at = '" + time.Now().Format("2006-01-02 15:04:05") + "' WHERE " + where
	fmt.Println(query)
	stmt, err := con.Prepare(query)
	defer stmt.Close()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	return nil
}

func UpdateRowCustom(update_col string, where string, table string) error {
	query := "UPDATE " + table + " SET " + update_col + " WHERE " + where
	// fmt.Println(query)
	con, err := db.DbConnection()

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	defer db.DbClose(con)
	stmt, err := con.Prepare(query)

	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec()
	if err != nil {
		err = errorHandle.ErrorLine(err)

		return err
	}
	return nil
}
