

let data = [
    // {
    //     nama: "Wedding Expo Jakarta",
    //     jenis: "wedding",
    //     tanggal: "2026-02-10",
    //     waktu_mulai: "10:00",
    //     waktu_selesai: "20:00",
    //     lokasi: "JCC Senayan",
    //     booth: "Twini Booth Silver",
    //     kertas: "Stripe",
    //     base: "Magnetic",
    //     status: "pendaftaran"
    // },
    // {
    //     nama: "Birthday Party Aurel",
    //     jenis: "birthday",
    //     tanggal: "2026-02-10",
    //     waktu_mulai: "15:00",
    //     waktu_selesai: "19:00",
    //     lokasi: "Jakarta Selatan",
    //     booth: "Pop Booth",
    //     kertas: "4R",
    //     base: "Stiki",
    //     status: "berlangsung"
    // },
    // {
    //     id: 4,
    //     nama: "Private Event Bali",
    //     jenis: "private",
    //     tanggal: "2026-02-15",
    //     waktu_mulai: "16:00",
    //     waktu_selesai: "23:00",
    //     lokasi: "Bali Resort",
    //     booth: "Mirror Booth",
    //     kertas: "Half Frame",
    //     base: "Magnetic Cover",
    //     terdaftar: false
    // },
    // {
    //     id: 5,
    //     nama: "Cam Photo Festival",
    //     jenis: "corporate",
    //     tanggal: "2026-03-12",
    //     waktu_mulai: "09:00",
    //     waktu_selesai: "17:00",
    //     lokasi: "Surabaya Convention Hall",
    //     booth: "Cam Photo",
    //     kertas: "Stripe",
    //     base: "Akrilik",
    //     terdaftar: true
    // }
];

async function loadProyek() {
    try {

        const response = await fetchAPI('/petugas/proyek', 'GET');//?tipe=1

        console.log("Response API:", response);

        const dataAcara = response.data;

        if (!Array.isArray(data)) {
            console.error("Data bukan array");
            return;
        }
        data = dataAcara;

        // console.log(data);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}


function dotColor(jenis) {
    console.log("masuk");
    if (jenis === 1) return "#e57399";
    if (jenis === 3) return "#81c784";
    if (jenis === 4) return "#90a4ae";
    if (jenis === 5) return "#ffb74d";
    return "#aaa";
}

function cardColor(jenis) {

    if (jenis === 1) return "#f3c6d3";
    if (jenis === 3) return "#cdeed3";
    if (jenis === 4) return "#d7dee2";
    if (jenis === 5) return "#ffe6b3";
    return "#ccc";
}

const detail = document.getElementById("detail");

function renderDetail(tgl) {
    // console.log("start Render",tgl);

    detail.innerHTML = "";
    const list = data.filter(e => e.tanggal_event === tgl);
    if (!list.length) {
        detail.innerHTML = "<p style='color:#888'>Tidak ada acara</p>";
        return;
    }
    list.forEach(e => {
        const c = document.createElement("div");
        c.className = "card";
        c.style.borderLeftColor = cardColor(e.id_jenis_proyek);
        c.innerHTML = `
                <div class="card-title">${e.nama}</div>
                <div class="card-info"><b>Jenis:</b> ${e.jenis_proyek}</div>
                <div class="card-info"><b>Status:</b> ${e.status_proyek}</div>
                <div class="card-info"><b>Waktu:</b> ${e.waktu_mulai} - ${e.waktu_selesai}</div>
                <div class="card-info"><b>Lokasi:</b> ${e.lokasi}</div>
                <div class="card-info"><b>Booth:</b> ${e.booth}</div>
                <div class="card-info"><b>Kertas:</b> ${e.kertas}</div>
                <div class="card-info"><b>Base:</b> ${e.print}</div>
            `;
        detail.appendChild(c);
    });
}



const calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    initialView: "dayGridMonth",
    locale: "id",
    height: "auto",
    aspectRatio: 2.2,
    headerToolbar: {
        left: "prev,next",
        center: "title",
        right: ""
    },
    dateClick(info) {
        document.querySelectorAll(".fc-day-selected").forEach(d => d.classList.remove("fc-day-selected"));
        info.dayEl.classList.add("fc-day-selected");
        renderDetail(info.dateStr);
    },
    eventContent(arg) {
        const dot = document.createElement("div");
        dot.className = "event-dot";
        dot.style.backgroundColor = arg.event.backgroundColor;
        return { domNodes: [dot] };
    }
});

fetch("../component/navbar_petugas.html")
    .then(r => r.text())
    .then(async html => {
        await loadProyek();
        document.getElementById("navbar-petugas").innerHTML = html;
        document.getElementById("navbarTitle").innerText = "Jadwal Kerja";

        data.forEach(e => {
            calendar.addEvent({
                start: e.tanggal_event,
                backgroundColor: dotColor(e.id_jenis_proyek),
                display: "block"
            });
        });

        calendar.render();
        renderDetail(new Date().toISOString().slice(0, 10));


    });
