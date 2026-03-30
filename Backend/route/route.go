package route

import (
	controler "TemplateProject/controler"
	JWTMiddleware "TemplateProject/middleware"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
	e.GET("/getPhoto", controler.GetFoto)
	e.POST("/uploadFoto", controler.UploadFoto)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "welcome here")
	})
	v2 := e.Group("/photobooth/api/v1")
	v2.POST("/login", controler.Login)

	v1 := e.Group("/photobooth/api/v1")
	v1.Use(JWTMiddleware.JWTMiddleware)

	v1.POST("/pengguna", controler.InsertPengguna)
	v1.PUT("/pengguna", controler.UpdatePengguna)
	v1.GET("/pengguna", controler.GetPengguna)
	v1.DELETE("/pengguna/:id", controler.DeletePengguna)

	v1.POST("/petugas", controler.InsertPetugas)
	v1.PUT("/petugas", controler.UpdatePetugas)
	v1.GET("/petugas", controler.GetPetugas)
	v1.GET("/petugas/proyek",controler.GetProyekPendaftaran)
	v1.DELETE("/petugas/:id", controler.DeletePetugas)

	v1.POST("/klien", controler.InsertKlien)
	v1.PUT("/klien", controler.UpdateKlien)
	v1.GET("/klien", controler.GetKlien)
	v1.DELETE("/klien/:id", controler.DeleteKlien)

	v1.POST("/aset", controler.InsertAset)
	v1.PUT("/aset", controler.UpdateAset)
	v1.GET("/aset", controler.GetAset)
	v1.DELETE("/aset/:id", controler.DeleteAset)

	v1.POST("/paket", controler.InsertPaket)
	v1.PUT("/paket", controler.UpdatePaket)
	v1.GET("/paket", controler.GetPaket)
	v1.DELETE("/paket/:id", controler.DeletePaket)

	v1.POST("/proyek", controler.InsertProyek)
	v1.PUT("/proyek", controler.UpdateProyek)
	v1.GET("/proyek", controler.GetProyek)
	v1.DELETE("/proyek/:id", controler.DeleteProyek)
	v1.GET("/proyek/petugas/:id", controler.GetProyekByIdPetugas)
	v1.GET("/proyek/:id", controler.GetProyekById)
	
	v1.GET("/proyek/anggota/:id", controler.GetAnggotaProyek)
	v1.POST("/proyek/anggota", controler.InsertAnggotaProyek)
	v1.POST("/proyek/anggota/daftar", controler.DaftarProyek)
	v1.PUT("/proyek/anggota", controler.UpdateAnggotaProyek)
	v1.DELETE("/proyek/anggota/:id", controler.DeleteAnggotaProyek)

	v1.GET("/variable/:nama", controler.Get2Variable)
	v1.POST("/variable/:nama", controler.Insert2Variable)
	v1.PUT("/variable/:nama", controler.Update2Variable)
	v1.DELETE("/variable/:nama", controler.Delete2Variable)

	v1.POST("/penilaian", controler.InsertPenilaian)
	v1.GET("/penilaian/:id", controler.GetScoreByIdPetugas)

	return e
}
