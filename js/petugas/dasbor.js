let honorData = [];
let dataEvent = [];
async function loadData() {
    const token = localStorage.getItem('id_user');
    const response = await fetchAPI('/proyek/petugas/' + token, 'GET');
    console.log(response)
    honorData = response.data;
}


function hitungTotal(data) {
    const total = data.reduce((sum, ev) => sum + ev.honor, 0);
    console.log(total);
    document.getElementById("totalHonor").innerText = "Rp " + total.toLocaleString("id-ID");
}

function renderHonor() {

    // const filtered = honorData;

    hitungTotal(honorData);


}


async function loadProyek() {
    try {

        const response = await fetchAPI('/petugas/proyek?status=2&tipe=1', 'GET');

        console.log("Response API:", response);

        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        let count = 0;
        data.forEach(e => {
            if (e.terdaftar === false) {
                console.log(e);
                count++;
            }
        });
        console.log(count);
        document.getElementById("totalAvailable").innerText = count + " Event";


    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

async function loadProyek3() {
    try {
        const today = new Date();

        // 30 hari ke belakang
        const tanggalMin = new Date();
        tanggalMin.setDate(today.getDate() - 30);

        // 30 hari ke depan
        const tanggalMax = new Date();
        tanggalMax.setDate(today.getDate() + 30);
        function formatTanggal(date) {
            return date.toISOString().split('T')[0];
        }

        console.log(formatTanggal(tanggalMin));
        console.log(formatTanggal(tanggalMax));
        const response = await fetchAPI('/petugas/proyek?status=2,3,4,5&tipe=1&tanggal_awal=' + formatTanggal(tanggalMin) + '&tanggal_akhir=' + formatTanggal(tanggalMax), 'GET');

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


fetch("../component/navbar_petugas.html")
    .then(r => r.text())
    .then(async html => {
        document.getElementById("navbar-petugas").innerHTML = html;
        document.getElementById("navbarTitle").innerText = "Dashboard Petugas";

        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebarPetugas");
        const overlay = document.getElementById("overlayPetugas");
        const sidebarClose = document.getElementById("sidebarClose");

        function openSidebar() {
            sidebar.classList.add("show");
            overlay.classList.add("show");
        }
        function closeSidebar() {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        }
        const nama = localStorage.getItem('nama');
        setValInner("greet", `Hi, ${nama}! 👋`);
        await loadData();
        renderHonor();
        await loadProyek();
        await loadProyek3();
        renderDashboard();
        menuToggle.addEventListener("click", openSidebar);
        sidebarClose.addEventListener("click", closeSidebar);
        overlay.addEventListener("click", closeSidebar);
    });

function getStatusPendaftaran(status) {

    switch (status) {

        case 0:
            return `
                <div class="status-badge status-menunggu">
                    Menunggu
                </div>
            `;

        case 1:
            return `
                <div class="status-badge status-diterima">
                    Diterima
                </div>
            `;

        case 2:
            return `
                <div class="status-badge status-ditolak">
                    Ditolak
                </div>
            `;

        default:
            return `
                <div class="status-badge">
                    Unknown
                </div>
            `;
    }
}

function renderDashboard() {
    const listPendaftaran = document.getElementById("listPendaftaran");
    const listBerlangsung = document.getElementById("listBerlangsung");
    const listSelesai = document.getElementById("listSelesai");

    listPendaftaran.innerHTML = "";
    listBerlangsung.innerHTML = "";
    listSelesai.innerHTML = "";

    const pendaftaran = dataEvent.filter(e => e.id_status_proyek === 2 && e.terdaftar === true);
    const berlangsung = dataEvent.filter(e => e.id_status_proyek === 3 && e.terdaftar === true && e.id_status_daftar === 1);
    const selesai = dataEvent.filter(e => (e.id_status_proyek === 4 || e.id_status_proyek === 5) && e.terdaftar === true && e.id_status_daftar === 1);

    document.getElementById("countPendaftaran").innerText = pendaftaran.length + " Event";
    document.getElementById("countBerlangsung").innerText = berlangsung.length + " Event";
    document.getElementById("countSelesai").innerText = selesai.length + " Event";


    console.log(pendaftaran);
    console.log(berlangsung);
    console.log(selesai);
    pendaftaran.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
                    <div class="event-name">${ev.nama}</div>
                    <div class="event-info">${ev.tanggal_event}</div>
                    <div class="event-info">${ev.waktu_mulai} - ${ev.waktu_selesai}</div>
                    <div class="mt-2">
                        ${getStatusPendaftaran(ev.id_status_daftar)}
                    </div>
                    `;

        listPendaftaran.appendChild(card);
    });
    berlangsung.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
                    <div class="event-name">${ev.nama}</div>
                    <div class="event-info">${ev.tanggal_event}</div>
                    <div class="event-info">${ev.waktu_mulai} - ${ev.waktu_selesai}</div>
                `;

        listBerlangsung.appendChild(card);
    });
    selesai.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
                    <div class="event-name">${ev.nama}</div>
                    <div class="event-info">${ev.tanggal_event}</div>
                    <div class="event-info">${ev.waktu_mulai} - ${ev.waktu_selesai}</div>
                `;

        listSelesai.appendChild(card);
    });
    //    if (ev.status === "berlangsung") listBerlangsung.appendChild(card);
    // if (ev.status === "selesai") listSelesai.appendChild(card);

}

