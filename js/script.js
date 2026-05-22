// ── Nav scroll transparency ──────────────────────────────────
const mainHeader = document.getElementById('main-header');

function updateHeader() {
    const scrolled = window.scrollY > 60;
    mainHeader.classList.toggle('header-scrolled', scrolled);
    mainHeader.classList.toggle('header-transparent', !scrolled);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ── Hamburger menu ──────────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    bar1.style.transform  = menuOpen ? 'translateY(7px) rotate(45deg)'  : '';
    bar2.style.opacity    = menuOpen ? '0' : '1';
    bar3.style.transform  = menuOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.add('hidden');
        bar1.style.transform = '';
        bar2.style.opacity   = '1';
        bar3.style.transform = '';
    });
});

// ── Active nav on scroll (IntersectionObserver) ──────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active',
                    link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Card entrance animations ─────────────────────────────────
const cards = document.querySelectorAll('.card-reveal');

const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = Array.from(cards).indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), idx * 150);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

cards.forEach(c => cardObserver.observe(c));
