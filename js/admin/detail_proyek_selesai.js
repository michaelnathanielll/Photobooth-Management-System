let dataPetugas = [
];
let avgK1 = 0;
let avgK2 = 0;
let avgK3 = 0;
let avgK4 = 0;
let dataEvent;
function getParamId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id")) || 1;
}

function openNilai(id) {
    setVal("id-nilai", id);
}

async function renderDetail() {
    const id = getParamId();
    const response = await fetchAPI('/proyek/' + id, 'GET');
    const ev = response.data;
    dataEvent = ev;
    const jumlahPetugas = dataPetugas.filter(p => p.event_id === id).length;
    console.log(ev);
    document.getElementById("detailProyek").innerHTML = `
<div class="detail-grid">

    <div>
        <div class="detail-item"><span class="detail-label">Nama Event</span>: ${ev.nama}</div>
        <div class="detail-item"><span class="detail-label">Jenis Event</span>: ${ev.jenis_proyek}</div>
        <div class="detail-item"><span class="detail-label">Paket</span>: ${ev.paket ?? "-"}</div>
        <div class="detail-item"><span class="detail-label">Klien</span>: ${ev.klien}</div>
        <div class="detail-item"><span class="detail-label">Biaya Tambahan</span>: Rp ${ev.biaya_tambahan.toLocaleString("id-ID")}</div>
    </div>

    <div>
        <div class="detail-item"><span class="detail-label">Lokasi</span>: ${ev.lokasi}</div>
        <div class="detail-item"><span class="detail-label">Tanggal</span>: ${ev.tanggal_event}</div>
        <div class="detail-item"><span class="detail-label">Waktu</span>: ${ev.waktu_mulai.slice(0, 5)} - ${ev.waktu_selesai.slice(0, 5)}</div>
        <div class="detail-item"><span class="detail-label">Jumlah Petugas</span>: ${ev.jumlah_petugas} Orang</div>
            <div class="detail-item"><span class="detail-label">Status</span>: ${ev.status_proyek}</div>
        </div>

    <div>
        <div class="detail-item"><span class="detail-label">Booth</span>: ${ev.booth}</div>
        <div class="detail-item"><span class="detail-label">Kertas</span>: ${ev.kertas} (${ev.qty_kertas})</div>
        <div class="detail-item"><span class="detail-label">Base Print</span>: ${ev.print} (${ev.qty_print})</div>
        <div class="detail-item"><span class="detail-label">Keterangan</span>: ${ev.keterangan ?? "-"}</div>
    </div>

</div>
`;


    const tbody = document.getElementById("tbodyPetugas");
    tbody.innerHTML = "";
    try {

        const response = await fetchAPI('/proyek/anggota/' + id + '?status=1', 'GET');

        console.log("Response API:", response);

        dataPetugas = response.data;



    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
    dataPetugas.forEach(p => {
        let kepeg;
        if (p.kepegawaian === 1) {
            kepeg = "Junior"
        } else if (p.kepegawaian === 2) {
            kepeg = "Senior"
        }
        let btnNilai = "";
        if (p.skor === 0) {
            btnNilai = `
          <button class="aksi-btn" data-bs-toggle="modal" data-bs-target="#modalNilai" onclick="openNilai(${p.id_petugas})">
            <i class="bi bi-pencil-square"></i>
          </button>`;
        }

        let btnHadir = `
      <button class="aksi-btn ms-1"
        data-bs-toggle="modal"
        data-bs-target="#modalKehadiran"
        onclick="setPetugasAktif(${p.id})"
        title="Ubah Kehadiran">
        <i class="bi bi-clock-history"></i>
      </button>
    `;

        tbody.innerHTML += `
      <tr>
         <td>${p.petugas}</td>
            <td>${p.no_hp}</td>
            <td>${kepeg}</td>
            <td>${p.bagian}</td>
            <td>Rp ${parseInt(p.honor).toLocaleString("id-ID")}</td>
          
        <td>
        ${p.skor !== 0 ? `
        <span 
        data-bs-toggle="tooltip" 
        data-bs-html="true"
        title="
   
        <b>Knowledge & Skill</b>: ${p.penilaian[0].nilai ?? '-'} / 100<br>
        <b>Communication & Teamwork</b>: ${p.penilaian[1].nilai ?? '-'} / 100<br>
        <b>Attitude & Work Time</b>: ${p.penilaian[2].nilai ?? '-'} / 100<br>
        <b>Problem Solving</b>: ${p.penilaian[3].nilai ?? '-'} / 100
        ">
        ${p.skor}
        </span>
        ` : "-"}
       
        </td>
                <td>${p.jam_hadir.slice(0, 5) ?? "-"}</td>
                <td>${p.keterangan ?? "-"}</td>
                <td>${btnNilai + btnHadir}</td>
            </tr>
            `;
        if (p.penilaian) {
            avgK1 += p.penilaian[0].nilai ?? 0;
            avgK2 += p.penilaian[1].nilai ?? 0;
            avgK3 += p.penilaian[2].nilai ?? 0;
            avgK4 += p.penilaian[3].nilai ?? 0;
        }
    });
    avgK1 = avgK1 / (dataPetugas.length)
    avgK2 = avgK2 / (dataPetugas.length)
    avgK3 = avgK3 / (dataPetugas.length)
    avgK4 = avgK4 / (dataPetugas.length)

    setValInner("avgK1", avgK1)
    setValInner("avgK2", avgK2)
    setValInner("avgK3", avgK3)
    setValInner("avgK4", avgK4)
    setValInner("avgTotal", avgK1 + avgK2 + avgK3 + avgK4)
    // console.log(avgK1+avgK2+avgK3+avgK4);
    new DataTable('#tabel-petugas', { pageLength: 10 });

    renderBiaya();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el))


}

