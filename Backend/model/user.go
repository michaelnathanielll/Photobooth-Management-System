package model

import (
	"TemplateProject/dbmod"
	"TemplateProject/errorHandle"
	"TemplateProject/jsonHandler"
	"strconv"
	"strings"
)

var mapKeahlian = map[int]string{}

func InsertPengguna(bodyReq string) (Response, error) {
	var res Response
	var obj Pengguna
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["pengguna"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdatePengguna(bodyReq string) (Response, error) {
	var res Response
	var obj Pengguna
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["pengguna"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeletePengguna(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["pengguna"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetPengguna() (Response, error) {
	var res Response
	var obj Pengguna
	var arrObj = []Pengguna{}
	resp, err := dbmod.SelectQuery(obj, table["pengguna"], "deleted_at IS NULL", "nama ASC", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertPetugas(bodyReq string) (Response, error) {
	var res Response
	var obj Petugas
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["petugas"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdatePetugas(bodyReq string) (Response, error) {
	var res Response
	var obj Petugas
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["Petugas"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeletePetugas(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["petugas"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetPetugas() (Response, error) {
	var res Response
	var obj Petugas
	var arrObj = []Petugas{}
	resp, err := dbmod.SelectQuery(obj, table["petugas"], "deleted_at IS NULL", "nama ASC", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	for i, x := range arrObj {
		tmpKeahlian := strings.Split(x.Keahlian, ",")
		for _, y := range tmpKeahlian {
			tmpId, _ := strconv.Atoi(y)
			x.DaftarKeahlian = append(x.DaftarKeahlian, mapKeahlian[tmpId])
		}
		arrObj[i].DaftarKeahlian = x.DaftarKeahlian
	}
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertKlien(bodyReq string) (Response, error) {
	var res Response
	var obj Klien
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["klien"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdateKlien(bodyReq string) (Response, error) {
	var res Response
	var obj Klien
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["klien"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeleteKlien(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["klien"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetKlien() (Response, error) {
	var res Response
	var obj Klien
	var arrObj = []Klien{}
	resp, err := dbmod.SelectQuery(obj, table["klien"], "deleted_at IS NULL", "nama ASC", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertPaket(bodyReq string) (Response, error) {
	var res Response
	var obj Paket
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["paket"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdatePaket(bodyReq string) (Response, error) {
	var res Response
	var obj Paket
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["paket"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeletePaket(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["paket"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetPaket() (Response, error) {
	var res Response
	var obj Paket
	var arrObj = []Paket{}
	resp, err := dbmod.SelectQuery(obj, table["paket"], "deleted_at IS NULL", "nama ASC", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertAset(bodyReq string) (Response, error) {
	var res Response
	var obj Aset
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["aset"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdateAset(bodyReq string) (Response, error) {
	var res Response
	var obj Aset
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["aset"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeleteAset(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["aset"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetAset(idJenis string) (Response, error) {
	var res Response
	var obj Aset
	var arrObj = []Aset{}
	where := ""
	if idJenis != "" {
		where = " AND tipe_aset = " + idJenis
	}
	resp, err := dbmod.SelectQuery(obj, table["aset"], "deleted_at IS NULL"+where, "nama ASC", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertProyek(bodyReq string) (Response, error) {
	var res Response
	var obj Proyek
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["proyek"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdateProyek(bodyReq string) (Response, error) {
	var res Response
	var obj Proyek
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdateRow(obj, table["proyek"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeleteProyek(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["proyek"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetProyek(req ReqFormValue) (Response, error) {
	var res Response
	var obj DaftarProyek
	var arrObj = []DaftarProyek{}
	namaTab := table["proyek"]
	jenisTab := table["jenis_proyek"]
	statusTab := table["status_proyek"]
	join := namaTab + " JOIN " + jenisTab + " j ON " + namaTab + ".id_jenis_proyek = j.id"
	join += " JOIN " + statusTab + " s ON " + namaTab + ".id_status_proyek = s.id"
	where := namaTab + ".deleted_at IS NULL "
	if req.TanggalAwal != "" && req.TanggalAkhir != "" {
		where += " AND " + namaTab + ".tanggal_event BETWEEN " + req.TanggalAwal + " AND " + req.TanggalAkhir
	}
	if req.Jenis != "" {
		where += " AND " + namaTab + ".id_jenis_proyek = " + req.Jenis
	}
	if req.Status != "" {
		where += " AND " + namaTab + ".status = " + req.Status
	}
	if req.Tipe != "" {
		where += " AND " + namaTab + ".tipe_event = " + req.Tipe
	}
	resp, err := dbmod.SelectQueryJoin(obj, namaTab, where, namaTab+".tanggal_event DESC", "", "", join)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func GetProyekById(id string) (Response, error) {
	var res Response
	var obj Proyek
	namaTab := table["proyek"]
	jenisTab := table["jenis_proyek"]
	statusTab := table["status_proyek"]
	asetTab := table["aset"]
	klienTab := table["klien"]
	join := namaTab + " JOIN " + jenisTab + " j ON " + namaTab + ".id_jenis_proyek = j.id"
	join += " JOIN " + statusTab + " s ON " + namaTab + ".id_status_proyek = s.id"
	join += " JOIN " + asetTab + " b ON " + namaTab + ".id_booth = b.id"
	join += " JOIN " + asetTab + " p ON " + namaTab + ".id_print = p.id"
	join += " JOIN " + asetTab + " k ON " + namaTab + ".id_kertas = k.id"
	join += " JOIN " + klienTab + " kl ON " + namaTab + ".id_klien = kl.id"
	where := namaTab + ".deleted_at IS NULL AND " + namaTab + ".id = " + id
	resp, err := dbmod.SelectQueryRowJoin(obj, namaTab, join, where)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringV1(resp.(map[string]interface{}), &obj)
	res = ResponseGet()
	res.Data = obj
	return res, nil
}

func GetProyekByIdPetugas(id string) (Response, error) {
	var res Response
	var obj DaftarProyek
	var arrObj = []DaftarProyek{}
	namaTab := table["pendaftaran"]
	jenisTab := table["jenis_proyek"]
	statusTab := table["status_proyek"]
	proyekTab := table["proyek"]
	join := namaTab + " JOIN " + proyekTab + " p ON " + namaTab + ".id_proyek = p.id"
	join += " JOIN " + statusTab + " s ON p.id_status_proyek = s.id"
	join += " JOIN " + jenisTab + " j ON p.id_jenis_proyek = j.id"

	where := namaTab + ".deleted_at IS NULL AND " + namaTab + ".id_petugas = " + id
	resp, err := dbmod.SelectQueryJoin(obj, namaTab, where, namaTab+".id DESC", "", "", join)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func GetAnggotaProyek(id string) (Response, error) {
	var res Response
	var obj AnggotaProyek
	var arrObj = []AnggotaProyek{}
	namaTab := table["pendaftaran"]
	petugasTab := table["petugas"]
	statusTab := table["status_pendaftaran"]
	keahlianTab := table["keahlian"]
	proyekTab := table["proyek"]
	join := namaTab + " JOIN " + petugasTab + " p ON " + namaTab + ".id_petugas = p.id"
	join += " JOIN " + statusTab + " s ON " + namaTab + ".status_pendaftaran = s.id"
	join += " JOIN " + keahlianTab + " b ON " + namaTab + ".bagian = b.id"
	join += " JOIN " + proyekTab + " pr ON " + namaTab + ".id_proyek = pr.id"
	where := namaTab + ".deleted_at IS NULL AND " + namaTab + ".id_proyek = " + id
	resp, err := dbmod.SelectQueryJoin(obj, namaTab, where, "", "", "", join)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func InsertAnggotaProyek(bodyReq string) (Response, error) {
	var res Response
	var obj PendaftaranProyek
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["pendaftaran"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func UpdateAnggotaProyek(bodyReq string) (Response, error) {
	var res Response
	var obj PendaftaranProyek
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.UpdatedRowAtTime(obj, table["pendaftaran"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func DeleteAnggotaProyek(id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table["pendaftaran"], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func Get2Variable(namaTab string) (Response, error) {
	var res Response
	var obj Tabel2Variable
	var arrObj = []Tabel2Variable{}
	resp, err := dbmod.SelectQuery(obj, table[namaTab], "deleted_at IS NULL", "", "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}

func Insert2Variable(namaTab string, nama string) (Response, error) {
	var res Response
	var obj Tabel2Variable
	obj.Nama = nama
	_, err := dbmod.InsertRow(obj, table[namaTab])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = obj
	return res, nil
}

func Update2Variable(namaTab string, nama, id string) (Response, error) {
	var res Response
	var obj Tabel2Variable
	obj.Id, _ = strconv.Atoi(id)
	obj.Nama = nama
	_, err := dbmod.UpdatedRowAtTime(obj, table[namaTab])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = obj
	return res, nil
}

func Delete2Variable(namaTab string, id string) (Response, error) {
	var res Response
	err := dbmod.DeletedAtTime(table[namaTab], id)
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = id
	return res, nil
}

func InsertPenilaian(bodyReq string) (Response, error) {
	var res Response
	var obj InsertPenilaianPetugas
	jsonHandler.DecodeJson(bodyReq, &obj)
	_, err := dbmod.InsertRow(obj, table["penilaian"])
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	res = ResponseGet()
	res.Data = "berhasil"
	return res, nil
}

func GetScoreByIdPetugas(id string) (Response, error) {
	var res Response
	var obj PenilaianPetugas
	var arrObj = []PenilaianPetugas{}
	query := `SELECT 
    pp.nama,
    AVG(nilai) AS rata_rata
	FROM penilaian p JOIN parameter_penilaian pp ON p.id_penilaian = pp.id 
	WHERE p.id_petugas = ` + id + `
	GROUP BY p.penilian`

	resp, err := dbmod.SelectQueryCustom(obj, query, "", "")
	if err != nil {
		err = errorHandle.ErrorLine(err)
		res = ResponseError(err)
		return res, err
	}
	DecodeMapStringArray(resp.([]map[string]interface{}), &arrObj)
	res = ResponseGet()
	res.Data = arrObj
	return res, nil
}
