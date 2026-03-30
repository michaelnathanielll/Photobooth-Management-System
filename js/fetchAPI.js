
const urlBase = "http://localhost:2682/photobooth/api/v1"
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

function redirectPriv(){
    alert("anda tidak di ijinkan mengakses halaman ini, silakan melakukan login ulang");
    window.location.href = 'default.html';
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
    window.location.href = '../masuk.html';
}
function setValInner(id, value, fallback = "-") {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML += value && value !== "null" ? value : fallback;
}

function setVal(id, value, fallback = "-") {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value && value !== "null" ? value : fallback;
}
function getVal(id){
    const el = document.getElementById (id);
    return el.value;
}