// const urlBase = "https://ppm-rajasorong.com:2687/tambak/api/v1"
// const urlBase = "http://192.168.1.154:2682/tambak/api/v1"
const urlBase = "http://localhost:2682/haewon/api/v1"
// apiService.js
window.fetchAPI = async function (url, method = 'GET', body = null) {
    url = urlBase + url;
    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': 'Bearer ' + token
    };

    const options = { method };

    // Jika body adalah FormData (upload file)
    if (body instanceof FormData) {
        options.body = body;
        options.headers = headers; // TANPA Content-Type
    } 
    // Jika body JSON biasa
    else if (body) {
        options.body = JSON.stringify(body);
        options.headers = {
            ...headers,
            'Content-Type': 'application/json'
        };
    } 
    else {
        options.headers = headers;
    }

    const response = await fetch(encodeURI(url), options);

    if (response.status === 401) {
        alert('Waktu sesi login anda telah habis, silakan login kembali.');
        logout();
        return;
    }

    return await response.json();
};


function clearParam(){
    const currentUrl = new URL(window.location.href);
        currentUrl.search = ""; // Hapus query parameter
        history.replaceState({}, document.title, currentUrl.href);
}

function parseString(value) {
    // Menghapus karakter selain angka dan titik
    return parseInt(value.replace(/[^\d]/g, ''), 10);
}

function formatRupiah(input) {
    // Ambil nilai input tanpa karakter selain angka
    let value = input.value.replace(/[^,\d]/g, '');
    
    // Format angka menjadi Rupiah
    let formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);

    // Tampilkan hasil yang sudah diformat
    input.value = formatted;
}


function formatRupiahString(value) {
    // Pastikan value adalah string
    let stringValue = value.toString();

    // Hapus karakter selain angka dan koma
    let cleanedValue = stringValue.replace(/[^,\d]/g, ''); 
    
    // Format angka menjadi Rupiah
    let formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(cleanedValue);

    // Kembalikan hasil yang sudah diformat
    return formatted;
}
// function formatUSD(value) {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 2
//     }).format(value);
// }


function parseRupiah(value) {
    return parseInt(value.replace(/[^,\d]/g, ''), 10) || 0;
}

function parseRupiahNotInput(value) {
    // Pastikan value adalah string dan menghapus spasi ekstra
    value = value.toString().trim();

    // Menghapus simbol "Rp" dan pemisah ribuan (titik)
    value = value.replace(/[^0-9,-]/g, '').replace(',', '.').replace('.', '');

    // Mengonversi string yang sudah dibersihkan menjadi angka
    const result = parseFloat(value) || 0;

    return result;
}

// Mendapatkan tanggal awal dan akhir bulan ini
const getStartAndEndOfMonth = () => {
    const today = new Date();

    // Tanggal awal bulan (hari pertama bulan ini)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1+1);

    // Tanggal akhir bulan (hari terakhir bulan ini)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    return {
        startOfMonth: startOfMonth.toISOString().split('T')[0],
        endOfMonth: endOfMonth.toISOString().split('T')[0],
    };
};


const getDateNow = () => {
    let dates = new Date(); // Buat objek Date baru
    dates.setTime(dates.getTime() + (8 * 60 * 60 * 1000)); // Tambahkan 9 jam
    return dates; // Kembalikan objek Date yang sudah diubah
}

const buildDate = (date = new Date()) =>{
    return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
}

async function muatDataJenisAkun(id) {
    try {
        tmpAlat = await fetchAPI('/akun?id='+id);
        alatBeratData = tmpAlat.data; // Sesuaikan dengan endpoint API Anda
        const select = document.getElementById('akunKas');
        select.innerHTML = "";
        // select.innerHTML = '<option value="" selected disabled>Pilih Jenis Jurnal</option>';
        let i = 0;
        alatBeratData.forEach(item => {
            if (i === 0 ){
                idParent = item.id;
                i++;
            } 
            const option = document.createElement('option');
            option.value = item.id; // ID alat berat
            option.textContent = `${item.nama} - (${item.kode_akun})`; // Nama dan kode alat berat
            select.appendChild(option);
        });
        // console.log(alatBeratBySewa);
    } catch (error) {
        console.error('Gagal memuat data alat berat:', error);
    }
}

