let boothData = [];

let kertasData = [];

let baseData = [];

async function loadBooth() {
    try {

        const response = await fetchAPI('/aset?jenis=1', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        boothData = data;

        boothData.forEach(e => {
            document.getElementById("booth-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("booth-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });
        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}
async function loadKertas() {
    try {

        const response = await fetchAPI('/aset?jenis=2', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        kertasData = data;
        kertasData.forEach(e => {
            document.getElementById("kertas-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("kertas-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });
        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function loadBasePrint() {
    try {

        const response = await fetchAPI('/aset?jenis=3', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        baseData = data;


        baseData.forEach(e => {
            document.getElementById("base-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("base-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


async function loadLokasi() {
    try {

        const response = await fetchAPI('/variable/lokasi', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }

        data.forEach(e => {
            document.getElementById("lokasi-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("lokasi-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function loadKlien() {
    try {

        const response = await fetchAPI('/klien', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }

        data.forEach(e => {
            document.getElementById("klien-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("klien-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


async function loadJenis() {
    try {

        const response = await fetchAPI('/variable/jenis_proyek', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }

        data.forEach(e => {
            document.getElementById("jenis-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("jenis-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
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
        document.getElementById("paket-input").innerHTML += `<option value="0">-</option>`;
        document.getElementById("paket-edit").innerHTML += `<option value="0">-</option>`;

        data.forEach(e => {
            document.getElementById("paket-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("paket-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}



async function loadStatus() {
    try {

        const response = await fetchAPI('/variable/status_proyek', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        data.forEach(e => {
            document.getElementById("status-input").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
            document.getElementById("status-edit").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}
async function addAllSelect() {
    await loadBooth();
    await loadKertas();
    await loadBasePrint();
    await loadLokasi();
    await loadKlien();
    await loadJenis();
    await loadPaket();
    await loadStatus();
    await loadProyek();
}

let dataEvent = [
    { id: 1, nama: "Wedding Expo Jakarta", jenis: "wedding", tanggal: "2026-02-10", waktu_mulai: "10:00", waktu_selesai: "20:00", lokasi: "JCC Senayan", status: "pendaftaran" },
    { id: 2, nama: "Corporate Gathering Bandung", jenis: "corporate", tanggal: "2026-03-05", waktu_mulai: "18:00", waktu_selesai: "22:00", lokasi: "Bandung Ballroom", status: "berlangsung" },
    { id: 3, nama: "Birthday Party Aurel", jenis: "birthday", tanggal: "2026-01-28", waktu_mulai: "15:00", waktu_selesai: "19:00", lokasi: "Jakarta Selatan", status: "perencanaan" },
    { id: 4, nama: "Private Event Bali", jenis: "private", tanggal: "2026-02-15", waktu_mulai: "16:00", waktu_selesai: "23:00", lokasi: "Bali Resort", status: "selesai", data_lengkap: true },
    { id: 5, nama: "Wedding After Party Surabaya", jenis: "wedding", tanggal: "2026-03-20", waktu_mulai: "19:00", waktu_selesai: "23:00", lokasi: "Surabaya Convention Hall", status: "selesai", data_lengkap: false }
];

async function loadProyek() {
    try {

        const response = await fetchAPI('/proyek', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        dataEvent = data;



    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


function getStatus(event) {
    if (event.id_status_proyek === 1)
        return { text: event.status_proyek, class: "status-perencanaan" };
    if (event.id_status_proyek === 2)
        return { text: event.status_proyek, class: "status-pendaftaran" };
    if (event.id_status_proyek === 3)
        return { text: event.status_proyek, class: "status-berlangsung" };
    if (event.id_status_proyek === 4) {
        return { text: event.status_proyek, class: "status-selesai" };
    }
    if (event.id_status_proyek === 5) {
        return { text: event.status_proyek, class: "status-selesai-belum" };
    }
}


function renderTable() {
    const jenisFilter = document.getElementById("filterJenis").value;
    const tglMulai = document.getElementById("filterTanggalMulai").value;
    const tglSelesai = document.getElementById("filterTanggalSelesai").value;
    const statusFilter = document.getElementById("filterStatus").value;

    const urutanStatus = { perencanaan: 1, pendaftaran: 2, berlangsung: 3, selesai: 4 };
    let filteredData = [...dataEvent];

    if (jenisFilter !== "")
        filteredData = filteredData.filter(ev => ev.jenis === jenisFilter);

    if (tglMulai !== "")
        filteredData = filteredData.filter(ev => ev.tanggal_event >= tglMulai);

    if (tglSelesai !== "")
        filteredData = filteredData.filter(ev => ev.tanggal_event <= tglSelesai);

    if (statusFilter !== "") {
        filteredData = filteredData.filter(ev => {

            if (statusFilter === "pending") {
                return ev.status === "selesai" && ev.data_lengkap === false;
            }

            return ev.status === statusFilter;
        });
    }

    filteredData.sort((a, b) => urutanStatus[a.status] - urutanStatus[b.status]);

    const table = $('#tabel-proyek').DataTable();
    table.clear();

    filteredData.forEach(ev => {
        const status = getStatus(ev);
        let linkDetail;
        if (ev.id_status_proyek === 4 || ev.id_status_proyek === 5) {
            linkDetail = `detail_proyek_selesai.html?id=${ev.id}`
        } else {
            linkDetail = `detail_proyek.html?id=${ev.id}`;
        }
               

        table.row.add([
            ev.nama,
            ev.jenis_proyek,
            ev.tanggal_event,
            `${ev.waktu_mulai.slice(0, 5)} - ${ev.waktu_selesai.slice(0, 5)}`,
            ev.lokasi,
            `<span class="${status.class}">${status.text}</span>`,
            `
            <a href="${linkDetail}" class="aksi-btn btn-utama d-inline-flex align-items-center justify-content-center text-decoration-none">
                <i class="bi bi-eye"></i>
            </a>
            <button class="aksi-btn btn-edit" data-bs-toggle="modal" data-bs-target="#modalUbah" onclick="openUpdate(${ev.id})">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="aksi-btn btn-hapus" data-bs-toggle="modal" data-bs-target="#modalHapus" onclick="openDelete(${ev.id})">
                <i class="bi bi-trash"></i>
            </button>
            `
        ]);
    });

    table.draw();
}



async function openUpdate(id) {

    try {

        const response = await fetchAPI('/proyek/' + id, 'GET');

        console.log("Response API:", response);

        const data = response.data;
        setVal("id-edit", data.id);
        setVal("nama-edit", data.nama);
        setVal("jenis-edit", data.id_jenis_proyek);
        setVal("lokasi-edit", data.id_lokasi);
        setVal("paket-edit", data.id_paket);
        setVal("klien-edit", data.id_klien);
        setVal("biaya-tambahan-edit", data.biaya_tambahan);
        setVal("tanggal-edit", data.tanggal_event);
        setVal("waktu-mulai-edit", data.waktu_mulai);
        setVal("waktu-selesai-edit", data.waktu_selesai);
        setVal("jumlah-petugas-edit", data.jumlah_petugas);
        setVal("booth-edit", data.id_booth);
        setVal("kertas-edit", data.id_kertas);
        setVal("base-edit", data.id_print);
        setVal("jumlah-kertas-edit", data.qty_kertas);
        setVal("jumlah-base-edit", data.qty_print);
        setVal("status-edit", data.id_status_proyek);
        setVal("keterangan-edit", data.keterangan);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

}

document.addEventListener('DOMContentLoaded', async function () {
    await addAllSelect();
    fetch("../component/sidebar_admin.html")
        .then(res => res.text())
        .then(html => {

            /* inject sidebar */
            document.getElementById("layout-admin").innerHTML = html;

            /* inject konten halaman */
            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            /* 🔥 INIT SIDEBAR (1 BARIS SAJA) */
            initSidebar("Manajemen Proyek");

            /* ================= DATATABLE ================= */
            new DataTable('#tabel-proyek', {
                pageLength: 10,
                order: [],
                language: {
                    search: "Cari:",
                    lengthMenu: "Tampilkan _MENU_ data",
                    info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                    paginate: { next: "Berikutnya", previous: "Sebelumnya" }
                }
            });

            renderTable();

            ["filterJenis", "filterStatus", "filterTanggalMulai", "filterTanggalSelesai"]
                .forEach(id => {
                    document.getElementById(id).addEventListener("change", renderTable);
                });

        })
        .catch(err => console.error("Sidebar gagal dimuat:", err));

});

async function addProyek() {
    const booth = boothData.find(item => item.id === parseInt(getVal("booth-input")));
    const kertas = kertasData.find(item => item.id === parseInt(getVal("kertas-input")));
    const base = baseData.find(item => item.id === parseInt(getVal("base-input")));

    const proyek = {

        nama: getVal("nama-input"),
        waktu_mulai: getVal("waktu-mulai-input"),
        waktu_selesai: getVal("waktu-selesai-input"),
        id_jenis_proyek: parseInt(getVal("jenis-input")),
        id_booth: booth.id,
        harga_booth: booth.harga,
        id_kertas: kertas.id,
        qty_kertas: parseInt(getVal("jumlah-kertas-input")),
        harga_kertas: kertas.harga,
        id_print: base.id,
        qty_print: parseInt(getVal("jumlah-base-input")),
        harga_print: base.harga,
        biaya_tambahan: parseInt(getVal("biaya-tambahan-input")),
        id_status_proyek: parseInt(getVal("status-input")),
        id_klien: parseInt(getVal("klien-input")),
        id_lokasi: parseInt(getVal("lokasi-input")),
        tanggal_event: getVal("tanggal-input"),
        id_tipe_event: 1,
        jumlah_petugas: parseInt(getVal("jumlah-petugas-input")),
        keterangan: getVal("keterangan-input"),
        id_paket: parseInt(getVal("paket-input")),
    };
    console.log(proyek);
    try {
        // Kirim data ke server
        const response = await fetchAPI('/proyek', 'POST', proyek);
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



async function editProyek() {
    const booth = boothData.find(item => item.id === parseInt(getVal("booth-edit")));
    const kertas = kertasData.find(item => item.id === parseInt(getVal("kertas-edit")));
    const base = baseData.find(item => item.id === parseInt(getVal("base-edit")));

    const proyek = {
        id: parseInt(getVal("id-edit")),
        nama: getVal("nama-edit"),
        waktu_mulai: getVal("waktu-mulai-edit"),
        waktu_selesai: getVal("waktu-selesai-edit"),
        id_jenis_proyek: parseInt(getVal("jenis-edit")),
        id_booth: booth.id,
        harga_booth: booth.harga,
        id_kertas: kertas.id,
        qty_kertas: parseInt(getVal("jumlah-kertas-edit")),
        harga_kertas: kertas.harga,
        id_print: base.id,
        qty_print: parseInt(getVal("jumlah-base-edit")),
        harga_print: base.harga,
        biaya_tambahan: parseInt(getVal("biaya-tambahan-edit")),
        id_status_proyek: parseInt(getVal("status-edit")),
        id_klien: parseInt(getVal("klien-edit")),
        id_lokasi: parseInt(getVal("lokasi-edit")),
        tanggal_event: getVal("tanggal-edit"),
        id_tipe_event: 1,
        jumlah_petugas: parseInt(getVal("jumlah-petugas-edit")),
        keterangan: getVal("keterangan-edit"),
        id_paket: parseInt(getVal("paket-edit")),
    };
    console.log(proyek);
    try {
        // Kirim data ke server
        const response = await fetchAPI('/proyek', 'PUT', proyek);
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


async function deleteProyek() {
    const id = document.getElementById("id-hapus").value;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/proyek/' + id, 'DELETE');
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

function openDelete(id) {
    document.getElementById("id-hapus").value = id;
}

