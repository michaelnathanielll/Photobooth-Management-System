async function loadCountPetugas() {
    try {

        const response = await fetchAPI('/dashboard/pengguna', 'GET');

        console.log("Response API:", response);

        const data = response.data;
        document.getElementById("totalUser").innerText = data.total_pengguna;
        document.getElementById("totalPetugas").innerText = data.total_petugas;
        document.getElementById("totalKlien").innerText = data.total_klien;


    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

}
let countJenis = [];
async function loadCountJenis() {
    try {

        const response = await fetchAPI('/dashboard/jenis', 'GET');

        console.log("Response API:", response);
        countJenis = response.data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

}
let countPendapatan = [];
async function loadCountPendapatan() {
    try {

        const response = await fetchAPI('/dashboard/pendapatan', 'GET');

        console.log("Response API:", response);
        countPendapatan = response.data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

}

let countJumlah = [];
async function loadCountJumlah() {
    try {

        const response = await fetchAPI('/dashboard/jumlah', 'GET');

        console.log("Response API:", response);
        countJumlah = response.data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

}

const events = [
    { nama: "Wedding Expo Jakarta", jenis: "wedding", tanggal: "2026-02-10", status: "pendaftaran" },
    { nama: "Corporate Gathering Bandung", jenis: "corporate", tanggal: "2026-03-05", status: "berlangsung" },
    { nama: "Birthday Party Aurel", jenis: "birthday", tanggal: "2026-01-28", status: "perencanaan" },
    { nama: "Private Event Bali", jenis: "private", tanggal: "2026-02-15", status: "selesai", data_lengkap: true },
    { nama: "Wedding Fair Surabaya", jenis: "wedding", tanggal: "2026-04-12", status: "selesai", data_lengkap: false },

    { nama: "Corporate Summit Jakarta", jenis: "corporate", tanggal: "2026-04-20", status: "pendaftaran" },
    { nama: "Birthday Party Kevin", jenis: "birthday", tanggal: "2026-02-22", status: "berlangsung" },
    { nama: "Private Yacht Event", jenis: "private", tanggal: "2026-03-18", status: "perencanaan" },
    { nama: "Wedding Garden Party", jenis: "wedding", tanggal: "2026-05-02", status: "pendaftaran" },
    { nama: "Corporate Awards Night", jenis: "corporate", tanggal: "2026-05-10", status: "selesai", data_lengkap: true },

    { nama: "Birthday Surprise Sinta", jenis: "birthday", tanggal: "2026-03-12", status: "selesai", data_lengkap: false },
    { nama: "Private Dinner Jakarta", jenis: "private", tanggal: "2026-03-25", status: "berlangsung" },
    { nama: "Wedding Anniversary Gala", jenis: "wedding", tanggal: "2026-06-01", status: "perencanaan" },
    { nama: "Corporate Team Building", jenis: "corporate", tanggal: "2026-04-05", status: "pendaftaran" },
    { nama: "Birthday Kids Party", jenis: "birthday", tanggal: "2026-04-18", status: "pendaftaran" },

    { nama: "Private Beach Party", jenis: "private", tanggal: "2026-06-10", status: "selesai", data_lengkap: true },
    { nama: "Wedding Luxury Bali", jenis: "wedding", tanggal: "2026-07-02", status: "berlangsung" },
    { nama: "Corporate Expo Surabaya", jenis: "corporate", tanggal: "2026-06-22", status: "perencanaan" },
    { nama: "Birthday Party Rafi", jenis: "birthday", tanggal: "2026-05-28", status: "selesai", data_lengkap: true },
    { nama: "Private Resort Gathering", jenis: "private", tanggal: "2026-06-18", status: "pendaftaran" }
];


const labelBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
const pendapatanBulanan = [12000000, 15000000, 18000000, 14000000, 20000000, 22000000];
const proyekBulanan = [2, 3, 4, 3, 5, 6];

function renderSummary() {
    document.getElementById("totalUser").innerText = users.length;
    document.getElementById("totalPetugas").innerText = petugas.length;
    document.getElementById("totalKlien").innerText = klien.length;
}

async function renderKanban() {
    const listPerencanaan = document.getElementById("listPerencanaan");
    const listPendaftaran = document.getElementById("listPendaftaran");
    const listBerlangsung = document.getElementById("listBerlangsung");
    const listPending = document.getElementById("listPending");
    const listSelesai = document.getElementById("listSelesai");

    [listPerencanaan, listPendaftaran, listBerlangsung, listPending, listSelesai].forEach(el => el.innerHTML = "");

    const response = await fetchAPI('/dashboard/proyek', 'GET');

    console.log("Response API:", response);
    const data = response.data;
    const perencanaan = data[0].proyek;
    const pendaftaran = data[1].proyek;
    const berlangsung = data[2].proyek;
    const pending = data[4].proyek;
    const selesai = data[3].proyek;

    document.getElementById("countPerencanaan").innerText = perencanaan.length + " Event";
    document.getElementById("countPendaftaran").innerText = pendaftaran.length + " Event";
    document.getElementById("countBerlangsung").innerText = berlangsung.length + " Event";
    document.getElementById("countPending").innerText = pending.length + " Event";
    document.getElementById("countSelesai").innerText = selesai.length + " Event";

    perencanaan.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `<div class="event-name">${ev.nama}</div><div class="event-info">${ev.tanggal}</div>`;
        listPerencanaan.appendChild(card);

    });
    pendaftaran.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `<div class="event-name">${ev.nama}</div><div class="event-info">${ev.tanggal}</div>`;
        listPendaftaran.appendChild(card)
    });
    berlangsung.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `<div class="event-name">${ev.nama}</div><div class="event-info">${ev.tanggal}</div>`;
        listBerlangsung.appendChild(card)

    });
    pending.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `<div class="event-name">${ev.nama}</div><div class="event-info">${ev.tanggal}</div>`;
        listPending.appendChild(card);

    });
    selesai.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `<div class="event-name">${ev.nama}</div><div class="event-info">${ev.tanggal}</div>`;
        listSelesai.appendChild(card);

    });
}

