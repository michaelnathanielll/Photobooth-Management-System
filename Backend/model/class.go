package model

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type Pengguna struct {
	Id         int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama       string `json:"nama" db:"nama"`
	Role       string `json:"role" db:"role"`
	StatusAkun int    `json:"status_akun" db:"status_akun"`
	Username   string `json:"username" db:"username"`
	Password   string `json:"password" db:"password"`
}

type Petugas struct {
	Id             int      `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string   `json:"nama" db:"nama"`
	Kepagawaian    int      `json:"kepagawaian" db:"kepegawaian"`
	Keahlian       string   `json:"keahlian" db:"keahlian"`
	DaftarKeahlian []string `json:"daftar_keahlian"`
	Honor          int      `json:"honor" db:"honor"`
	StatusAkun     int      `json:"status_akun" db:"status_akun"`
	Username       string   `json:"username" db:"username"`
	Password       string   `json:"password" db:"password"`
}

type Klien struct {
	Id     int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama   string `json:"nama" db:"nama"`
	Kontak string `json:"kontak" db:"kontak"`
	ALamat string `json:"alamat" db:"alamat"`
}

type Aset struct {
	Id       int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama     string `json:"nama" db:"nama"`
	Harga    int    `json:"harga" db:"harga"`
	TipeAset int    `json:"tipe_aset" db:"tipe_aset"`
}


type Paket struct {
	Id       int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama     string `json:"nama" db:"nama"`
	Harga    int    `json:"harga" db:"harga"`
}


type Proyek struct {
	Id             int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string `json:"nama" db:"nama"`
	WaktuMulai     string `json:"waktu_mulai" db:"waktu_mulai" format:"time"`
	WaktuSelesai   string `json:"waktu_selesai" db:"waktu_selesai" format:"time"`
	IdJenisProyek  int    `json:"id_jenis_proyek" db:"id_jenis_proyek"`
	JenisProyek    string `json:"jenis_proyek" db:"nama" type:"join" alias:"j"`
	IdBooth        int    `json:"id_booth" db:"id_booth"`
	Booth          string `json:"booth" db:"nama" type:"join" alias:"b"`
	HargaBooth     int    `json:"harga_booth" db:"harga_booth"`
	IdKertas       int    `json:"id_kertas" db:"id_kertas"`
	QtyKertas      int    `json:"qty_kertas" db:"qty_kertas"`
	Kertas         string `json:"kertas" db:"nama" type:"join" alias:"k"`
	HargaKertas    int    `json:"harga_kertas" db:"harga_kertas"`
	RealiasiKertas int    `json:"realiasi_kertas" db:"realiasi_kertas"`
	IdPrint        int    `json:"id_print" db:"id_print"`
	QtyPrint       int    `json:"qty_print" db:"qty_print"`
	RealiasiPrint  int    `json:"realiasi_print" db:"realiasi_print"`
	HargaPrint     int    `json:"harga_print" db:"harga_print"`
	Print          string `json:"print" db:"nama" type:"join" alias:"p"`
	BiayaTambahan  int    `json:"biaya_tambahan" db:"biaya_tambahan"`
	IdStatusProyek int    `json:"id_status_proyek" db:"id_status_proyek"`
	StatusProyek   string `json:"status_proyek" db:"nama" type:"join" alias:"s"`
	IdKlien        int    `json:"id_klien" db:"id_klien"`
	Klien          string `json:"klien" db:"nama" type:"join" alias:"kl"`
	Lokasi         string `json:"lokasi" db:"lokasi"`
	TanggalEvent   string `json:"tanggal_event" db:"tanggal_event" format:"date"`
	IdTipeEvent    int    `json:"id_tipe_event" db:"tipe_event"`
	TipeEvent      string `json:"tipe_event"`
	TotalBiaya     int    `json:"total_biaya" db:"total_biaya"`
}

type DaftarProyek struct {
	Id             int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string `json:"nama" db:"nama"`
	WaktuMulai     string `json:"waktu_mulai" db:"waktu_mulai" format:"time"`
	WaktuSelesai   string `json:"waktu_selesai" db:"waktu_selesai" format:"time"`
	TanggalEvent   string `json:"tanggal_event" db:"tanggal_event" format:"date"`
	IdJenisProyek  int    `json:"id_jenis_proyek" db:"id_jenis_proyek"`
	JenisProyek    string `json:"jenis_proyek" db:"nama" type:"join" alias:"j"`
	Lokasi         string `json:"lokasi" db:"lokasi"`
	IdStatusProyek int    `json:"id_status_proyek" db:"id_status_proyek"`
	StatusProyek   string `json:"status_proyek" db:"nama" type:"join" alias:"s"`
}

type PendaftaranProyek struct {
	Id                  int    `json:"id" db:"id" type:"pk" act:"ai"`
	IdPetugas           string `json:"id_petugas" db:"id_petugas"`
	Petugas             string `json:"petugas" db:"nama" type:"join" alias:"p"`
	IdProyek            int    `json:"id_proyek" db:"id_proyek"`
	Proyek              string `json:"proyek" db:"nama" type:"join" alias:"pr"`
	IdStatusPendaftaran int    `json:"id_status_pendaftaran" db:"status_pendaftaran" `
	StatusPendaftaran   string `json:"status_pendaftaran" db:"nama" type:"join" alias:"s"`
	IdBagian            int    `json:"id_bagian" db:"bagian"`
	Bagian              string `json:"bagian" db:"nama" type:"join" alias:"b"`
	Honor               int    `json:"honor" db:"honor"`
	Skor                int    `json:"skor" db:"skor"`
	SkorDaftar          int    `json:"skor_daftar" db:"skor_daftar	"`
}

type AnggotaProyek struct {
	Id                  int    `json:"id" db:"id" type:"pk" act:"ai"`
	IdPetugas           string `json:"id_petugas" db:"id_petugas"`
	Petugas             string `json:"petugas" db:"nama" type:"join" alias:"p"`
	IdProyek            int    `json:"id_proyek" db:"id_proyek"`
	Proyek              string `json:"proyek" db:"nama" type:"join" alias:"pr"`
	IdStatusPendaftaran int    `json:"id_status_pendaftaran" db:"status_pendaftaran" `
	StatusPendaftaran   string `json:"status_pendaftaran" db:"nama" type:"join" alias:"s"`
	IdBagian            int    `json:"id_bagian" db:"bagian"`
	Bagian              string `json:"bagian" db:"nama" type:"join" alias:"b"`
	Kepegawaian         int    `json:"kepegawaian" db:"kepegawaian" type:"join" alias:"p"`
	NoHp                int    `json:"no_hp" db:"kepegawaian" type:"join" alias:"p"`
	Honor               int    `json:"honor" db:"honor"`
	Skor                int    `json:"skor" db:"skor"`
}

type Tabel2Variable struct {
	Id   int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama string `json:"nama" db:"nama"`
}

type InsertPenilaianPetugas struct {
	Id          int `json:"id" db:"id" type:"pk" act:"ai"`
	IdPetugas   int `json:"id_petugas" db:"id_petugas"`
	IdProyek    int `json:"id_proyek" db:"id_proyek"`
	IdPenilaian int `json:"id_penilaian" db:"id_penilaian"`
	Nilai       int `json:"nilai" db:"nilai"`
}

type PenilaianPetugas struct {
	Id          int     `json:"id" db:"id" type:"pk" act:"ai"`
	IdParameter int     `json:"id_parameter" db:"id_parameter"`
	Nama        string  `json:"nama" db:"nama" type:"join" alias:"p"`
	Nilai       float64 `json:"nilai" db:"nilai"`
}
