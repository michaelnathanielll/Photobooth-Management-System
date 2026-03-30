
function checkLogin() { }

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;

    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(errorDiv, form.nextSibling);

    setTimeout(() => errorDiv.remove(), 3000);
}


async function masuk() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Simulate login process
    const btn = document.getElementById('tombolLogin');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Signing in...';
    btn.disabled = true;

    // setTimeout(async () => {
    // Reset button state
    btn.innerHTML = 'Sign In <i class="fas fa-arrow-right ms-2"></i>';
    btn.disabled = false;
    try {
        // Kirim data ke server
        const response = await fetchAPI('/login?' + "username=" + username + "&password=" + password, 'POST');
        console.log(response)
        //   alert('Data berhasil ditambahkan!');
        // Cek apakah berhasil
        if (response && response.status === 200) {
            let obj = response.data;
            // console.log(obj.table_hak_akses);
            localStorage.setItem('id_user', obj.id);
            localStorage.setItem('nama', obj.nama);
            localStorage.setItem('role', JSON.stringify(obj.table_hak_akses));
            localStorage.setItem('tipe',obj.tipe);  
            // localStorage.setItem('role', obj.table_hak_akses); 
            localStorage.setItem('token', obj.token);
            if (obj.tipe === 0) {
                window.location.href = "petugas/dasbor.html";
            } else if (obj.tipe == 1) {
                window.location.href = "admin/dasbor.html";
            }
        } else {
            alert(response.message);
        }

    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Terjadi kesalahan saat mengirim data.');
    }


}