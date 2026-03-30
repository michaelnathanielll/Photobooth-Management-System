let dataPendaftar = [];

function getParamId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id")) || 1;
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
    dataPendaftar.forEach(p => {
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
  
    let data = {
        id : parseInt(getVal("id-edit")),
        id_status_pendaftaran : parseInt(getVal("tipe-edit")),
    }
    try {

        const response = await fetchAPI('/proyek/anggota' ,'PUT',data);

        console.log("Response API:", response);

        location.reload()

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}