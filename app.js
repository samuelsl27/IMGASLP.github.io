// IMGA SLP — client-side router & interactions
(function () {
  const pages = document.querySelectorAll('.page');
  const links = document.querySelectorAll('[data-nav]');

  function showPage(id) {
    const target = document.getElementById(id) || document.getElementById('inicio');
    pages.forEach(p => p.classList.toggle('active', p === target));
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === '#' + target.id);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    // close mobile menu
    document.getElementById('mobile-menu')?.classList.remove('open');
    document.getElementById('burger')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function route() {
    const hash = (location.hash || '#inicio').replace('#', '');
    showPage(hash);
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('DOMContentLoaded', () => {
    route();

    // burger
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu');
    burger?.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  });
})();
