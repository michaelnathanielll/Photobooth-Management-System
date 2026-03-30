fetch("../component/navbar_petugas.html")
    .then(r => r.text())
    .then(html => {
        document.getElementById("navbar-petugas").innerHTML = html;
        document.getElementById("navbarTitle").innerText = "Pendaftaran Pekerjaan";

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
        loadJenis();
        loadProyek();
    });


let dataEvent = [

];



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
            document.getElementById("filterJenis").innerHTML += `<option value="${e.id}">${e.nama}</option>`;
        });


        // console.log(boothData);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
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
        dataEvent = data;



    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


const container = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const filterJenis = document.getElementById("filterJenis");
const filterTanggalMulai = document.getElementById("filterTanggalMulai");
const filterTanggalSelesai = document.getElementById("filterTanggalSelesai");
const filterStatus = document.getElementById("filterStatus");
const modal = document.getElementById("modalConfirm");
const modalText = document.getElementById("modalText");
const modalYesBtn = document.getElementById("modalYesBtn");
const loadingPage = document.getElementById("loadingPage");

function getBorderColor(jenis) {
    switch (jenis) {
        case 1: return "#e8c1c8";
        case 3: return "#c8e6c9";
        case 4: return "#cfd8dc";
        case 5: return "#fff3c4";
        default: return "#cdcec9";
    }
}

function renderEvent() {
    const keyword = searchInput.value.toLowerCase();
    const jenis = (filterJenis.value);
    const tglMulai = filterTanggalMulai.value;
    const tglSelesai = filterTanggalSelesai.value;
    const status = filterStatus.value;

    container.innerHTML = "";

    const filtered = dataEvent.filter(ev => {
        const matchSearch = ev.nama.toLowerCase().includes(keyword) || ev.lokasi.toLowerCase().includes(keyword);
        const matchJenis = jenis === "" || String(ev.id_jenis_proyek) === jenis;
        const matchStatus = status === "" || (status === "belum" && !ev.terdaftar) || (status === "terdaftar" && ev.terdaftar);
        const matchMulai = tglMulai === "" || ev.tanggal_event >= tglMulai;
        const matchSelesai = tglSelesai === "" || ev.tanggal_event <= tglSelesai;
        return matchSearch && matchJenis && matchStatus && matchMulai && matchSelesai;
    });

    filtered.forEach(ev => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.style.borderLeftColor = getBorderColor(ev.id_jenis_proyek);

        let tombol = '';
        if (ev.terdaftar === true) {
            tombol = `<button class="btn-batal" onclick="openModal('batalkan',${ev.id})">Batalkan Pendaftaran</button>`;
        } else {
            tombol = `<button class="btn-daftar" onclick="openModal('daftar',${ev.id})">Daftar Proyek</button>`;
        }


        card.innerHTML = `
    <div class="event-title">${ev.nama}</div>

<div class="event-info"><b>Jenis</b>: ${ev.jenis_proyek}</div>
<div class="event-info"><b>Tanggal</b>: ${ev.tanggal_event}</div>
<div class="event-info"><b>Waktu</b>: ${ev.waktu_mulai} - ${ev.waktu_selesai}</div>
<div class="event-info"><b>Lokasi</b>: ${ev.lokasi}</div>

<div class="asset-title" style="margin-top:10px;">Aset Event</div>
<div class="event-info"><b>Booth</b>: ${ev.booth}</div>
<div class="event-info"><b>Kertas</b>: ${ev.kertas}</div>
<div class="event-info"><b>Base Print</b>: ${ev.print}</div>


    ${tombol}
`;


        container.appendChild(card);
    });
}

function openModal(action, id) {
    modal.style.display = "flex";
    modalText.innerText = action === "daftar"
        ? "Apakah anda yakin akan mengajukan pendaftaran proyek ini?"
        : "Apakah anda yakin akan membatalkan pendaftaran ini?";
    modalYesBtn.onclick = function () {
        modal.style.display = "none";
        processAction(action, id);
    }
}

function closeModal() { modal.style.display = "none"; }

async function processAction(action, id) {
    loadingPage.style.display = "flex";
    await setTimeout(async () => {
        const ev = dataEvent.find(e => e.id === id);
        if (action === "daftar") {
            ev.terdaftar = true;
            try {
                const data = {
                    id_proyek: ev.id
                }
                const response = await fetchAPI('/proyek/anggota/daftar', 'POST', data);

                console.log("Response API:", response);


            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        }
        if (action === "batalkan") {
            const response = await fetchAPI('/proyek/anggota/'+ev.id_daftar, 'DELETE');
            console.log(ev.id_daftar,"Response API DELETE: ", response);
            ev.terdaftar = false;
        }
        loadingPage.style.display = "none";
        renderEvent();
    }, 800);
}

searchInput.addEventListener("input", renderEvent);
filterJenis.addEventListener("change", renderEvent);
filterTanggalMulai.addEventListener("change", renderEvent);
filterTanggalSelesai.addEventListener("change", renderEvent);
filterStatus.addEventListener("change", renderEvent);

window.onload = () => {
    setTimeout(() => {
        loadingPage.style.display = "none";
        renderEvent();
    }, 600);
};