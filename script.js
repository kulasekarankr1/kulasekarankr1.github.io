// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Typing Animation
var typed = new Typed('#typed', {
    strings: ['Embedded Firmware Engineer', 'Edge AI Specialist', 'IoT Developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});