package dbmod

import (
	"TemplateProject/db"
	"TemplateProject/errorHandle"
)

func LockTabel(tabel string) error {
	dbm, err := db.DbConnection()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return err
	}
	query := "LOCK TABLES " + tabel + " WRITE"
	// stmt, err := dbm.Prepare(query)

	// defer stmt.Close()
	_, err = dbm.Exec(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return err
	}
	return nil
	// dbm.Begin()
}

func UnlockTabel() error {
	dbm, err := db.DbConnection()
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return err
	}
	query := "UNLOCK TABLES"
	// stmt, err := dbm.Prepare(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return err
	}
	// defer stmt.Close()
	_, err = dbm.Exec(query)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		return err
	}
	return nil
	// dbm.Begin()
}
