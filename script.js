document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", function () {
            nav.classList.toggle("active");
        });

        document.querySelectorAll(".nav a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("active");
            });
        });
    }

    const backToTop = document.querySelector(".back-to-top");
    if (!backToTop) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) backToTop.classList.add("visible");
        else backToTop.classList.remove("visible");
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
