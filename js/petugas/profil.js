const scoreData = [

];
let passLama = "";
const summaryEl = document.getElementById("scoreSummary");
fetch("../component/navbar_petugas.html")
    .then(r => r.text())
    .then(async html => {
        await loadProfil();
        document.getElementById("navbar-petugas").innerHTML = html;
        document.getElementById("navbarTitle").innerText = "Profil Petugas";
    });

function openModal(id) { document.getElementById(id).style.display = "flex"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

async function loadProfil() {
    const token = localStorage.getItem('id_user');
    const response = await fetchAPI('/petugas/' + token, 'GET');
    const data = response.data[0];
    console.log(data);
    setValInner("nama", data.nama);
    setVal("nama-ubah",data.nama);
    setVal("no-hp-ubah",data.no_hp);
    setValInner("no-hp", data.no_hp);
    passLama = data.password;
    let kepeg = "";
    if (data.kepagawaian == 1) {
        kepeg = "Junior";
    } else {
        kepeg = "Senior"
    }
    setValInner("kepeg", kepeg);
    setValInner("honor", data.honor.toLocaleString("ID-id"));
    data.daftar_keahlian.forEach(e => {
        let tmp = `<span class="badge">${e.nama}</span>`
        setValInner("keahlian", tmp)
    });
    let total = 0;
    data.detail_skor.forEach(e => {
        let tmp = `<div class="summary-item"><span>${e.parameter}</span><b>${e.nilai}</b></div>`
        setValInner("scoreSummary", tmp)
        total += e.nilai;
    });
    setValInner("scoreSummary", `<div class="summary-item summary-total"><span>Total Skor Rata-rata</span><b>${total}</b></div>`)
    const responses = await fetchAPI('/proyek/petugas/skor', 'GET');
    const skor = responses.data;
    // console.log(skor);
    const scoreListEl = document.getElementById("scoreList");
    skor.forEach(sc => {
        let toolTips = "";
        let total = 0;
        sc.penilaian.forEach(p => {
            toolTips += ` <div class="tooltip-row"><b>${p.nama}</b> ${p.nilai}</div>`
            total += p.nilai;
        });

        const div = document.createElement("div");
        div.className = "score-item";
        div.innerHTML = `
        <span>${sc.nama}</span>
        <b>${total}</b>

        <div class="score-tooltip">
            ${toolTips}
        </div>
    `;
        scoreListEl.appendChild(div);
    });

}



async function updatePengguna() {
    const no_hp = getVal("no-hp-ubah");
    const nama = getVal("nama-ubah");
    const id = localStorage.getItem('id_user');
    const data = {
        nama: nama,
        no_hp: no_hp,
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
    const passLamaInput = getVal("passLama");
    const password = getVal("passBaru");
    const konfirm = getVal("konfirPass");
    const id =localStorage.getItem('id_user');
    if (passLamaInput !== passLama) {
        alert("password tidak sama dengan yang lama");
        return
    }
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