document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. EFECTO DE PARTÍCULAS (CANVAS MATRIZ SUAVE) ---
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * -0.6 - 0.2; 
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                this.reset();
                this.y = canvas.height;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(199, 125, 255, ${this.alpha})`; 
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#A020F0";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- 2. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const sections = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    sections.forEach(sec => revealObserver.observe(sec));


    // --- 3. NAVBAR STICKY & MENÚ ACTIVO EN SCROLL ---
    const nav = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll(".nav-links a");
    const contentSections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 120) {
            nav.classList.add("sticky-active");
        } else {
            nav.classList.remove("sticky-active");
        }

        let currentSec = "";
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 180) {
                currentSec = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSec) && currentSec !== "") {
                link.classList.add("active");
            }
        });

        const backTopBtn = document.getElementById("back-to-top");
        if (window.scrollY > 400) {
            backTopBtn.classList.add("visible");
        } else {
            backTopBtn.classList.remove("visible");
        }
    });


    // --- 4. BOTÓN FLOTANTE VOLVER ARRIBA ---
    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});