/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 




window.addEventListener('DOMContentLoaded', async event => {
     let id_user = localStorage.getItem('id_user');
  


   await fetch('headerNav.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('headerNav').innerHTML = data;
    })
    .catch(error => {
    console.error('Error loading sidebar:', error);
    });
   await fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('layoutSidenav_nav').innerHTML = data;
    })
    .catch(error => {
    console.error('Error loading sidebar:', error);
    });
    let nama_user = localStorage.getItem('nama');
    console.log("nama user",nama_user);
    nama_user = nama_user;
    document.getElementById('namaLogin').innerHTML = nama_user;
    // await 
    setMenuVisibility();
        // Toggle the side navigation
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }
});



