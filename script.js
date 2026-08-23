const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const signalPanel = document.querySelector('.signal-panel');
if (signalPanel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  signalPanel.addEventListener('pointermove', (event) => {
    const rect = signalPanel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    signalPanel.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${y * -5}deg) translateY(-5px)`;
  });

  signalPanel.addEventListener('pointerleave', () => {
    signalPanel.style.transform = '';
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const updateScrollProgress = () => {
  const root = document.documentElement;
  const progress = root.scrollTop / (root.scrollHeight - root.clientHeight || 1);
  root.style.setProperty('--scroll-progress', `${progress * 100}%`);
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
