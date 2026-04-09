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

type PetugasLogin struct {
	Id             int      `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string   `json:"nama" db:"nama"`
	Kepagawaian    int      `json:"kepagawaian" db:"kepegawaian"`
	Keahlian       string   `json:"keahlian" db:"keahlian"`
	DaftarKeahlian []string `json:"daftar_keahlian"`
	Honor          int      `json:"honor" db:"honor"`
	StatusAkun     int      `json:"status_akun" db:"status_akun"`
	Username       string   `json:"username" db:"username"`
	Password       string   `json:"password" db:"password"`
	Token          string   `json:"token"`
	Tipe           int      `json:"tipe" db:"tipe"`
}

type Petugas struct {
	Id             int                 `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string              `json:"nama" db:"nama"`
	Kepagawaian    int                 `json:"kepagawaian" db:"kepegawaian"`
	Keahlian       string              `json:"keahlian" db:"keahlian"`
	DaftarKeahlian []Tabel2Variable    `json:"daftar_keahlian"`
	IdHonor        int                 `json:"id_honor" db:"honor"`
	Honor          int                 `json:"honor" db:"nama" type:"join" alias:"h"`
	StatusAkun     int                 `json:"status_akun" db:"status_akun"`
	Username       string              `json:"username" db:"username"`
	Password       string              `json:"password" db:"password"`
	Tipe           int                 `json:"tipe" db:"tipe"`
	NoHp           string              `json:"no_hp" db:"no_hp"`
	Skor           int                 `json:"skor"`
	DetailSkor     []RekapNilaiPetugas `json:"detail_skor"`
}

type RekapNilaiPetugas struct {
	IdPenilaian int     `json:"id_penilaian" db:"id_penilaian"`
	Parameter   string  `json:"parameter" db:"nama" type:"join" alias:"p"`
	Nilai       float64 `json:"nilai" db:"nilai"`
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
	Id    int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama  string `json:"nama" db:"nama"`
	Harga int    `json:"harga" db:"harga"`
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
	RealiasiKertas int    `json:"realisasi_kertas" db:"realisasi_kertas"`
	IdPrint        int    `json:"id_print" db:"id_print"`
	QtyPrint       int    `json:"qty_print" db:"qty_print"`
	RealiasiPrint  int    `json:"realisasi_print" db:"realisasi_print"`
	HargaPrint     int    `json:"harga_print" db:"harga_print"`
	Print          string `json:"print" db:"nama" type:"join" alias:"p"`
	BiayaTambahan  int    `json:"biaya_tambahan" db:"biaya_tambahan"`
	IdStatusProyek int    `json:"id_status_proyek" db:"id_status_proyek"`
	StatusProyek   string `json:"status_proyek" db:"nama" type:"join" alias:"s"`
	IdKlien        int    `json:"id_klien" db:"id_klien"`
	Klien          string `json:"klien" db:"nama" type:"join" alias:"kl"`
	IdLokasi       int    `json:"id_lokasi" db:"id_lokasi"`
	Lokasi         string `json:"lokasi" db:"nama" type:"join" alias:"l"`
	TanggalEvent   string `json:"tanggal_event" db:"tanggal_event" format:"date"`
	IdTipeEvent    int    `json:"id_tipe_event" db:"tipe_event"`
	TipeEvent      string `json:"tipe_event"`
	TotalBiaya     int    `json:"total_biaya" db:"total_biaya"`
	Keterangan     string `json:"keterangan" db:"keterangan"`
	JumlahPetugas  int    `json:"jumlah_petugas" db:"jumlah_petugas"`
	IdPaket        int    `json:"id_paket" db:"id_paket"`
	// Paket string
}

