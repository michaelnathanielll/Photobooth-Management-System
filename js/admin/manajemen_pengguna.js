async function getPengguna() {
    const response = await fetchAPI('/petugas?tipe=1', 'GET');
    console.log(response);
    const tab = document.querySelector("#tabel-user tbody");
    response.data.forEach(e => {
        let status;
        let idStatus;
        let stlyeBlok;
        if (e.status_akun === 1) {
            status = "aktif";
            idStatus = 2;
            stlyeBlok = "success";
        } else {
            status = "nonaktif";
            idStatus = 1;
            stlyeBlok = "secondary";
        }
        // <td>${e.keahlian}</td>
        tab.innerHTML += ` <tr data-status="${status}">
                    <td>${e.username}</td>
                    <td>${e.nama}</td>
                    <td><span class="badge bg-${stlyeBlok}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
                    <td>
                        <button class="aksi-btn btn-edit" data-bs-toggle="modal" data-bs-target="#modalUbah"
                        onclick="openUpdate('${e.username}','${e.nama}','${e.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="aksi-btn btn-password" data-bs-toggle="modal" data-bs-target="#modalPassword" 
                        onclick="openUpdatePassword('${e.id}')">
                            <i class="bi bi-key"></i>
                        </button>
                        <button class="aksi-btn btn-nonaktif btn-status" data-bs-toggle="modal"
                            data-bs-target="#modalStatus" onclick="openStatus('${e.id}','${idStatus}')">
                            <i class="bi bi-person-x"></i>
                        </button>
                    </td>
                </tr>`

    });
}

function openUpdate(username, nama, id) {
    setVal("username-ubah", username);
    setVal("nama-ubah", nama);
    setVal("id-ubah", id)
}

function openUpdatePassword(id) {
    setVal("id-password", id)
}

function openStatus(id,status) {
    setVal("id-status", id)
    setVal("status-akun",status)
}

async function inputPengguna() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const nama = document.getElementById("nama-input").value;

    const data = {
        nama: nama,
        username: username,
        password: password,
        tipe: 1
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/petugas', 'POST', data);
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

async function updatePengguna() {
    const username = getVal("username-ubah");
    const nama = getVal("nama-ubah");
    const id = getVal("id-ubah");
    const data = {
        nama: nama,
        username: username,
        id: parseInt(id)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/petugas', 'PUT', data);
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


async function updatePassword() {
    const password = getVal("password");
    const konfirm = getVal("konfirm-password");
    const id = getVal("id-password");
    if (password !== konfirm) {
        alert("password tidak sama");
        return
    }
    const data = {
        password: password,
        id: parseInt(id)
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/petugas', 'PUT', data);
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

async function updateStatus() {
    const status = getVal("status-akun");
    const id = getVal("id-status");
    const data = {
        status_akun: parseInt(status),
        id: parseInt(id)
    }
    console.log(data);


    try {
        // Kirim data ke server
        const response = await fetchAPI('/petugas', 'PUT', data);
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


fetch("../component/sidebar_admin.html")
    .then(res => res.text())
    .then(async html => {

        /* inject sidebar */
        document.getElementById("layout-admin").innerHTML = html;

        /* inject konten */
        document.getElementById("konten-halaman").innerHTML =
            document.getElementById("isi-halaman").innerHTML;

        /* 🔥 cukup 1 baris */
        initSidebar("Manajemen Pengguna");
        await getPengguna();
        /* DataTable */
        new DataTable('#tabel-user', {
            pageLength: 10
        });

        /* Status modal */
        document.querySelectorAll(".btn-status").forEach(btn => {
            btn.addEventListener("click", function () {

                const row = this.closest("tr");
                const status = row.getAttribute("data-status");

                const teks = document.getElementById("teksStatus");
                const icon = document.getElementById("iconStatus");

                if (status === "aktif") {
                    teks.innerHTML = "Nonaktifkan pengguna ini?";
                    icon.innerHTML = '<i class="bi bi-person-x"></i>';
                    icon.style.borderColor = "#e74c3c";
                    icon.style.color = "#e74c3c";
                } else {
                    teks.innerHTML = "Aktifkan kembali pengguna ini?";
                    icon.style.borderColor = "#27ae60";
                    icon.style.color = "#27ae60";
                }

            });
        });

    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));