async function muatDataJenisAkunWithId(idAkun, idElement) {
    try {
        tmpAlat = await fetchAPI('/akun?id='+idAkun);
        alatBeratData = tmpAlat.data; // Sesuaikan dengan endpoint API Anda
        const select = document.getElementById(idElement);
        select.innerHTML = "";
        select.innerHTML = '<option value="0" selected disabled>Pilih Akun Jurnal</option>';
        let i = 0;
        alatBeratData.forEach(item => {
            if (i === 0 ){
                idParent = item.id;
                i++;
            } 
            const option = document.createElement('option');
            option.value = item.id; // ID alat berat
            option.textContent = `${item.nama} - (${item.kode_akun})`; // Nama dan kode alat berat
            select.appendChild(option);
        });
        // console.log(alatBeratBySewa);
    } catch (error) {
        console.error('Gagal memuat data alat berat:', error);
    }
}

function redirectPriv(){
    alert("anda tidak di ijinkan mengakses halaman ini, silakan melakukan login ulang");
    window.location.href = 'default.html';
}

function checkPriviledge(page){
    const roleString = localStorage.getItem('role');
    const roles = roleString ? JSON.parse(roleString) : [];
    // let cek = false;
    if (page === 'dashboard'){
         if (roles.includes(1)){
            return;
         }else{
            redirectPriv();
         }
    } else if (page === 'keuangan'){
        if (roles.includes(6)){
           return;
        }else{
            redirectPriv();
        }
   } else if (page === 'alat_berat'){
    if (roles.includes(2)){
       return;
    }else{
        redirectPriv();
    }
    } else if (page === 'sparepart'){
        if (roles.includes(3)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'pembelian'){
        if (roles.includes(4)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'penyewaan'){
        if (roles.includes(5)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'customer'){
        if (roles.includes(7)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'service'){
        if (roles.includes(11)){
           return;
        }else{
            redirectPriv();
        }
    }  else if (page === 'supplier'){
        if (roles.includes(8)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'karyawan'){
        if (roles.includes(9)){
           return;
        }else{
            redirectPriv();
        }
    } else if (page === 'hak_akses'){
        if (roles.includes(10)){
           return;
        }else{
            redirectPriv();
        }
    }
    
}

// Fungsi untuk generate warna random
function generateColors(count) {
    return Array.from({ length: count }, () => 
      '#' + Math.floor(Math.random()*16777215).toString(16)
    );
  }
  
  // Atau gunakan array warna tetap (akan berulang jika data lebih banyak)
  const predefinedColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#32a852', '#eb4034'
  ];
  
  function generateColors(count) {
    return predefinedColors.slice(0, count);
  }


function formatFloatSmart(f, digits = 3) {
    return parseFloat(f.toFixed(digits)).toString();
}

function getRentang7HariKebelakang() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 6); // 7 hari kebelakang (termasuk hari ini)

  const format = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    startDate: format(start),
    endDate: format(today)
  };
}



function logout(){
    localStorage.removeItem('nama');
    localStorage.removeItem('id_user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}


// Sembunyikan menu berdasarkan role
function setMenuVisibility() {
    const roleString = localStorage.getItem('role');
    const roles = roleString ? JSON.parse(roleString) : [];

    // Daftar elemen menu yang akan diatur visibilitasnya
    const menus = {
        dashboard: document.getElementById('dashboardSide'),
        cctv: document.getElementById('cctvSide'),
        petak: document.getElementById('petakSide'),
        budidaya : document.getElementById('budidayaSide'),
        pengukuran: document.getElementById('pengukuranSide'),
        barang: document.getElementById('barangSide'),//spare part
        karyawan: document.getElementById('karyawanSide'),
        logHarian: document.getElementById('logHarianSide'),
        hakAksesSide: document.getElementById('hakAksesSide')
    };

    // Sembunyikan semua menu terlebih dahulu
    Object.values(menus).forEach(menu => {
        if (menu) menu.style.display = "none";
    });
    // console.log(roles);
    roles.forEach(role => {
        // console.log(role);
        switch (role) {
            case 8:
                if (menus.dashboard) menus.dashboard.style.display = "flex";
                break;
            case 1:
                if (menus.cctv) menus.cctv.style.display = "flex";
                break;
            case 2:
                if (menus.petak) menus.petak.style.display = "flex";
                break;
            case 3: // spare part
                if (menus.budidaya) menus.budidaya.style.display = "flex";
                 break;
            case 4:
                if (menus.pengukuran) menus.pengukuran.style.display = "flex";
                break;
            case 5:
                if (menus.barang) menus.barang.style.display = "flex";
                break;
            case 6:
                if (menus.karyawan) menus.karyawan.style.display = "flex";
                break;
            case 7:
                if (menus.hakAksesSide) menus.hakAksesSide.style.display = "flex";
                break;
            case 9:
                if (menus.logHarian) menus.logHarian.style.display = "flex";
                break;
            default:
                console.warn(`Role ${role} tidak dikenali.`);
        }
    });

}

