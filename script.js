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

/* Assignment hub: kept here so the existing landing-page HTML remains intact. */
const workSection = document.querySelector('#work');
if (workSection && !document.querySelector('#assignments')) {
  const section = document.createElement('section');
  section.id = 'assignments';
  section.className = 'section container reveal visible';
  section.innerHTML = `
    <div class="section-heading split-heading">
      <div><div class="section-label">03 / ASSIGNMENTS</div><h2>Academic work.<br /><span>Organized in one place.</span></h2></div>
      <p>Assignment pages can be added independently as the academic portfolio grows.</p>
    </div>
    <div class="work-grid">
      <a class="project project-large" href="assignments/esd/index.html">
        <div class="project-top"><span>01 / ESD</span><span>→</span></div>
        <div class="project-icon">◇</div>
        <h3>Embedded System Design</h3>
        <p>Cortex-M33 + Cortex-M55 heterogeneous ARM-based embedded system for real-time sensor processing.</p>
        <span class="project-arrow">Open assignment →</span>
      </a>
      <a class="project project-large" href="assignments/pad/index.html">
        <div class="project-top"><span>02 / PAD</span><span>→</span></div>
        <div class="project-icon">∥</div>
        <h3>Parallel Architecture</h3>
        <p>Dedicated Parallel Architecture assignment page, kept separate from the ESD work.</p>
        <span class="project-arrow">Open assignment →</span>
      </a>
      <div class="project">
        <div class="project-top"><span>03 / FUTURE</span><span>+</span></div>
        <h3>More assignments</h3>
        <p>Add another assignment folder and card here when the next course or project is ready.</p>
        <span class="project-arrow">Expandable portfolio</span>
      </div>
    </div>`;
  workSection.insertAdjacentElement('afterend', section);

  const nav = document.querySelector('.nav-links');
  if (nav && !nav.querySelector('a[href="#assignments"]')) {
    const link = document.createElement('a');
    link.href = '#assignments';
    link.textContent = 'Assignments';
    const github = nav.querySelector('a[href*="github.com"]');
    nav.insertBefore(link, github || null);
  }
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
