// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---------- Mobile menu ----------
const burgerBtn = document.getElementById('burgerBtn');
const closeBurger = document.getElementById('closeBurger');
const mobilePanel = document.getElementById('mobile-panel');
if (burgerBtn && closeBurger && mobilePanel) {
  burgerBtn.addEventListener('click', () => mobilePanel.classList.add('open'));
  closeBurger.addEventListener('click', () => mobilePanel.classList.remove('open'));
  mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobilePanel.classList.remove('open')));
}

// ---------- Scroll reveals ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Footer year ----------
const yr = new Date().getFullYear();
const yearTag = document.getElementById('year-tag');
const yearCopy = document.getElementById('year-copy');
if (yearTag) yearTag.textContent = yr;
if (yearCopy) yearCopy.textContent = yr;
