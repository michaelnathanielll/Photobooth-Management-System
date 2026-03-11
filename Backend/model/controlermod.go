package model

import (
	"errors"
	"io"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type ReqFormValue struct {
	Id           string `json:"id"`
	Keyword      string `json:"keyword"`
	Limit        string `json:"limit"`
	Offset       string `json:"offset"`
	Status       string `json:"status"`
	TanggalAwal  string `json:"tanggal_awal"`
	TanggalAkhir string `json:"tanggal_akhir"`
	HPlus        string `json:"h_plus"`
	Jenis        string `json:"jenis"`
	Tipe         string `json:"tipe"`
}

func GetFormValue(c echo.Context) ReqFormValue {
	var obj ReqFormValue
	obj.Id = c.FormValue("id")
	obj.Keyword = c.FormValue("keyword")
	obj.Limit = c.FormValue("limit")
	obj.Offset = c.FormValue("offset")
	obj.Status = c.FormValue("status")
	obj.TanggalAwal = c.FormValue("tanggal_awal")
	obj.TanggalAkhir = c.FormValue("tanggal_akhir")
	obj.HPlus = c.FormValue("h_plus")
	obj.Jenis = c.FormValue("jenis")
	obj.Tipe = c.FormValue("tipe")
	return obj
}

func GetBodyReq(c echo.Context) (string, error) {
	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return "", c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to read body"})
	}
	return string(body), nil
}

func SemicolonChecker(data string) (Response, error) {
	if strings.Contains(data, ";") {
		err := errors.New("Semicolon Found")
		return ResponseError(err), err
	}
	return Response{}, nil
}
