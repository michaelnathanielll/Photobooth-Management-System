let dataPendaftar = [];
let posisiList = [];
   // bobot
    let b = {};
async function loadSetting(){
    const response = await fetchAPI('/setting', 'GET');
        console.log("Response API:", response);
        b = response.data;
}

function normalisasi(value, config) {
    if (!config) return 0;

    if (config.tipe === "benefit") {
        let max = config.max || 100;
        return value / max;
    } else {
        let min = config.min || 1;
        if (value === 0) value = 1;
        return min / value;
    }
}

function tentukanPeran(p) {
    let hasil = posisiList.map(posisi => ({
        posisi,
        skor: hitungSkorWSM(p, posisi)
    }));

    hasil.sort((a, b) => b.skor - a.skor);
    console.log("hasil",hasil);
    if (hasil.length > 0) {
        return {
            skor: hasil[0].skor,
            peran: hasil[0].posisi
        };
    } else {
        return { skor: 0, peran: "" };
    }
}

function hitungSkorWSM(p, posisi) {
    if (!b || Object.keys(b).length === 0) return 0;

    let nilai = p.skor || 0;
    let jumlahPenilaian = p.penilaian?.length || 1;
    nilai = nilai / jumlahPenilaian;

    let jumlahSkill = p.daftar_keahlian?.length || 0;
    let maxSkill = b.skill?.max || 5;
    jumlahSkill = Math.min(jumlahSkill, maxSkill);

    let jabatan = b.jabatan?.mapping?.[p.kepeg] ?? 0;

    let cocok = p.daftar_keahlian?.some(k => k.nama === posisi);
    let skorPosisi = cocok ? 100 : 0;

    let histori = p.jumlah_event_bulan_ini ?? 0;

    let nNilai = normalisasi(nilai, b.nilai);
    let nSkill = normalisasi(jumlahSkill, b.skill);
    let nJabatan = normalisasi(jabatan, b.jabatan);
    let nPosisi = normalisasi(skorPosisi, b.posisi);
    let nHistori = normalisasi(histori, b.histori);

    return (
        nNilai * (b.nilai?.bobot || 0) +
        nSkill * (b.skill?.bobot || 0) +
        nJabatan * (b.jabatan?.bobot || 0) +
        nPosisi * (b.posisi?.bobot || 0) +
        nHistori * (b.histori?.bobot || 0)
    );
}

function getParamId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id")) || 1;
}
async function renderSelectBagian() {
    const id = getParamId();
    await loadSetting();
    try {

        const response = await fetchAPI('/proyek/anggota/komposisi/' + id + '?status=0', 'GET');

        console.log("Response API:", response);
        const selectBagian = document.getElementById("bagian-edit")
        selectBagian.innerHTML = "";
        response.data.forEach(e => {
            posisiList.push(e.keahlian);
            selectBagian.innerHTML += `<option value=${e.id_keahlian}>${e.keahlian}</option>`
        });

        // console.log(posisiList);


    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function renderTable() {
    const id = getParamId();
    const tbody = document.getElementById("tbodyPendaftar");
    tbody.innerHTML = "";
    try {

        const response = await fetchAPI('/proyek/anggota/' + id + '?status=0', 'GET');

        console.log("Response API:", response);

        dataPendaftar = response.data;



    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
    await renderSelectBagian();
    dataPendaftar.forEach(p => {
        const hasil = tentukanPeran(p);
        if (p.kepegawaian === 1) {
            p.kepeg = "Junior"
        } else {
            p.kepeg = "Senior"
        }
        p.bagian = hasil.peran;
        p.ga = hasil.skor.toFixed(3);
        tbody.innerHTML += `
        <tr>
            <td>${p.petugas}</td>
            <td>${p.no_hp}</td>
            <td>${p.kepeg}</td>
            <td>${p.bagian}</td>
            <td>Rp ${parseInt(p.honor).toLocaleString("id-ID")}</td>
            <td>${p.skor}</td>
            <td>${p.ga}</td>
<td>

                <button class="aksi-btn btn-terima btn-konfirmasi" 
                    data-tipe="terima" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalKonfirmasi"
                    onclick="clickAction(${p.id})">
                    <i class="bi bi-check-lg"></i>
                </button>

                <button class="aksi-btn btn-tolak btn-konfirmasi" 
                    data-tipe="tolak" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalKonfirmasi"
                    onclick="clickAction(${p.id})">
                    <i class="bi bi-x-lg"></i>
                </button>
            </td>
        </tr>
        `;
    });

    new DataTable('#tabel-pendaftar', { pageLength: 10 });

    document.querySelectorAll(".btn-konfirmasi").forEach(btn => {
        btn.addEventListener("click", function () {
            const tipe = this.getAttribute("data-tipe");
            const icon = document.getElementById("iconKonfirmasi");
            const teks = document.getElementById("teksKonfirmasi");

            if (tipe === "terima") {
                setVal("tipe-edit", "1");
                icon.style.borderColor = "#27ae60";
                icon.style.color = "#27ae60";
                icon.innerHTML = '<i class="bi bi-check-lg"></i>';
                teks.innerText = "Terima petugas ini ke dalam proyek?";
            } else {
                setVal("tipe-edit", "2");
                icon.style.borderColor = "#e74c3c";
                icon.style.color = "#e74c3c";
                icon.innerHTML = '<i class="bi bi-x-lg"></i>';
                teks.innerText = "Tolak petugas ini dari proyek?";
            }
        });
    });
}
function clickAction(id) {
    setVal("id-edit", id);
}
fetch("../component/sidebar_admin.html")
    .then(r => r.text())
    .then(html => {
        document.getElementById("layout-admin").innerHTML = html;
        document.getElementById("page-title").innerText = "Pendaftar Proyek";
        document.getElementById("konten-halaman").innerHTML = document.getElementById("isi-halaman").innerHTML;

        const sidebar = document.getElementById("sidebar");
        const toggle = document.getElementById("toggleSidebar");
        toggle.addEventListener("click", () => sidebar.classList.toggle("closed"));

        renderTable();
    });


async function confirmModal() {
    const petugas = dataPendaftar.filter(item =>
        item.id === parseInt(getVal("id-edit")));
    console.log(petugas);
    let data = {
        id: parseInt(getVal("id-edit")),
        id_status_pendaftaran: parseInt(getVal("tipe-edit")),
        id_bagian: parseInt(getVal("bagian-edit")),
        skor_daftar: petugas[0].skor,
        honor:parseInt(petugas[0].honor),
    }
    console.log(data);
    try {

        const response = await fetchAPI('/proyek/anggota', 'PUT', data);

        console.log("Response API:", response);

        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


function goBack() {
    window.history.back();
}