fetch("../component/sidebar_admin.html")
    .then(r => r.text())
    .then(async html => {
        document.getElementById("layout-admin").innerHTML = html;
        document.getElementById("page-title").innerText = "Dashboard Admin";
        document.getElementById("konten-halaman").innerHTML = document.getElementById("isi-halaman").innerHTML;

        const sidebar = document.getElementById("sidebar");

        document.getElementById("toggleSidebar")
            .addEventListener("click", () => {
                sidebar.classList.toggle("closed");
            });

        document.querySelectorAll(".submenu-toggle")
            .forEach(btn => {
                btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    this.parentElement.classList.toggle("open");
                });
            });

        renderKanban();
        await loadCountPetugas();
        await loadCountJenis();
        let labelJenis = [];
        let TotalJenis = [];
        // const countJenis = {
        //     wedding: events.filter(e => e.jenis === "wedding").length,
        //     birthday: events.filter(e => e.jenis === "birthday").length,
        //     corporate: events.filter(e => e.jenis === "corporate").length,
        //     private: events.filter(e => e.jenis === "private").length
        // };

        countJenis.forEach(e => {
            labelJenis.push(e.nama);
            TotalJenis.push(e.total);
        });
        console.log(labelJenis);
        new Chart(chartEvent, {
            type: "pie",
            data: {
                labels: labelJenis,
                datasets: [{
                    data: TotalJenis,
                    backgroundColor: ["#f8c8dc", "#ffe4a1", "#b8e0d2", "#d6e4ff"]
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
        });
        await loadCountPendapatan();
        let labelPendapatan = [];
        let TotalPendapatan = [];
        countPendapatan.forEach(e => {
            labelPendapatan.push(e.tanggal);
            TotalPendapatan.push(e.total);
        });
        new Chart(chartPendapatan, {
            type: "line",
            data: { labels: labelPendapatan, datasets: [{ data: TotalPendapatan, borderColor: "#1f3b63", tension: .3, fill: false }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        await loadCountJumlah();
        let labelJumlah = [];
        let TotalJumlah = [];
        // console.log(countJumlah);
        countJumlah.forEach(e => {
            labelJumlah.push(e.tanggal);
            TotalJumlah.push(e.total);
        });
        new Chart(chartProyek, {
            type: "line",
            data: { labels: labelJumlah, datasets: [{ data: TotalJumlah, borderColor: "#0b8457", tension: .3, fill: false }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    });