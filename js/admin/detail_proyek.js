let dataPetugas = [
];
let dataKomposisi = [];
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
                <button class="aksi-btn btn-hapus" data-bs-toggle="modal" data-bs-target="#modalHapusPetugas" onclick="openHapus('${p.id}')">
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

function openHapus(id){
    setVal("id-hapus",id);
}
async function OpenKomposisi() {
    const id = getParamId();
    const response = await fetchAPI('/proyek/komposisi/' + id, 'GET');
    dataKomposisi = response.data;
    renderKomposisi(dataKomposisi);
    console.log("Response API:", response);
}

function renderKomposisi(data) {
    const container = document.getElementById("komposisiTimProyek");
    container.innerHTML = "";

    data.forEach(item => {
        container.innerHTML += `
            <div class="mb-3">
                <label class="form-label">${item.keahlian}</label>
                <input 
                    type="number" 
                    class="form-control"
                    value="${item.qty}" 
                    data-id="${item.id_keahlian}"
                    min="0"
                >
            </div>
        `;
    });
}

function ambilKomposisi() {
    const inputs = document.querySelectorAll("#komposisiTimProyek input");

    let hasil = [];

    inputs.forEach(input => {
        hasil.push({
            id_keahlian: parseInt(input.dataset.id),
            qty: parseInt(input.value) || 0
        });
    });

    return hasil;
}
async function simpanKomposisi() {
     const id = getParamId();
    const hasilInput = ambilKomposisi();

    dataKomposisi = dataKomposisi.map(item => {
        const found = hasilInput.find(f => f.id_keahlian === item.id_keahlian);
        return {
            ...item,
            qty: found ? found.qty : 0
        };
    });

    console.log("Data terbaru:", dataKomposisi);
 try {
        // Kirim data ke server
        const response = await fetchAPI('/proyek/komposisi/' + id, 'PUT',dataKomposisi);
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
    // tutup modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalKomposisiPetugas'));
    modal.hide();
}

async function hapusPetugas() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/proyek/anggota/' + id, 'DELETE');
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

