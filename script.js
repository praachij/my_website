// Praachi Jain Mehta — 3-Screen Site

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  }
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '1';
    });
  });
});

// Nav scroll
window.addEventListener('scroll', () => {
  document.querySelector('.nav-header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// Add reveal class to elements in screen 2 and 3
document.querySelectorAll('.screen-2-text, .screen-2-video, .award, .cta-content > *, .cta-visual').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.06}s`;
  revealObserver.observe(el);
});

// Active nav
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });
