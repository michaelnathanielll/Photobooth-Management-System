let dataPetugas = [
];

function getParamId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id")) || 1;
}

async function renderDetail() {
    const id = getParamId();
    const response = await fetchAPI('/proyek/' + id, 'GET');
    const ev = response.data;
    const jumlahPetugas = dataPetugas.filter(p => p.event_id === id).length;

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

    document.getElementById("btnPendaftar").innerHTML =
        ev.id_status_proyek === 2
            ? `<a href="pendaftar.html?id=${ev.id}" class="btn btn-utama btn-sm">
             <i class="bi bi-people"></i> Pendaftar
           </a>`
            : "";

    const thAksi = document.getElementById("thAksi");
    if (ev.id_status_proyek === 2) {
        thAksi.classList.remove("hide-aksi");
    } else {
        thAksi.classList.add("hide-aksi");
    }

    const tbody = document.getElementById("tbodyPetugas");
    tbody.innerHTML = "";
    try {

        const response = await fetchAPI('/proyek/anggota/' + id+'?status=1', 'GET');

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
        let row = `
        <tr>
            <td>${p.petugas}</td>
            <td>${p.no_hp}</td>
            <td>${kepeg}</td>
            <td>${p.bagian}</td>
            <td>Rp ${p.honor.toLocaleString("id-ID")}</td>
            <td>${p.skor}</td>
        `;

        if (ev.id_status_proyek === 2) {
            row += `
            <td>
                <button class="aksi-btn btn-hapus" data-bs-toggle="modal" data-bs-target="#modalHapusPetugas">
                    <i class="bi bi-trash"></i>
                </button>
            </td>`;
        } else {
            row += `<td class="hide-aksi"></td>`;
        }

        row += "</tr>";
        tbody.innerHTML += row;
    });

    new DataTable('#tabel-petugas', { pageLength: 10 });
}


document.addEventListener('DOMContentLoaded', async function () {

    fetch("../component/sidebar_admin.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("layout-admin").innerHTML = html;
            document.getElementById("page-title").innerText = "Detail Proyek";
            document.getElementById("konten-halaman").innerHTML = document.getElementById("isi-halaman").innerHTML;

            const sidebar = document.getElementById("sidebar");
            const toggle = document.getElementById("toggleSidebar");
            toggle.addEventListener("click", () => sidebar.classList.toggle("closed"));

            renderDetail();
        });
});

