```javascript
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });

    });
}


const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
