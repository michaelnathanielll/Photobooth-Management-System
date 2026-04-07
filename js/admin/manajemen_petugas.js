let daftarKeahlian = [];
let daftarHonor = [];
let dataPetugas = [];
async function getPetugas() {
    const response = await fetchAPI('/petugas?tipe=0', 'GET');
    dataPetugas = response.data;
    console.log(response);
    const tab = document.querySelector("#tabel-petugas tbody");
    response.data.forEach(e => {
        let status;
        let idStatus;
        let stlyeBlok;
        let kepeg;
        let honor = parseInt(e.honor).toLocaleString("id-ID");
        let keahlian="";
         if (Array.isArray(e.daftar_keahlian)) {
            e.daftar_keahlian.forEach(r=>{
                keahlian += r.nama;
                keahlian+=", ";
            });
            keahlian = keahlian.slice(0,keahlian.length-2);
        }
        if (e.kepagawaian === 1) {
            kepeg = "Junior";
        } else if (e.kepagawaian === 2) {
            kepeg = "Senior";
        } else {
            kepeg = "";
        }
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
                    <td>${e.nama}</td>
                   
                    <td>${e.no_hp}</td>
                    
                    <td>${kepeg}</td>
                    <td>${keahlian}</td>
                    <td>Rp ${honor}</td>
                    
                    <td>${e.skor}/400</td>
                    <td><span class="badge bg-${stlyeBlok}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
                     <td>
                        <button class="aksi-btn btn-detail"
                            onclick="openDetail('${e.id}','${kepeg}','${keahlian}','${honor}')"
                            data-bs-toggle="modal" data-bs-target="#modalDetail">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="aksi-btn btn-edit" data-bs-toggle="modal" data-bs-target="#modalUbah" onclick="openUpdate('${e.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="aksi-btn btn-password" data-bs-toggle="modal" data-bs-target="#modalPassword" 
                        onclick="openUpdatePassword('${e.id}')">
                            <i class="bi bi-key"></i></button>
                        <button class="aksi-btn btn-nonaktif btn-status" data-bs-toggle="modal"
                            data-bs-target="#modalStatus"
                            onclick="openStatus('${e.id}','${idStatus}')">
                            <i class="bi bi-person-x"></i>
                        </button>
                    </td>
                </tr>`

    });
}

async function openDetail(id,kepeg,keahlian,honor) {
   const s = dataPetugas.find(e => e.id === parseInt(id));
    document.getElementById("dNama").innerHTML = "<b>Nama:</b> " + s.nama;
    document.getElementById("dUsername").innerHTML = "<b>Username:</b> " + s.username;
    document.getElementById("dHP").innerHTML = "<b>No HP:</b> " + s.no_hp;
    document.getElementById("dStatus").innerHTML = "<b>Status Kepegawaian:</b> " + kepeg;
    document.getElementById("dKeahlian").innerHTML = "<b>Keahlian:</b> " + keahlian;
    document.getElementById("dHonor").innerHTML = "<b>Honor:</b>  Rp " +honor;
   
   
    const response = await fetchAPI('/proyek/petugas/'+s.id, 'GET');
    console.log(response)
    const tbody = document.getElementById("tbodyAcara");
    tbody.innerHTML = "";
    response.data.forEach(ev => {
        tbody.innerHTML += `
        <tr>
            <td>${ev.nama}</td>
            <td>${ev.tanggal_event}</td>
            <td>${ev.waktu_mulai} - ${ev.waktu_selesai}</td>
            <td>${ev.lokasi}</td>
            <td>${ev.status_proyek}</td>
        </tr>`;
    });
    let count = 1;
    const detailKerja = document.getElementById("detail-kerja");
    detailKerja.innerHTML = "";
    let totalSkor = 0;
    s.detail_skor.forEach(e =>{
        detailKerja.innerHTML += `<div id="sk${count}">${e.parameter}: ${e.nilai} / 400 </div>`
        totalSkor += e.nilai;
    });
    detailKerja.innerHTML +=`<div id="skTotal" style="margin-top:8px;font-weight:bold;"><b>Total: ${totalSkor} / 400</b></div>`
    

}

async function loadKeahlian() {
     const response = await fetchAPI('/variable/keahlian', 'GET');
     console.log(response);
     daftarKeahlian = response.data;
     const keahlianDiv = document.getElementById("keahlian-input");
      keahlianDiv.innerHTML ="";
    daftarKeahlian.forEach(e =>{
     keahlianDiv.innerHTML+=`<div><input type="checkbox" value="${e.id}" > ${e.nama}</div>`;
        });
}

async function loadHonor() {
     const response = await fetchAPI('/variable/honor', 'GET');
     console.log(response);
     daftarHonor = response.data;
     const selectHonor = document.getElementById("honor-update");
     const selectHonorInput = document.getElementById("honor-input");
     daftarHonor.forEach(e => {
        selectHonor.innerHTML+= `<option value='${e.id}'>${parseInt(e.nama).toLocaleString("id-ID")}</option>`  
    selectHonorInput.innerHTML+= `<option value='${e.id}'>${parseInt(e.nama).toLocaleString("id-ID")}</option>`  
    });
}

function openUpdate(id){
    const tmp = dataPetugas.filter(e => e.id === parseInt(id));
    const s = tmp[0];
    setVal("id-update", id);
    setVal("nama-update", s.nama);
    setVal("nomor-update",s.no_hp);
    setVal("nomor-update",s.no_hp);
    setVal("honor-update",s.id_honor);
    const keahlianDiv = document.getElementById("update-keahlian");
     keahlianDiv.innerHTML ="";
    daftarKeahlian.forEach(e =>{
        let cek = "";
       
        if (Array.isArray(s.daftar_keahlian)){ 
            if (s.daftar_keahlian.some(f => f.id === e.id)) {
        cek = "checked";
        }
        }
        keahlianDiv.innerHTML+=`<div><input type="checkbox" ${cek} value="${e.id}" > ${e.nama}</div>`;
    });
}



async function updatePengguna() {
    const no_hp = getVal("nomor-update");
    const nama = getVal("nama-update");
    const kepeg = getVal("kepeg-update");
    const honor = getVal("honor-update");
    let keahlian ="";
    const checked = document.querySelectorAll('#update-keahlian input[type="checkbox"]:checked');
   checked.forEach(e => {
   keahlian+=e.value+",";
    });
    keahlian = keahlian.slice(0,keahlian.length-1);
    const id = getVal("id-update");
    const data = {
        nama: nama,
        no_hp: no_hp,
        kepagawaian: parseInt(kepeg),
        id_honor:parseInt(honor),
        keahlian:keahlian,
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


async function InsertPengguna() {
    console.log("masuk");
    const no_hp = getVal("no_hp-input");
    const nama = getVal("nama-input");
    const kepeg = getVal("kepeg-input");
    const honor = getVal("honor-input");
    const username = getVal("username-input");
    const password = getVal("password-input");
    let keahlian ="";
    const checked = document.querySelectorAll('#keahlian-input input[type="checkbox"]:checked');
   checked.forEach(e => {
   keahlian+=e.value+",";
    });
    keahlian = keahlian.slice(0,keahlian.length-1);
 
    const data = {
        nama: nama,
        no_hp: no_hp,
        kepagawaian: parseInt(kepeg),
        id_honor:parseInt(honor),
        keahlian:keahlian,
        username:username,
        password:password,
        tipe:0,
        status_akun:1
    }

    try {
        // Kirim data ke server
        const response = await fetchAPI('/petugas', 'POST', data);
        console.log(response)
        // Cek apakah berhasil
        if (response && response.status === 200) {
            alert('Data berhasil ditambah!');
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

function openStatus(id,status) {
    setVal("id-status", id)
    setVal("status-akun",status)
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
function openUpdatePassword(id) {
    setVal("id-password", id)
}


fetch("../component/sidebar_admin.html")
    .then(res => res.text())
    .then(async html => {
        await getPetugas();
        await loadKeahlian();
        await loadHonor();
        /* 1. inject layout sidebar */
        document.getElementById("layout-admin").innerHTML = html;

        /* 2. inject konten */
        document.getElementById("konten-halaman").innerHTML =
            document.getElementById("isi-halaman").innerHTML;

        /* 3. init sidebar SETELAH ADA DI DOM */
        initSidebar("Manajemen Petugas");

        /* 4. datatable */
        new DataTable('#tabel-petugas', {
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
    });
