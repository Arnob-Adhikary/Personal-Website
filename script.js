document.documentElement.classList.add('js');

const header = document.querySelector('.topbar');
const menuToggle = document.querySelector('#menu-toggle');
const navbar = document.querySelector('#navbar');

// Mobile menu
menuToggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    menuToggle.querySelector('i').className = open ? 'bx bx-x' : 'bx bx-menu';
});

navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
        menuToggle.querySelector('i').className = 'bx bx-menu';
    });
});

// Header border once the page is scrolled
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight the nav link of the section in view
const sectionLinks = [...navbar.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if (sections.length) {
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            sectionLinks.forEach(link =>
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => spy.observe(section));
}

// Fade elements in as they enter the viewport
const revealer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

// Lightbox for project galleries (projects page)
const lightbox = document.querySelector('#lightbox');
if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('figcaption');
    let group = [];
    let index = 0;

    const show = i => {
        index = (i + group.length) % group.length;
        const item = group[index];
        lbImg.src = item.dataset.full || item.querySelector('img').src;
        lbImg.alt = item.querySelector('img').alt;
        lbCaption.textContent = item.dataset.caption || '';
        const multi = group.length > 1;
        lightbox.querySelector('.lb-prev').hidden = !multi;
        lightbox.querySelector('.lb-next').hidden = !multi;
    };

    document.querySelectorAll('[data-lightbox]').forEach(button => {
        button.addEventListener('click', () => {
            group = [...document.querySelectorAll(`[data-lightbox="${button.dataset.lightbox}"]`)];
            show(group.indexOf(button));
            lightbox.showModal();
        });
    });

    lightbox.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    lightbox.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target.tagName === 'FIGURE') lightbox.close(); });
    lightbox.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
}

document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