type DaftarProyek struct {
	Id             int    `json:"id" db:"id" type:"pk" act:"ai"`
	Nama           string `json:"nama" db:"nama"`
	WaktuMulai     string `json:"waktu_mulai" db:"waktu_mulai" format:"time"`
	WaktuSelesai   string `json:"waktu_selesai" db:"waktu_selesai" format:"time"`
	TanggalEvent   string `json:"tanggal_event" db:"tanggal_event" format:"date"`
	IdJenisProyek  int    `json:"id_jenis_proyek" db:"id_jenis_proyek"`
	JenisProyek    string `json:"jenis_proyek" db:"nama" type:"join" alias:"j"`
	IdLokasi       int    `json:"id_lokasi" db:"id_lokasi"`
	Lokasi         string `json:"lokasi" db:"nama" type:"join" alias:"l"`
	IdStatusProyek int    `json:"id_status_proyek" db:"id_status_proyek"`
	StatusProyek   string `json:"status_proyek" db:"nama" type:"join" alias:"s"`
	Booth          string `json:"booth" db:"nama" type:"join" alias:"b"`
	Print          string `json:"print" db:"nama" type:"join" alias:"p"`
	Kertas         string `json:"kertas" db:"nama" type:"join" alias:"k"`
	Terdaftar      bool   `json:"terdaftar"`
	IdDaftar       int    `json:"id_daftar"`
	IdStatusDaftar int    `json:"id_status_daftar"`
}

type DaftarProyekPetugas struct {
	IdDaftar            int    `json:"id_daftar" db:"id" type:"pk" act:"ai"`
	Id                  int    `json:"id" db:"id" type:"join" alias:"p"`
	Nama                string `json:"nama" db:"nama" type:"join" alias:"p"`
	WaktuMulai          string `json:"waktu_mulai" db:"waktu_mulai" format:"time" type:"join" alias:"p"`
	WaktuSelesai        string `json:"waktu_selesai" db:"waktu_selesai" format:"time" type:"join" alias:"p"`
	TanggalEvent        string `json:"tanggal_event" db:"tanggal_event" format:"date" type:"join" alias:"p"`
	IdJenisProyek       int    `json:"id_jenis_proyek" db:"id_jenis_proyek" type:"join" alias:"p"`
	JenisProyek         string `json:"jenis_proyek" db:"nama" type:"join" alias:"j"`
	IdLokasi            int    `json:"id_lokasi" db:"id_lokasi" type:"join" alias:"p"`
	Lokasi              string `json:"lokasi" db:"nama" type:"join" alias:"l"`
	IdStatusProyek      int    `json:"id_status_proyek" db:"id_status_proyek" type:"join" alias:"p"`
	StatusProyek        string `json:"status_proyek" db:"nama" type:"join" alias:"s"`
	IdStatusPendaftaran int    `json:"id_status_pendaftaran" db:"status_pendaftaran"`
	Booth               string `json:"booth" db:"nama" type:"join" alias:"b"`
	Print               string `json:"print" db:"nama" type:"join" alias:"pr"`
	Kertas              string `json:"kertas" db:"nama" type:"join" alias:"k"`
	Honor               int    `json:"honor" db:"honor"`
}

type DaftarSkorProyek struct {
	Id        int                       `json:"id"`
	Nama      string                    `json:"nama"`
	Penilaian []PenilaianPetugasAnggota `json:"penilaian"`
}

type PendaftaranProyek struct {
	Id                  int    `json:"id" db:"id" type:"pk" act:"ai"`
	IdPetugas           int    `json:"id_petugas" db:"id_petugas"`
	Petugas             string `json:"petugas" db:"nama" type:"join" alias:"p"`
	IdProyek            int    `json:"id_proyek" db:"id_proyek"`
	Proyek              string `json:"proyek" db:"nama" type:"join" alias:"pr"`
	IdStatusPendaftaran int    `json:"id_status_pendaftaran" db:"status_pendaftaran" `
	StatusPendaftaran   string `json:"status_pendaftaran" db:"nama" type:"join" alias:"s"`
	IdBagian            int    `json:"id_bagian" db:"bagian"`
	Bagian              string `json:"bagian" db:"nama" type:"join" alias:"b"`
	Honor               int    `json:"honor" db:"honor"`
	Skor                int    `json:"skor" db:"skor"`
	SkorDaftar          int    `json:"skor_daftar" db:"skor_daftar"`
	Keterangan          string `json:"keterangan" db:"keterangan"`
	JamHadir            string `json:"jam_hadir" db:"jam_hadir"`
}

