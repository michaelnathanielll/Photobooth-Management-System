let honorData = [];
let table;

function rupiah(n) {
    return "Rp " + Number(n).toLocaleString("id-ID");
}

function renderTable() {
    table.clear();

    honorData.forEach((h, i) => {
        table.row.add([
            rupiah(h.nama),
            `
                    <button class="aksi-btn btn-edit"
                        onclick="openUpdate(${h.id},${h.nama})"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUbah">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="aksi-btn btn-hapus"
                        onclick="openDelete(${h.id})"
                        data-bs-toggle="modal"
                        data-bs-target="#modalHapus">
                        <i class="bi bi-trash"></i>
                    </button>
                    `
        ]);
    });

    table.draw();
}



async function loadHonor() {
    try {

        const response = await fetchAPI('/variable/honor', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        honorData = data;

        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadHonor();

    fetch("../component/sidebar_admin.html")
        .then(r => r.text())
        .then(html => {

            document.getElementById("layout-admin").innerHTML = html;

            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            initSidebar("Master Honor");

            table = new DataTable('#tabel-honor', { pageLength: 10 });

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


async function inputHonor() {
    const nama = document.getElementById("nama-tambah").value;

    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/honor?nama=' + nama, 'POST');
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


async function updateHonor() {
    const nama = document.getElementById("nama-ubah").value;
    const id = document.getElementById("id-ubah").value;


    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/honor?nama=' + nama + '&id=' + id, 'PUT');
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


async function deleteHonor() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/variable/honor?id=' + id, 'DELETE');
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