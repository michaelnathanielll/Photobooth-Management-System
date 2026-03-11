package main

import (
	"TemplateProject/route"

	// "crypto/tls"
	"fmt"
	"log"

	// "net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func createFileLog(namFile string) {

	// deteksi apakah file sudah ada
	var _, err = os.Stat(namFile)

	// buat file baru jika belum ada
	if os.IsNotExist(err) {
		file, err := os.Create(namFile)

		if err != nil {
			return
		}
		defer file.Close()
	}

	//fmt.Println("==> file berhasil dibuat", path)
}

func InsertLogs(string2 string) error {

	now := time.Now()
	namaFile := now.Format("20060102")
	ts := now.Format("2006-01-02 15:04:05")
	path := "log/server/" + namaFile + ".txt"
	createFileLog(path)
	format := "<" + ts + ">||" + string2
	f, err := os.OpenFile(path,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
		return err
	}

	defer f.Close()
	//Error:<nil>
	if strings.Contains(format, "Error:<nil>") == false {
		InsertLogsError(format)
	}
	if _, err = f.WriteString(format); err != nil {

		log.Println(err)
		return err
	}

	return nil
}
func InsertLogsError(string2 string) error {

	now := time.Now()
	namaFile := now.Format("20060102")

	path := "log/error/" + namaFile + ".txt"
	createFileLog(path)
	f, err := os.OpenFile(path,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
		return err
	}

	defer f.Close()
	//Error:<nil>
	if _, err = f.WriteString(string2); err != nil {

		log.Println(err)
		return err
	}

	return nil
}

func main() {

	e := route.Init()
	e.HideBanner = true
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		// config...
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			InsertLogs(fmt.Sprintf("{REQUEST: uri:%v,status:%v}", v.URI, v.Status))
			return nil
		},
	}))
	
	go func() {
		// s := http.Server{
		// 	Addr:      ":2682",
		// 	Handler:   e, // set Echo as handler
		// 	TLSConfig: &tls.Config{
		// 		//Certificates: nil, // <-- s.ListenAndServeTLS will populate this field
		// 		// GetCertificate: autoTLSManager.GetCertificate,
		// 		// NextProtos:     []string{acme.ALPNProto},
		// 	},
		// 	//ReadTimeout: 30 * time.Second, // use custom timeouts
		// }
		// if err := s.ListenAndServeTLS("/etc/letsencrypt/live/ppm-rajasorong.com/fullchain.pem", "/etc/letsencrypt/live/ppm-rajasorong.com/privkey.pem"); err != http.ErrServerClosed {
		// 	e.Logger.Fatal(err)
		// }
		log.Println("Service Start...")
		if err := e.Start(":2682"); err != nil {
			log.Fatalf("Echo start error: %v", err)
		}

	}()
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	<-sigChan
	log.Println("Shutting down...")

	time.Sleep(2 * time.Second)
	log.Println("Service stopped")
}