type AnggotaProyek struct {
	Id                  int                       `json:"id" db:"id" type:"pk" act:"ai"`
	IdPetugas           int                       `json:"id_petugas" db:"id_petugas"`
	Petugas             string                    `json:"petugas" db:"nama" type:"join" alias:"p"`
	IdProyek            int                       `json:"id_proyek" db:"id_proyek"`
	Proyek              string                    `json:"proyek" db:"nama" type:"join" alias:"pr"`
	IdStatusPendaftaran int                       `json:"id_status_pendaftaran" db:"status_pendaftaran" `
	StatusPendaftaran   string                    `json:"status_pendaftaran" db:"nama" type:"join" alias:"s"`
	IdBagian            int                       `json:"id_bagian" db:"bagian"`
	Bagian              string                    `json:"bagian" db:"nama" type:"join" alias:"b"`
	Kepegawaian         int                       `json:"kepegawaian" db:"kepegawaian" type:"join" alias:"p"`
	Kepeg               string                    `json:"kepeg"`
	NoHp                string                    `json:"no_hp" db:"no_hp" type:"join" alias:"p"`
	Honor               string                    `json:"honor" db:"nama"  type:"join" alias:"h"`
	Keahlian            string                    `json:"keahlian" db:"keahlian" type:"join" alias:"p"`
	Skor                int                       `json:"skor" db:"skor"`
	GA                  int                       `json:"ga"`
	SkorDaftar          int                       `json:"skor_daftar" db:"skor_daftar"`
	Keterangan          string                    `json:"keterangan" db:"keterangan"`
	JamHadir            string                    `json:"jam_hadir" db:"jam_hadir" format:"time" act:"COALESCE" var:"string"`
	Penilaian           []PenilaianPetugasAnggota `json:"penilaian"`
	DaftarKeahlian      []Tabel2Variable          `json:"daftar_keahlian"`
}
type CountSkor struct {
	Total int `json:"total" db:"total"`
}
type PenilaianPetugasAnggota struct {
	Nama  string `json:"nama" db:"nama" type:"join" alias:"p"`
	Nilai int    `json:"nilai" db:"nilai"`
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
type KomposisiTim struct {
	IdKeahlian int    `json:"id_keahlian"`
	Keahlian   string `json:"keahlian"`
	Qty        int    `json:"qty"`
}

type Komposisi struct {
	Id        int    `json:"id" db:"id" type:"pk" act:"ai"`
	Komposisi string `json:"komposisi" db:"komposisi_tim"`
}

type Count2Var struct {
	Id    int `json:"total_pengguna" db:"total_pengguna"`
	Total int `json:"total_petugas" db:"total_petugas"`
}

type CountJumlah struct {
	Total int `json:"total" db:"total"`
}

type CountJumlahPengguna struct {
	TotalPengguna int `json:"total_pengguna"`
	TotalPetugas  int `json:"total_petugas"`
	TotalKlien    int `json:"total_klien"`
}

type CountTipeProyek struct {
	Id    int    `json:"id" db:"id_jenis_proyek"`
	Nama  string `json:"nama" db:"nama"`
	Total int    `json:"total" db:"total"`
}

type CountPendapatanBulan struct {
	Tanggal string `json:"tanggal" db:"nama"`
	Total   int    `json:"total" db:"total"`
}

type ProyekDashboard struct {
	Nama    string `json:"nama" db:"nama"`
	Tanggal string `json:"tanggal" db:"tanggal_event" format:"date"`
}

type RecapProyekDashboard struct {
	Status string            `json:"status"`
	Proyek []ProyekDashboard `json:"proyek"`
}
