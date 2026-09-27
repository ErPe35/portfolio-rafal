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

    // ===== LICZNIK ODWIEDZIN — BEZPIECZNY PROXY PHP =====
    const visitCount = document.getElementById("visit-count");

    if (!visitCount) {
        return;
    }

    fetch("counter.php", {
        method: "GET",
        cache: "no-store",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }
            return response.json();
        })
        .then(function (result) {
            console.log("CounterAPI OK:", result);

            if (result && result.value !== undefined) {
                visitCount.textContent = Number(result.value).toLocaleString("pl-PL");
            } else {
                throw new Error("Brak wartości licznika w odpowiedzi API");
            }
        })
        .catch(function (error) {
            console.error("CounterAPI ERROR:", error);
            visitCount.textContent = "błąd";
        });
});
