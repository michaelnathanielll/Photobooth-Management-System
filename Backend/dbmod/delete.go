package dbmod

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"
)

func Delete(table, id string) error {
	con, err := db.DbConnection()

	if err != nil {
		log.Println(err.Error())
		err = errorHandle.ErrorLine(err)
		return err
	}
	defer db.DbClose(con)
	query := ""
	_, err = strconv.Atoi(id)
	if err != nil {
		query = fmt.Sprintf("UPDATE %s SET del =1 WHERE id = '%s'", table, id)
	} else {
		query = fmt.Sprintf("UPDATE %s SET del =1 WHERE id = %s", table, id)
	}
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
func DeleteAtTime(table, id string) error {
	con, err := db.DbConnection()

	if err != nil {
		log.Println(err.Error())
		err = errorHandle.ErrorLine(err)
		return err
	}
	defer db.DbClose(con)
	waktu := time.Now().Format("2006-01-02 15:04:05")
	query := ""
	_, err = strconv.Atoi(id)
	if err != nil {
		query = fmt.Sprintf("UPDATE %s SET delete_at ='%s' WHERE id = '%s'", table, waktu, id)
	} else {
		query = fmt.Sprintf("UPDATE %s SET delete_at ='%s' WHERE id = %s", table, waktu, id)
	}
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

func DeletedAtTime(table, id string) error {
	con, err := db.DbConnection()

	if err != nil {
		log.Println(err.Error())
		err = errorHandle.ErrorLine(err)
		return err
	}
	defer db.DbClose(con)
	waktu := time.Now().Format("2006-01-02 15:04:05")
	query := ""
	_, err = strconv.Atoi(id)
	if err != nil {
		query = fmt.Sprintf("UPDATE %s SET deleted_at ='%s' WHERE id = '%s'", table, waktu, id)
	} else {
		query = fmt.Sprintf("UPDATE %s SET deleted_at ='%s' WHERE id = %s", table, waktu, id)
	}
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

func DeletedAtTimeTx(table, id string, con *sql.Tx) error {

	waktu := time.Now().Format("2006-01-02 15:04:05")
	query := ""
	_, err := strconv.Atoi(id)
	if err != nil {
		query = fmt.Sprintf("UPDATE %s SET deleted_at ='%s' WHERE id = '%s'", table, waktu, id)
	} else {
		query = fmt.Sprintf("UPDATE %s SET deleted_at ='%s' WHERE id = %s", table, waktu, id)
	}
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
