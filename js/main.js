document.addEventListener('DOMContentLoaded', () => {

  // Page transition
  const transition = document.querySelector('.page-transition');
  if (transition) {
    requestAnimationFrame(() => {
      transition.classList.add('done');
      setTimeout(() => transition.remove(), 600);
    });
  }

  // Fix back/forward black screen (bfcache restore)
  window.addEventListener('pageshow', () => {
    document.querySelectorAll('.page-transition').forEach(el => el.remove());
  });

  // Hero loaded animation
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // Nav scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .project-image');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // Smooth page transitions for internal links
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http')) {
      a.addEventListener('click', e => {
        e.preventDefault();
        const overlay = document.createElement('div');
        overlay.className = 'page-transition done';
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
          overlay.classList.remove('done');
          setTimeout(() => {
            window.location.href = href;
          }, 400);
        });
      });
    }
  });

  // Parallax on hero background
  const heroBg = document.querySelector('.hero-bg, .project-hero .hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
    if (currentPage.includes('project') && href === 'index.html') {
      a.classList.add('active');
    }
  });
});
