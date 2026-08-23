const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const signalPanel = document.querySelector('.signal-panel');
if (signalPanel) {
  signalPanel.addEventListener('pointermove', (event) => {
    const rect = signalPanel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    signalPanel.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${y * -5}deg) translateY(-4px)`;
  });

  signalPanel.addEventListener('pointerleave', () => {
    signalPanel.style.transform = '';
  });
}
