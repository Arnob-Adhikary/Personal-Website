let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle navbar and icon active state
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('active');
};


window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');

    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop-80;
        if (window.scrollY >= sectionTop) {
            currentSectionIndex = index;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.addEventListener('click', function() {
            // Close the navbar on mobile devices
            const navbar = document.querySelector('nav');
            navbar.classList.remove('active');
        });
    });

    navLinks[currentSectionIndex].classList.add('active');
    
    header.classList.toggle('sticky', window.scrollY > 80);
});


ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 50
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

ScrollReveal().reveal('.home .home-img img, .education-content, .experience-container, .slide-container, .research-container, .about_me-main', { origin: 'bottom' });

ScrollReveal().reveal('.home-content h1', { origin: 'left' });
