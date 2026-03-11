let dataLokasi = [];

let table;

function renderTable() {
    table.clear();

    dataLokasi.forEach((d, i) => {
        table.row.add([
            d.nama,
            `
                    <button class="aksi-btn btn-edit"
                        onclick="openUpdate(${d.id},'${d.nama}')"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUbah">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="aksi-btn btn-hapus"
                        onclick="openDelete(${d.id})"
                        data-bs-toggle="modal"
                        data-bs-target="#modalHapus">
                        <i class="bi bi-trash"></i>
                    </button>
                    `
        ]);
    });

    table.draw();
}

async function loadLokasi() {
    try {

        const response = await fetchAPI('/variable/lokasi', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        dataLokasi = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadLokasi();

    /* ================= LOAD SIDEBAR ================= */

    fetch("../component/sidebar_admin.html")
        .then(r => r.text())
        .then(html => {

            document.getElementById("layout-admin").innerHTML = html;

            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            // 🔥 otomatis toggle + active
            initSidebar("Master Lokasi");

            table = new DataTable('#tabel-lokasi', {
                pageLength: 10
            });

            renderTable();
        });
});

function openUpdate(id, nama) {
    document.getElementById("nama-ubah").value = nama;

    document.getElementById("id-ubah").value = id;
}

function openDelete(id) {
    document.getElementById("id-hapus").value = id;
}


async function inputLokasi() {
    const nama = document.getElementById("nama-tambah").value;

    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/lokasi?nama=' + nama, 'POST');
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


async function updateLokasi() {
    const nama = document.getElementById("nama-ubah").value;
    const id = document.getElementById("id-ubah").value;


    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/lokasi?nama=' + nama + '&id=' + id, 'PUT');
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


async function deleteLokasi() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/lokasi?id=' + id, 'DELETE');
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