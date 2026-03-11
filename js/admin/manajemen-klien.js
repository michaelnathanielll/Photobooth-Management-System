let dataTableId;
let dataKlien = [];
const jadwalData = [
    { id: 1, nama: "Wedding Expo Jakarta", tanggal: "2026-02-10", waktu_mulai: "10:00", waktu_selesai: "20:00", lokasi: "JCC Senayan", status: "pendaftaran" },
    { id: 2, nama: "Corporate Gathering Bandung", tanggal: "2026-03-05", waktu_mulai: "18:00", waktu_selesai: "22:00", lokasi: "Bandung Ballroom", status: "berlangsung" },
    { id: 3, nama: "Birthday Party Aurel", tanggal: "2026-01-28", waktu_mulai: "15:00", waktu_selesai: "19:00", lokasi: "Jakarta Selatan", status: "berlangsung" },
    { id: 4, nama: "Private Event Bali", tanggal: "2026-02-15", waktu_mulai: "16:00", waktu_selesai: "23:00", lokasi: "Bali Resort", status: "selesai" }
];


async function loadKlien() {
    try {

        const response = await fetchAPI('/klien', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }

        const tbody = document.querySelector("#tabel-klien tbody");

        tbody.innerHTML = "";

        data.forEach((klien, index) => {

            const row = `
            <tr>
                <td>${klien.nama}</td>
                <td>${klien.kontak}</td>
                <td>${klien.alamat}</td>
                <td>
                    <button class="aksi-btn btn-detail"
                        onclick="openDetail('${klien.nama}','${klien.kontak}','${klien.alamat}')"
                        data-bs-toggle="modal" data-bs-target="#modalDetail">
                        <i class="bi bi-eye"></i>
                    </button>

                    <button class="aksi-btn btn-edit"
                        onclick="openUpdate('${klien.id}','${klien.nama}','${klien.kontak}','${klien.alamat}')"
                        data-bs-toggle="modal" data-bs-target="#modalUbah">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="aksi-btn btn-hapus"
                        onclick="openDelete('${klien.id}')"
                        data-bs-toggle="modal" data-bs-target="#modalHapus">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;

            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {

    fetch("../component/sidebar_admin.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("layout-admin").innerHTML = html;
            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            initSidebar("Manajemen Klien");



        })
        .catch(err => console.error("Sidebar gagal dimuat:", err));

    // const tbody = document.querySelector("#tabel-klien tbody");

    console.log("Memuat data klien...");

    await loadKlien();
    // DataTables dibuat setelah tabel terisi


    if (dataTableId) {
        dataTableId.destroy();
    }

    dataTableId = new DataTable('#tabel-klien', {
        pageLength: 10,
        language: {
            search: "Cari:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
            paginate: {
                next: "Berikutnya",
                previous: "Sebelumnya"
            }
        }
    });

    // console.log("Buat Tabel");
});

function openUpdate(id, nama, kontak, alamat) {
    document.getElementById("nama-ubah").value = nama;
    document.getElementById("kontak-ubah").value = kontak;
    document.getElementById("alamat-ubah").value = alamat;
    document.getElementById("id-ubah").value = id;
}

function openDelete(id) {
    document.getElementById("id-hapus").value = id;
}


function openDetail(nama, kontak, alamat) {
    document.getElementById("detailNama").innerHTML = "<b>Nama:</b> " + nama;
    document.getElementById("detailKontak").innerHTML = "<b>Kontak:</b> " + kontak;
    document.getElementById("detailAlamat").innerHTML = "<b>Alamat:</b> " + alamat;

    const tbody = document.getElementById("tbodyAcara");
    tbody.innerHTML = "";

    jadwalData.forEach(ev => {
        const row = `
                <tr>
                    <td>${ev.nama}</td>
                    <td>${ev.tanggal}</td>
                    <td>${ev.waktu_mulai} - ${ev.waktu_selesai}</td>
                    <td>${ev.lokasi}</td>
                    <td>${ev.status}</td>
                </tr>
            `;
        tbody.innerHTML += row;
    });
}

async function inputKlien() {
    const nama = document.getElementById("nama-tambah").value;
    const kontak = document.getElementById("kontak-tambah").value;
    const alamat = document.getElementById("alamat-tambah").value;

    const data = {
        nama: nama,
        kontak: kontak,
        alamat: alamat
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/klien', 'POST', data);
        console.log(response)
        // Cek apakah berhasil
        if (response && response.status === 200) {
            alert('Data berhasil ditambahkan!');
            location.reload();
        } else {
            console.error('Kesalahan pada status respons:', response.status);
            alert('Terjadi kesalahan saat mengirim data.');
        }

    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Terjadi kesalahan saat mengirim data.');
    }

}


async function updateKlien() {
    const nama = document.getElementById("nama-ubah").value;
    const kontak = document.getElementById("kontak-ubah").value;
    const alamat = document.getElementById("alamat-ubah").value;
    const id = document.getElementById("id-ubah").value;
    const data = {
        nama: nama,
        kontak: kontak,
        alamat: alamat,
        id: parseInt(id)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/klien', 'PUT', data);
        console.log(response)
        // Cek apakah berhasil
        if (response && response.status === 200) {
            alert('Data berhasil diubah!');
            location.reload();
        } else {
            console.error('Kesalahan pada status respons:', response.status);
            alert('Terjadi kesalahan saat mengirim data.');
        }

    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Terjadi kesalahan saat mengirim data.');
    }

}


async function deleteKlien() {
    const id = document.getElementById("id-hapus").value;

    try {
        // Kirim data ke server
        const response = await fetchAPI('/klien/'+id, 'DELETE');
        console.log(response)
        // Cek apakah berhasil
        if (response && response.status === 200) {
            alert('Data berhasil dihapus!');
            location.reload();
        } else {
            console.error('Kesalahan pada status respons:', response.status);
            alert('Terjadi kesalahan saat mengirim data.');
        }

    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Terjadi kesalahan saat mengirim data.');
    }

}