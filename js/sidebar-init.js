function initSidebar(title) {
    const sidebar = document.getElementById("sidebar");

    document.getElementById("page-title").innerText = title;

    document.getElementById("toggleSidebar")
        ?.addEventListener("click", () => sidebar.classList.toggle("closed"));

    document.querySelectorAll(".submenu-toggle")
        .forEach(btn =>
            btn.addEventListener("click", e => {
                e.preventDefault();
                btn.parentElement.classList.toggle("open");
            })
        );

    const links = document.querySelectorAll(".menu a[href]");
    const current = location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("aktif");
            link.closest(".has-sub")?.classList.add("open");
        }
    });
}
