// // Initialize AOS (Animate on Scroll)
// AOS.init({
//     duration: 1000,
//     once: true
// });

// // Typing Animation
// var typed = new Typed('#typed', {
//     strings: ['Embedded Firmware Engineer', 'Edge AI Specialist', 'IoT Developer'],
//     typeSpeed: 50,
//     backSpeed: 30,
//     loop: true
// });

// // Smooth Scroll for Nav Links
// document.querySelectorAll('.nav-links a').forEach(link => {
//     link.addEventListener('click', e => {
//         e.preventDefault();
//         const target = document.querySelector(link.getAttribute('href'));
//         window.scrollTo({
//             top: target.offsetTop - 80,
//             behavior: 'smooth'
//         });
//     });
// });













// ==================== AOS INIT ====================
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});

// ==================== TYPED.JS ====================
var typed = new Typed('#typed', {
    strings: [
        'Embedded Firmware Engineer',
        'Edge AI Specialist',
        'IoT & Cloud Developer',
        'RTOS Developer'
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== ACTIVE NAV LINK ====================
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 75,
                behavior: 'smooth'
            });
            // Close mobile nav
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('hamburger').classList.remove('active');
        }
    });
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// ==================== STAT COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(tick);
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
    }
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ==================== SKILL BAR ANIMATION ====================
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateSkillBars();
        skillsObserver.disconnect();
    }
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ==================== CIRCUIT CANVAS BACKGROUND ====================
const canvas = document.getElementById('circuitCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createNodes();
    }

    function createNodes() {
        nodes = [];
        const spacing = 100;
        const cols = Math.ceil(width / spacing);
        const rows = Math.ceil(height / spacing);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (Math.random() > 0.6) {
                    nodes.push({
                        x: i * spacing + (Math.random() - 0.5) * 30,
                        y: j * spacing + (Math.random() - 0.5) * 30,
                        pulse: Math.random() * Math.PI * 2,
                        speed: 0.01 + Math.random() * 0.02
                    });
                }
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const alpha = (1 - dist / 150) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    // Circuit-like right-angle lines
                    if (Math.abs(dx) > Math.abs(dy)) {
                        ctx.lineTo(nodes[j].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                    } else {
                        ctx.lineTo(nodes[i].x, nodes[j].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                    }
                    ctx.strokeStyle = `rgba(0, 229, 160, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(node => {
            node.pulse += node.speed;
            const glow = 0.3 + Math.sin(node.pulse) * 0.2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 160, ${glow})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(draw);
    }

    // Reduced motion support
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReduced.matches) {
        resize();
        draw();
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationId);
            resize();
            draw();
        });
    }
}
