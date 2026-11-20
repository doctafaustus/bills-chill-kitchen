// Highlight the "On this page" link for the section you're currently reading:
// the last section heading that has scrolled above the top third of the screen.
(() => {
  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  const sections = links
    .map((a) => document.getElementById(a.hash.slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  const update = () => {
    const line = window.innerHeight / 3;
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) current = s;
    }
    // At the very bottom of the page, highlight the last section.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    links.forEach((a) => a.classList.toggle('active', a.hash === '#' + current.id));
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
