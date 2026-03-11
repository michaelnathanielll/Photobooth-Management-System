let paketData = [];

let table;

function rupiah(n) {
    return "Rp " + Number(n).toLocaleString("id-ID");
}

function renderTable() {
    table.clear();

    paketData.forEach((p, i) => {
        table.row.add([
            p.nama,
            rupiah(p.harga),
            `
                    <button class="aksi-btn btn-edit"
                        onclick="openUpdate(${p.id},'${p.nama}','${p.harga}')"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUbah">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="aksi-btn btn-hapus"
                        onclick="openDelete(${p.id})"
                        data-bs-toggle="modal"
                        data-bs-target="#modalHapus">
                        <i class="bi bi-trash"></i>
                    </button>
                    `
        ]);
    });

    table.draw();
}


async function loadPaket() {
    try {

        const response = await fetchAPI('/paket', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        paketData = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadPaket();
     fetch("../component/sidebar_admin.html")
            .then(r => r.text())
            .then(html => {

                document.getElementById("layout-admin").innerHTML = html;

                document.getElementById("konten-halaman").innerHTML =
                    document.getElementById("isi-halaman").innerHTML;

                initSidebar("Master Paket");

                table = new DataTable('#tabel-paket', { pageLength: 10 });

                renderTable();
            });

});

function openUpdate(id, nama, harga) {
    document.getElementById("nama-ubah").value = nama;
    document.getElementById("harga-ubah").value = harga;
    document.getElementById("id-ubah").value = id;
}

function openDelete(id) {
    document.getElementById("id-hapus").value = id;
}


async function inputPaket() {
    const nama = document.getElementById("nama-tambah").value;
    const harga = document.getElementById("harga-tambah").value;
    const data = {
        nama: nama,
        harga: parseInt(harga)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/paket', 'POST', data);
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


async function updatePaket() {
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
        const response = await fetchAPI('/paket', 'PUT', data);
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


async function deletePaket() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/paket/' + id, 'DELETE');
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