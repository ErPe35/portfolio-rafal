document.addEventListener("DOMContentLoaded", function () {
    // ===== MENU MOBILNE =====
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

    // ===== POWRÓT NA GÓRĘ =====
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
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
    }

    // ===== COUNTERAPI — ODWIEDZINY =====
    const visitCount = document.getElementById("visit-count");

    if (!visitCount) {
        return;
    }

    if (typeof Counter === "undefined") {
        console.error("CounterAPI: biblioteka Counter nie została załadowana.");
        visitCount.textContent = "błąd";
        return;
    }

    const counter = new Counter({
        workspace: "erpe35s-team-5693",
        debug: true,
        timeout: 8000
    });

    counter.up("first-counter-5693")
        .then(function (result) {
            console.log("CounterAPI OK:", result);

            if (result && result.value !== undefined) {
                visitCount.textContent = Number(result.value).toLocaleString("pl-PL");
            } else {
                console.error("CounterAPI: brak wartości w odpowiedzi.", result);
                visitCount.textContent = "błąd";
            }
        })
        .catch(function (error) {
            console.error("CounterAPI ERROR:", error);
            visitCount.textContent = "błąd";
        });
});
