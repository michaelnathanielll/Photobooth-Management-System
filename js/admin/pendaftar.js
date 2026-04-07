let dataPendaftar = [];
let posisiList = [];
function tentukanPeran(p) {
    // console.log(p)
    // console.log("posisiList:", posisiList);

    let hasil = posisiList.map(posisi => ({
        posisi,
        skor: hitungSkorGA(p, posisi)
    }));

    hasil.sort((a, b) => b.skor - a.skor);
    console.log(p.petugas, hasil)
    if (hasil.length > 0) {
        return {
            ga: Math.round(hasil[0].skor),
            peran: hasil[0].posisi
        };
    } else {
        return { ga: 0, peran: "" }
    }

}
function hitungSkorGA(p, posisi) {
    // console.log("masuk di skor hitung")
    // console.log(p)
    let nilai = p.skor || 0;

    // jumlah skill
    let jumlahSkill = p.daftar_keahlian?.length || 0;

    // jabatan
    let jabatan = p.kepeg === "Senior" ? 100 : 70;

    // kecocokan posisi
    let cocok = p.daftar_keahlian?.some(k => k.nama === posisi);

    let skorPosisi = cocok ? 100 : 0;

    // histori (kalau belum ada, anggap 0)
    let histori = p.jumlah_event_bulan_ini || 0;

    // normalisasi
    jumlahSkill = jumlahSkill * 20;  // max 100
    histori = histori * 20;

    // bobot
    const b = {
        nilai: 0.4,
        skill: 0.15,
        jabatan: 0.1,
        posisi: 0.25,
        histori: 0.1
    };

    let skor =
        (nilai * b.nilai / p.penilaian.length) +
        jumlahSkill * b.skill +
        jabatan * b.jabatan +
        skorPosisi * b.posisi -
        histori * b.histori;

    // optional: efek "mutasi kecil"
    skor += Math.random() * 2;
    // console.log(skor)
    return skor;
}
function getParamId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id")) || 1;
}
async function renderSelectBagian() {
    const id = getParamId();
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
        p.ga = hasil.ga;
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
        skor_daftar: petugas.skor,
        honor:parseInt(petugas.honor),
    }
    try {

        const response = await fetchAPI('/proyek/anggota', 'PUT', data);

        console.log("Response API:", response);

        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}