let paketData = {};

let table;


async function loadPaket() {
    try {

        const response = await fetchAPI('/setting', 'GET');

        console.log("Response API:", response);

        const data = response.data;


        paketData = data;



    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadPaket();
    fetch("../component/sidebar_admin.html")
        .then(r => r.text())
        .then(html => {

            document.getElementById("layout-admin").innerHTML = html;

            document.getElementById("konten-halaman").innerHTML =
                document.getElementById("isi-halaman").innerHTML;

            initSidebar("Setting Penilaian");
            const data = paketData;
            // NILAI
            setVal("nilai-bobot", data.nilai?.bobot);
            setVal("nilai-tipe", data.nilai?.tipe);

            // SKILL
            setVal("skill-bobot", data.skill?.bobot);
            setVal("skill-tipe", data.skill?.tipe);

            // JABATAN
            setVal("jabatan-bobot", data.jabatan?.bobot);

            setVal("jabatan-senior", data.jabatan?.mapping?.Senior);
            setVal("jabatan-junior", data.jabatan?.mapping?.Junior);

            // POSISI
            setVal("posisi-bobot", data.posisi?.bobot);

            // HISTORI
            setVal("histori-bobot", data.histori?.bobot);
            setVal("histori-tipe", data.histori?.tipe);

        });

});

async function simpanData() {
    let setting = {};

    try {
        setting = {
            nilai: {
                bobot: parseFloat(document.getElementById("nilai-bobot").value) || 0,
                tipe: document.getElementById("nilai-tipe").value,
                max: 100
            },
            skill: {
                bobot: parseFloat(document.getElementById("skill-bobot").value) || 0,
                tipe: document.getElementById("skill-tipe").value,
                max: 3
            },
            jabatan: {
                bobot: parseFloat(document.getElementById("jabatan-bobot").value) || 0,
                tipe: "benefit",
                mapping: {
                    Senior: parseFloat(document.getElementById("jabatan-senior").value) || 0,
                    Junior: parseFloat(document.getElementById("jabatan-junior").value) || 0
                }
            },
            posisi: {
                bobot: parseFloat(document.getElementById("posisi-bobot").value) || 0,
                tipe: "benefit"
            },
            histori: {
                bobot: parseFloat(document.getElementById("histori-bobot").value) || 0,
                tipe: document.getElementById("histori-tipe").value,
                min: 1
            }
        };
    } catch (e) {
        alert("Terjadi kesalahan input");
        return;
    }

    let total = 0;

    for (let key in setting) {
        let b = setting[key].bobot;

        // cek NaN / kosong
        if (isNaN(b)) {
            alert(`Bobot ${key} harus diisi angka`);
            return;
        }

        // cek negatif
        if (b < 0) {
            alert(`Bobot ${key} tidak boleh negatif`);
            return;
        }

        total += b;
    }

    // cek total
    if (total === 0) {
        alert("Total bobot tidak boleh 0");
        return;
    }

    if (Math.abs(total - 1) > 0.01) {
        alert(`Total bobot harus = 1 (sekarang: ${total.toFixed(2)})`);
        return;
    }

    console.log("SETTING:", setting);

    try {
        const response = await fetchAPI('/setting', 'PUT', setting);

        console.log("Response API:", response);

        paketData = response.data;

        alert("Berhasil disimpan!");
    } catch (error) {
        console.error("Gagal menyimpan:", error);
        alert("Gagal menyimpan data");
    }
}