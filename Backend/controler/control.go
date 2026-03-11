package controler

import (
	"TemplateProject/model"
	"net/http"
	"runtime"
	"strconv"

	"github.com/labstack/echo/v4"
)

func namaFungsi() string {
	pc, _, _, _ := runtime.Caller(1)
	fn := runtime.FuncForPC(pc)
	return fn.Name()
}

// func GetFoto(c echo.Context) error {
// 	id := c.FormValue("id")
// 	folder := c.FormValue("folder")
// 	result := model.GetPhoto(folder, id)
// 	ip := c.RealIP()
// 	model.InsertLogError(ip, "GetPhotoFolder", nil)
// 	return c.File(result)
// }

func GetFoto(c echo.Context) error {
	path := c.FormValue("path")
	ip := c.RealIP()
	model.InsertLogError(ip, "GetPhotoFolder", nil)
	return c.File(path)
}

func UploadFoto(c echo.Context) error {
	namaFungsi := namaFungsi()
	folder := c.FormValue("folder")
	ip := c.RealIP()
	id := c.FormValue("id")
	fotoFile, err := c.FormFile("photo")
	nId, _ := strconv.Atoi(id)
	tId := int64(nId)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	result, err := model.UploadFotoFolder(fotoFile, tId, folder)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertPengguna(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertPengguna(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdatePengguna(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdatePengguna(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeletePengguna(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeletePengguna(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetPengguna(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	result, err := model.GetPengguna()
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertPetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertPetugas(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdatePetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdatePetugas(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeletePetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeletePetugas(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetPetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	result, err := model.GetPetugas()
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertKlien(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertKlien(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdateKlien(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdateKlien(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeleteKlien(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeleteKlien(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetKlien(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	result, err := model.GetKlien()
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertAset(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertAset(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdateAset(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdateAset(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeleteAset(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeleteAset(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetAset(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.FormValue("jenis")
	result, err := model.GetAset(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertPaket(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertPaket(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdatePaket(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdatePaket(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeletePaket(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeletePaket(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetPaket(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()

	result, err := model.GetPaket()
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertProyek(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func UpdateProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdateProyek(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func DeleteProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.DeleteProyek(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	req := model.GetFormValue(c)
	result, err := model.GetProyek(req)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
func GetProyekById(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.GetProyekById(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func GetProyekByIdPetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.GetProyekByIdPetugas(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func GetAnggotaProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	id := c.Param("id")
	result, err := model.GetAnggotaProyek(id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertAnggotaProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertAnggotaProyek(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func UpdateAnggotaProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.UpdateAnggotaProyek(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func DeleteAnggotaProyek(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("id")
	result, err := model.DeleteAnggotaProyek(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func Get2Variable(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("nama")
	result, err := model.Get2Variable(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func Insert2Variable(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("nama")
	nama := c.FormValue("nama")
	result, err := model.Insert2Variable(bodyReq, nama)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func Update2Variable(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("nama")
	nama := c.FormValue("nama")
	id := c.FormValue("id")
	result, err := model.Update2Variable(bodyReq, nama, id)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func Delete2Variable(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("nama")
	nama := c.FormValue("id")
	result, err := model.Delete2Variable(bodyReq, nama)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func InsertPenilaian(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq, _ := model.GetBodyReq(c)
	result, err := model.InsertPenilaian(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}

func GetScoreByIdPetugas(c echo.Context) error {
	namaFungsi := namaFungsi()
	ip := c.RealIP()
	bodyReq := c.Param("id")
	result, err := model.GetScoreByIdPetugas(bodyReq)
	if err != nil {
		model.InsertLogError(ip, namaFungsi, err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	model.InsertLogError(ip, namaFungsi, err)
	return c.JSON(http.StatusOK, result)
}
