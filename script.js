  // ---------- Preloader ----------
  window.addEventListener('load', () => {
    setTimeout(() => {
      const pre = document.getElementById('preloader');
      pre.classList.add('exit');
      setTimeout(() => { pre.style.display = 'none'; playHeroIntro(); }, 950);
    }, 1900);
  });

  function playHeroIntro(){
    document.querySelectorAll('#hero [data-anim]').forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity .8s ease, transform .8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      }, i * 110);
    });
  }

  // ---------- Navbar ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---------- Mobile menu ----------
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBurger = document.getElementById('closeBurger');
  const mobilePanel = document.getElementById('mobile-panel');
  burgerBtn.addEventListener('click', () => mobilePanel.classList.add('open'));
  closeBurger.addEventListener('click', () => mobilePanel.classList.remove('open'));
  mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobilePanel.classList.remove('open')));

  // ---------- Hero video: always playing/looping, button only toggles sound ----------
  const heroVideo = document.getElementById('hero-video');
  const reelBtn = document.getElementById('reel-btn');
  const reelIcon = document.getElementById('reel-icon');
  const reelLabel = document.getElementById('reel-label');

  const MUTE_ICON = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.8L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  const UNMUTE_ICON = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';

  function updateReelUI(){
    if (heroVideo.muted){
      reelIcon.innerHTML = MUTE_ICON;
      reelLabel.textContent = 'Unmute';
      reelBtn.setAttribute('aria-label', 'Unmute reel');
    } else {
      reelIcon.innerHTML = UNMUTE_ICON;
      reelLabel.textContent = 'Mute';
      reelBtn.setAttribute('aria-label', 'Mute reel');
    }
  }

  function toggleMute(e){
    if (e) e.stopPropagation();
    heroVideo.muted = !heroVideo.muted;
    heroVideo.play().catch(()=>{});
    updateReelUI();
  }

  reelBtn.addEventListener('click', toggleMute);
  updateReelUI();

  // ---------- Scroll reveals ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---------- Journey timeline scroll activation ----------
  const trackLine = document.getElementById('trackLine');
  const jcards = document.querySelectorAll('[data-jcard]');
  const trackIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) trackLine.classList.add('in'); });
  }, { threshold: 0.1 });
  trackIO.observe(document.querySelector('.timeline-track'));

  const cardIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.55 });
  jcards.forEach(c => cardIO.observe(c));

  // ---------- Footer hero text reveal ----------
  const footerHeroIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
  }, { threshold: 0.3 });
  footerHeroIO.observe(document.getElementById('footerHero'));

  // ---------- Contact form -> WhatsApp ----------
  const cfSubmit = document.getElementById('cfSubmit');
  if (cfSubmit) {
    cfSubmit.addEventListener('click', () => {
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      let text = `Hi Guru, I'm ${name || '[Your Name]'}.`;
      if (subject) text += `\nSubject: ${subject}`;
      if (email) text += `\nMy email: ${email}`;
      text += `\n\n${message || "I'd like to discuss..."}`;

      const phone = '918374444525';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // ---------- Year ----------
  const yr = new Date().getFullYear();
  document.getElementById('year-tag').textContent = yr;
  document.getElementById('year-copy').textContent = yr;
