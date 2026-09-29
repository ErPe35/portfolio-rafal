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


/* =========================
   3D PARTICLE ORB
========================= */
(function initParticleOrb() {
    const canvas = document.getElementById("particle-orb");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = "#0084fd";
    const particles = [];
    const COUNT = 520;
    let width = 0;
    let height = 0;
    let radius = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rotation = 0;
    let raf = null;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(240, rect.width);
        height = Math.max(240, rect.height);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        radius = Math.min(width, height) * 0.35;
    }

    function createParticles() {
        particles.length = 0;
        const golden = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < COUNT; i++) {
            const y = 1 - (i / (COUNT - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;
            particles.push({
                x: Math.cos(theta) * r,
                y,
                z: Math.sin(theta) * r,
                size: 0.7 + Math.random() * 1.8,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    function rotatePoint(p) {
        const cosY = Math.cos(rotation);
        const sinY = Math.sin(rotation);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        const tilt = targetY * 0.18;
        const cosX = Math.cos(tilt);
        const sinX = Math.sin(tilt);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        return { x: x1, y: y2, z: z2 };
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const cx = width * 0.5 + targetX * 18;
        const cy = height * 0.5 + targetY * 10;

        const projected = particles.map((p) => {
            const q = rotatePoint(p);
            const depth = (q.z + 1) / 2;
            const perspective = 0.78 + depth * 0.42;
            return {
                x: cx + q.x * radius * perspective,
                y: cy + q.y * radius * perspective,
                z: q.z,
                size: p.size * perspective,
                alpha: 0.18 + depth * 0.82
            };
        }).sort((a, b) => a.z - b.z);

        for (const p of projected) {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Subtle orbital rings give the sphere a stronger 3D silhouette.
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.05, radius * 0.28, -0.25 + targetX * 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 0.95, radius * 0.30, 0.85 + targetY * 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (!reduceMotion) rotation += 0.0035;
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
        raf = requestAnimationFrame(draw);
    }

    canvas.addEventListener("pointermove", function (event) {
        const rect = canvas.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    canvas.addEventListener("pointerleave", function () {
        targetX = 0;
        targetY = 0;
    });

    // Reveal sections as they enter the viewport.
    const revealSections = document.querySelectorAll(".reveal-section");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealSections.forEach(function (section) {
            observer.observe(section);
        });
    } else {
        revealSections.forEach(function (section) {
            section.classList.add("is-visible");
        });
    }

    window.addEventListener("resize", resize);
    resize();
    createParticles();
    draw();
})();
