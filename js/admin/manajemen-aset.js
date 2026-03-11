let boothData = [];

let kertasData = [];

let baseData = [];

function formatRupiah(num) {
    return "Rp " + num.toLocaleString("id-ID");
}

function renderTable(id, data) {
    const table = $(id).DataTable();
    table.clear();
    data.forEach(d => {
        table.row.add([
            d.nama,
            formatRupiah(d.harga),
            `
                <button class="aksi-btn btn-edit" data-bs-toggle="modal" data-bs-target="#modalUbah" onclick="openUpdate('${d.id}','${d.nama}',${d.harga})"><i class="bi bi-pencil"></i></button>
                <button class="aksi-btn btn-hapus" data-bs-toggle="modal" data-bs-target="#modalHapus" onclick="openDelete('${d.id}')"><i class="bi bi-trash"></i></button>
                `
        ]);
    });
    table.draw();
}

async function loadBooth() {
    try {

        const response = await fetchAPI('/aset?jenis=1', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        boothData = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}
async function loadKertas() {
    try {

        const response = await fetchAPI('/aset?jenis=2', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        kertasData = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function loadBasePrint() {
    try {

        const response = await fetchAPI('/aset?jenis=3', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        baseData = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}
document.addEventListener('DOMContentLoaded', async function () {

    await loadBooth();
    await loadKertas();
    await loadBasePrint();
    fetch("../component/sidebar_admin.html")
        .then(res => res.text())
        .then(html => {

            /* inject layout */
            document.getElementById("layout-admin").innerHTML = html;

            /* inject konten */
            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            /* 🔥 cukup 1 baris ini saja */
            initSidebar("Manajemen Aset");

            /* ================= DATATABLE ================= */

            new DataTable('#tabel-booth', { pageLength: 5 });
            new DataTable('#tabel-kertas', { pageLength: 5 });
            new DataTable('#tabel-base', { pageLength: 5 });

            renderTable('#tabel-booth', boothData);
            renderTable('#tabel-kertas', kertasData);
            renderTable('#tabel-base', baseData);


        })
        .catch(err => console.error("Sidebar gagal dimuat:", err));

});

function openTambah(kategori){
    document.getElementById("kategori-tambah").value = kategori;
}

function openUpdate(id, nama, harga) {
    document.getElementById("nama-ubah").value = nama;
    document.getElementById("harga-ubah").value = harga;
    document.getElementById("id-ubah").value = id;
}

function openDelete(id) {
    document.getElementById("id-hapus").value = id;
}


async function inputAset() {
    const nama = document.getElementById("nama-tambah").value;
    const harga = document.getElementById("harga-tambah").value;
    const kategori = document.getElementById("kategori-tambah").value;

    const data = {
        nama: nama,
        harga: parseInt(harga),
        tipe_aset: parseInt(kategori)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/aset', 'POST', data);
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


async function updateAset() {
    const nama = document.getElementById("nama-ubah").value;
    const harga = document.getElementById("harga-ubah").value;
    const id = document.getElementById("id-ubah").value;
    const data = {
        nama: nama,
        harga: parseInt(harga),
        id: parseInt(id)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/aset', 'PUT', data);
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


async function deleteAset() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/aset/' + id, 'DELETE');
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