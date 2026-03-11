package errorHandle

import (
	"errors"
	"log"
	"runtime"
	"strconv"
)

//import "github.com/pkg/errors"

func ErrorLine(err error) error {
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		return errors.New("failed to get caller information")
	}
	err = errors.New(err.Error() + "\n " + " at " + file + ":" + strconv.Itoa(line))
	log.Println(err)
	return err
}
