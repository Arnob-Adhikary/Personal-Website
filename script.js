// let sections = document.querySelectorAll('section');
// let navLinks = document.querySelectorAll('header nav a')

// window.onscroll = () => {
//     sections.forEach(sec => {
//         let top = window.scrollY;
//         let offset = sec.offsetTop;
//         let height = sec.offsetHeight-150;
//         let id = sec.getAttribute('id');
        
//         if(top >= offset && top < offset + height) {
//             navLinks.forEach(links => {
//                 links.classList.remove('active');
//                 document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
//             });
//         };
//     });

//     let header = document.querySelector('.topbar');
//     header.classList.toggle('sticky', window.scrollY > 80);
// };

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.topbar')

// Toggle navbar and icon active state
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('active');
    header.classList.toggle('sticky');
}


document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section'); // Select all sections
    const navLinks = document.querySelectorAll('.navbar a'); // Select all nav links
    const header = document.querySelector('.topbar'); // Select the header
    const navbar = document.querySelector('.navbar');
    const menuIcon = document.querySelector('#menu-icon');

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
                // Get the id of the section in view
                const sectionId = entry.target.id;
                // Add active class to the corresponding nav link
                addActiveClass(sectionId);
            }
        });
    }, {
        threshold: 0.5 // Adjust based on when you want the toggle to happen
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

            // Adjust scroll position for header
            const scrollToPosition = targetSection.offsetTop - header.offsetHeight;

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth' // Smooth scroll
            });

            // Close the navbar and menu icon if open (for mobile views)
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    });
});


