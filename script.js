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


// LICZNIK ODWIEDZIN — CounterAPI V2
document.addEventListener("DOMContentLoaded", function () {
    const visitCount = document.getElementById("visit-count");

    if (!visitCount || typeof Counter === "undefined") {
        return;
    }

    const counter = new Counter({
        workspace: "erpe35s-team-5693",
        timeout: 8000
    });

    counter.up("first-counter-5693")
        .then(function (result) {
            visitCount.textContent = result.value;
        })
        .catch(function (error) {
            console.error("Błąd licznika odwiedzin:", error);
            visitCount.textContent = "—";
        });
});

/* =========================
   COUNTERAPI — ODWIEDZINY
========================= */
document.addEventListener("DOMContentLoaded", function () {
    const visitCount = document.getElementById("visit-count");

    if (!visitCount || typeof Counter === "undefined") {
        return;
    }

    const counter = new Counter({
        workspace: "erpe35s-team-5693"
    });

    counter.up("first-counter-5693")
        .then(function (result) {
            visitCount.textContent = result.value;
        })
        .catch(function (error) {
            console.error("CounterAPI error:", error);
            visitCount.textContent = "—";
        });
});
