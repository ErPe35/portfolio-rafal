document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");

    if (!menuButton || !nav) {
        console.log("Nie znaleziono menu");
        return;
    }

    menuButton.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
        });
    });

});


/* =========================
   BACK TO TOP
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.querySelector(".back-to-top");

    if (!backToTop) {
        return;
    }

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});