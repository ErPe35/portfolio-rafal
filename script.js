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


/* LICZNIK ODWIEDZIN */
document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.querySelector("#visit-count");

    if (!counterElement) {
        return;
    }

    // Jedno naliczenie na sesję przeglądarki, żeby zwykłe odświeżanie
    // strony nie zawyżało wyniku.
    const sessionKey = "rafalpalka-visit-counted";

    if (sessionStorage.getItem(sessionKey)) {
        return;
    }

    function updateVisitCount() {
        if (typeof Counter === "undefined") {
            return;
        }

        const counter = new Counter({
            workspace: "rafalpalka-pl"
        });

        counter.up("visits")
            .then(function (result) {
                const value = result.value ?? result.data;
                if (value !== undefined && value !== null) {
                    counterElement.textContent = Number(value).toLocaleString("pl-PL");
                    sessionStorage.setItem(sessionKey, "1");
                }
            })
            .catch(function () {
                // Licznik nie może blokować działania strony.
            });
    }

    updateVisitCount();
});
