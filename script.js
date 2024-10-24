let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle navbar and icon active state
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('active');
};

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section'); // Select all sections
    const navLinks = document.querySelectorAll('.navbar a'); // Select all nav links
    const header = document.querySelector('.topbar'); // Select the header

    // Function to remove active class from all nav links
    const removeActiveClasses = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };

    // Function to add active class to the current section link
    const addActiveClass = (id) => {
        removeActiveClasses();
        document.querySelector(`.navbar a[href="#${id}"]`).classList.add('active');
    };

    // IntersectionObserver to track sections in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                addActiveClass(sectionId);
            }
        });
    }, {
        threshold: 0, // Increase threshold to require more of the section to be visible
        rootMargin: '-80px 0px 0px 0px' // Adjust this based on your layout
    });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Add sticky class to header on scroll
    window.addEventListener('scroll', function() {
        header.classList.toggle('sticky', window.scrollY > 80);
    });

    // Handle smooth scroll and auto-collapse menu on link click (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1); // Get target section id
            const targetSection = document.getElementById(targetId);
            
            // Adjust scroll position for header height
            const scrollToPosition = targetSection.offsetTop - header.offsetHeight;

            // Smooth scroll to the section
            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });

            // Close the navbar and menu icon if open (for mobile views)
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    });
});
