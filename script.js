// Praachi Jain Mehta — Editorial Warmth

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

// Nav scroll state
window.addEventListener('scroll', () => {
  document.querySelector('.nav-header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Scroll reveal with staggered delays
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.award, .wave-content > *').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.07}s`;
  revealObserver.observe(el);
});

// Wave section — subtle parallax on headline
const waveHeadline = document.querySelector('.wave-headline');
const waveSection = document.querySelector('.screen-3');

if (waveHeadline && waveSection) {
  window.addEventListener('scroll', () => {
    const rect = waveSection.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.top < viewH && rect.bottom > 0) {
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 30;
      waveHeadline.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}

// Story section — scroll reveal for panels
document.querySelectorAll('.story-panel, .story-closer, .awards-inline').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.12}s`;
  revealObserver.observe(el);
});

// Active nav highlighting
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