function goBack() {
    window.history.back();
}
document.addEventListener('DOMContentLoaded', async function () {

    fetch("../component/sidebar_admin.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("layout-admin").innerHTML = html;
            document.getElementById("page-title").innerText = "Detail Proyek Selesai";
            document.getElementById("konten-halaman").innerHTML = document.getElementById("isi-halaman").innerHTML;

            const sidebar = document.getElementById("sidebar");
            const toggle = document.getElementById("toggleSidebar");
            toggle.addEventListener("click", () => sidebar.classList.toggle("closed"));

            renderDetail();
        });

});



function renderBiaya() {
    const honorEstimasi = dataPetugas.length * 150000;
    const honorRealisasi = dataPetugas.reduce((sum, p) => sum + parseInt(p.honor), 0);

    const totalKertasEstimasi = dataEvent.harga_kertas * dataEvent.qty_kertas;
    const totalFrameEstimasi = dataEvent.harga_print * dataEvent.qty_print;

    const totalKertasRealisasi = dataEvent.harga_kertas * dataEvent.realisasi_kertas;
    const totalFrameRealisasi = dataEvent.harga_print * dataEvent.realisasi_print;

    const totalEstimasi =
        honorEstimasi +
        dataEvent.harga_booth +
        totalKertasEstimasi +
        totalFrameEstimasi;

    const totalRealisasi =
        honorRealisasi +
        dataEvent.harga_booth +
        totalKertasRealisasi +
        totalFrameRealisasi;

    document.getElementById("dataBiaya").innerHTML = `
  <div class="row">

    <!-- ESTIMASI -->
    <div class="col-md-6">
      <b>Estimasi Biaya</b><br><br>
      Honor Petugas : Rp ${honorEstimasi.toLocaleString("id-ID")}<br>
      Sewa Booth : Rp ${dataEvent.harga_booth.toLocaleString("id-ID")}<br>
      Kertas : ${dataEvent.qty_kertas} pcs × Rp ${dataEvent.harga_kertas.toLocaleString("id-ID")} = 
      Rp ${totalKertasEstimasi.toLocaleString("id-ID")}<br>
      Base Print : ${dataEvent.qty_print} pcs × Rp ${dataEvent.harga_print.toLocaleString("id-ID")} = 
      Rp ${totalFrameEstimasi.toLocaleString("id-ID")}<br><br>

<div class="total-estimasi">
Total Estimasi :<br>
Rp ${totalEstimasi.toLocaleString("id-ID")}
</div>

    </div>

    <!-- REALISASI -->
    <div class="col-md-6">
      <b>Biaya Proyek (Realisasi)</b><br><br>
      Honor Petugas : Rp ${honorRealisasi.toLocaleString("id-ID")}<br>
      Sewa Booth : Rp ${dataEvent.harga_booth.toLocaleString("id-ID")}<br>
      Kertas : ${dataEvent.realisasi_kertas} pcs × Rp ${dataEvent.harga_kertas.toLocaleString("id-ID")} = 
      Rp ${totalKertasRealisasi.toLocaleString("id-ID")}<br>
      Base Print : ${dataEvent.realisasi_print} pcs × Rp ${dataEvent.harga_print.toLocaleString("id-ID")} = 
      Rp ${totalFrameRealisasi.toLocaleString("id-ID")}<br><br>

<div class="total-realisasi">
Total Realisasi :<br>
Rp ${totalRealisasi.toLocaleString("id-ID")}
</div>

    </div>

  </div>

  <hr>

<div class="total-selisih">
Selisih : Rp ${(totalEstimasi - totalRealisasi).toLocaleString("id-ID")}
</div>
<div class="total-selisih2">
Selisih : Rp ${(totalEstimasi - totalRealisasi).toLocaleString("id-ID")}
</div>

  `;
}

let petugasAktif = null;

function setPetugasAktif(nama) {
    petugasAktif = dataPetugas.find(p => p.id === nama);
    console.log(petugasAktif);
    if (petugasAktif.jam_hadir === "") {
        petugasAktif.jam_hadir = dataEvent.waktu_mulai.slice(0, 5);
    }
    document.getElementById("id-edit").value = petugasAktif.id;
    document.getElementById("inputJamHadir").value = petugasAktif.jam_hadir.slice(0, 5);
    document.getElementById("inputKetHadir").value = petugasAktif.keterangan ?? "";
}

async function simpanKehadiran(id) {
    petugasAktif.jam_hadir = document.getElementById("inputJamHadir").value;
    petugasAktif.ket_hadir = document.getElementById("inputKetHadir").value;
    let data = {
        id: parseInt(getVal("id-edit")),
        jam_hadir: petugasAktif.jam_hadir,
        keterangan: petugasAktif.ket_hadir
    }
    try {

        const response = await fetchAPI('/proyek/anggota', 'PUT', data);

        console.log("Response API:", response);

        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
    renderDetail();
}



async function simpanQtyRealisasi() {


    let data = {
        id: parseInt(getParamId()),
        realisasi_kertas: parseInt(document.getElementById("inputKertasReal").value),
        realisasi_print: parseInt(document.getElementById("inputBaseReal").value)
    }
    try {

        const response = await fetchAPI('/proyek', 'PUT', data);

        console.log("Response API:", response);
        checkStatus()
        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
    renderBiaya();
}


function updateSlider(slider, targetId) {
    document.getElementById(targetId).innerText = slider.value;
}

function stepSlider(rangeId, step) {
    const slider = document.getElementById(rangeId);
    let value = parseInt(slider.value);

    value += step;

    // batas min max
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    slider.value = value;

    // update text sesuai id span
    const targetId = slider.id.replace("range", "val");
    document.getElementById(targetId).innerText = value;
}

async function simpanNilai() {
    let id = parseInt(getParamId());
    let idPet = parseInt(getVal("id-nilai"));
    const data = [{
        id_proyek: id,
        id_petugas: idPet,
        id_penilaian: 1,
        nilai: parseInt(document.getElementById("rangeK1").value)

    }, {
        id_proyek: id,
        id_petugas: idPet,
        id_penilaian: 2,
        nilai: parseInt(document.getElementById("rangeK2").value)

    }, {
        id_proyek: id,
        id_petugas: idPet,
        id_penilaian: 3,
        nilai: parseInt(document.getElementById("rangeK3").value)

    }, {
        id_proyek: id,
        id_petugas: idPet,
        id_penilaian: 4,
        nilai: parseInt(document.getElementById("rangeK4").value)

    },];

    console.log(data);
    try {

        const response = await fetchAPI('/penilaian', 'POST', data);

        console.log("Response API:", response);
        checkStatus()
        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function checkStatus() {
    if (dataEvent.realisasi_kertas > 0 && dataEvent.realisasi_print > 0) {
        let count = 0;
        dataPetugas.forEach(e => {
            if (e.skor > 0) {
                count++
            }

        });
        if (count === dataPetugas.length) {
            try {
                console.log("updated Selesai")
                const data = {
                    id: parseInt(getParamId()),
                    id_status_proyek: 4
                }
                const response = await fetchAPI('/proyek', 'PUT', data);

                console.log("Response API:", response);

                // location.reload()

            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        }
    }
}