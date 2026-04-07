let honorData = [
    {
        id: 1,
        nama: "Wedding Expo Jakarta",
        jenis: "wedding",
        tanggal: "2026-02-10",
        waktu_mulai: "10:00",
        waktu_selesai: "20:00",
        lokasi: "JCC Senayan",
        booth: "Twini Booth Silver",
        kertas: "Stripe",
        base: "Magnetic",
        honor: 1500000
    },
    {
        id: 2,
        nama: "Corporate Gathering",
        jenis: "corporate",
        tanggal: "2026-03-05",
        waktu_mulai: "18:00",
        waktu_selesai: "22:00",
        lokasi: "Bandung Ballroom",
        booth: "Mingle",
        kertas: "Half Frame",
        base: "Basic",
        honor: 1200000
    },
    {
        id: 3,
        nama: "Private Event Bali",
        jenis: "private",
        tanggal: "2026-01-20",
        waktu_mulai: "16:00",
        waktu_selesai: "23:00",
        lokasi: "Bali Resort",
        booth: "Mirror Booth",
        kertas: "Half Frame",
        base: "Magnetic Cover",
        honor: 1000000
    },
    {
        id: 4,
        nama: "Birthday Party Aurel",
        jenis: "birthday",
        tanggal: "2026-01-28",
        waktu_mulai: "15:00",
        waktu_selesai: "19:00",
        lokasi: "Jakarta Selatan",
        booth: "Pop Booth",
        kertas: "4R",
        base: "Stiki",
        honor: 900000
    }
];

async function loadData() {
    const token = localStorage.getItem('id_user');
    const response = await fetchAPI('/proyek/petugas/' + token, 'GET');
    console.log(response)
    honorData = response.data;
}
fetch("../component/navbar_petugas.html")
    .then(r => r.text())
    .then(async html => {
        await loadData();
        document.getElementById("navbar-petugas").innerHTML = html;
        document.getElementById("navbarTitle").innerText = "Honorarium";

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

        menuToggle.addEventListener("click", openSidebar);
        sidebarClose.addEventListener("click", closeSidebar);
        overlay.addEventListener("click", closeSidebar);
        searchInput.addEventListener("input", renderHonor);
        filterTanggalMulai.addEventListener("change", renderHonor);
        filterTanggalSelesai.addEventListener("change", renderHonor);

        renderHonor();
    });



const container = document.getElementById("honorContainer");
const searchInput = document.getElementById("searchInput");
const filterTanggalMulai = document.getElementById("filterTanggalMulai");
const filterTanggalSelesai = document.getElementById("filterTanggalSelesai");
const totalHonorEl = document.getElementById("totalHonor");

function getBorderColor(jenis) {
    switch (jenis) {
        case 1: return "#e8c1c8";
        case 3: return "#c8e6c9";
        case 4: return "#cfd8dc";
        case 5: return "#fff3c4";
        default: return "#cdcec9";
    }
}

function hitungTotal(data) {
    const total = data.reduce((sum, ev) => sum + ev.honor, 0);
    totalHonorEl.innerText = "Rp " + total.toLocaleString();
}

function renderHonor() {
    const keyword = searchInput.value.toLowerCase();
    const tglMulai = filterTanggalMulai.value;
    const tglSelesai = filterTanggalSelesai.value;

    container.innerHTML = "";

    const filtered = honorData.filter(ev => {
        const matchSearch = ev.nama.toLowerCase().includes(keyword) || ev.lokasi.toLowerCase().includes(keyword);
        const matchMulai = tglMulai === "" || ev.tanggal_event >= tglMulai;
        const matchSelesai = tglSelesai === "" || ev.tanggal_event <= tglSelesai;
        return matchSearch && matchMulai && matchSelesai;
    });

    hitungTotal(filtered);

    filtered.forEach(ev => {
        const card = document.createElement("div");
        card.className = "honor-card";
        card.style.borderLeftColor = getBorderColor(ev.id_jenis_proyek);

        card.innerHTML = `
            <div class="honor-title">${ev.nama}</div>

            <div class="honor-info"><b>Jenis</b>: ${ev.jenis_proyek}</div>
<div class="honor-info"><b>Tanggal</b>: ${ev.tanggal_event}</div>
<div class="honor-info"><b>Waktu</b>: ${ev.waktu_mulai} - ${ev.waktu_selesai}</div>
<div class="honor-info"><b>Lokasi</b>: ${ev.lokasi}</div>

<div class="asset-title">Aset Event</div>
<div class="honor-info"><b>Booth</b>: ${ev.booth}</div>
<div class="honor-info"><b>Kertas</b>: ${ev.kertas}</div>
<div class="honor-info"><b>Base Print</b>: ${ev.print}</div>


            <div class="honor-amount">Rp ${ev.honor.toLocaleString()}</div>
        `;

        container.appendChild(card);
    });
}

