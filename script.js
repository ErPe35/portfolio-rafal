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
<input type="text" name="name" id="name" placeholder="Twoje imię" required>

<input type="email" name="email" id="email" placeholder="Twój e-mail" required>

<textarea name="message" id="message" placeholder="Twoja wiadomość" required></textarea>

<button type="submit">Wyślij wiadomość</button>