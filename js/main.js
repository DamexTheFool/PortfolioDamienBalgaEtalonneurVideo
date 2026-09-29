/* =============================================
   SCRIPT PRINCIPAL — Damien Balga · Colorist
   ============================================= */

// =============================================
// 1. INTRO : suppression après animation CSS
//    L'intro se cache via CSS (animation
//    introOut), JS la retire du DOM proprement.
// =============================================
window.addEventListener('load', () => {
  const intro = document.querySelector('.intro');
  if (!intro) return;
  // On attend la fin de l'animation CSS (3.2s)
  setTimeout(() => {
    intro.style.opacity = '0';
    intro.style.transition = 'opacity 0.5s ease';
    setTimeout(() => intro.remove(), 500);
  }, 2800);
});

// =============================================
// 2. HEADER : fond solide au scroll
// =============================================
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });
}

// =============================================
// 3. HAMBURGER MENU MOBILE
//    Utilise la classe .open sur nav (gérée en
//    CSS via opacity+visibility, pas display)
//    Le bouton a z-index:1100 > nav z-index:999
//    donc il reste cliquable quand le menu est ouvert.
// =============================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // évite que le clic remonte et ferme immédiatement
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermeture au clic sur un lien
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Fermeture sur Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// =============================================
// 4. LIEN LOGO → accueil
// =============================================
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = 'index.html';
    }
  });
}

// =============================================
// 5. NAVIGATION ACTIVE (page courante)
// =============================================
(function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// =============================================
// 6. FADE-UP AU SCROLL (IntersectionObserver)
//    Observe tous les .fade-up et ajoute
//    .visible quand ils entrent dans le viewport.
// =============================================
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// =============================================
// 7. BEFORE / AFTER COMPARE SLIDER
//    Drag souris + touch sur chaque comparateur.
//    Une boucle d'animation automatique tourne
//    quand l'utilisateur n'interagit pas.
// =============================================
document.querySelectorAll('.compare').forEach(container => {
  const sliderLine   = container.querySelector('.slider-line');
  const sliderHandle = container.querySelector('.slider-handle');
  const imgAfter     = container.querySelector('.img-after');

  let isActive = false;
  let auto = 50;
  let dir  = 0.3;

  // Positionne la tranche à un pourcentage donné
  function setPercent(pct) {
    const clamped = Math.max(2, Math.min(98, pct));
    imgAfter.style.clipPath    = `inset(0 ${100 - clamped}% 0 0)`;
    sliderLine.style.left      = clamped + '%';
    sliderHandle.style.left    = clamped + '%';
    sliderHandle.style.transform = 'translate(-50%, -50%)';
  }

  function getPercent(clientX) {
    const rect = container.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  // Souris
  container.addEventListener('mousedown',  () => { isActive = true; });
  document.addEventListener('mouseup',     () => { isActive = false; });
  container.addEventListener('mousemove',  e => { if (isActive) setPercent(getPercent(e.clientX)); });
  // Hover simple (sans clic)
  container.addEventListener('mousemove',  e => { if (!isActive) setPercent(getPercent(e.clientX)); });
  container.addEventListener('mouseleave', () => { isActive = false; });

  // Touch
  container.addEventListener('touchstart', e => { isActive = true; e.preventDefault(); }, { passive: false });
  container.addEventListener('touchend',   () => { isActive = false; });
  container.addEventListener('touchmove',  e => {
    isActive = true;
    e.preventDefault();
    setPercent(getPercent(e.touches[0].clientX));
  }, { passive: false });

  // Boucle d'auto-animation (quand pas d'interaction)
  function autoLoop() {
    if (!isActive) {
      auto += dir;
      if (auto >= 85 || auto <= 15) dir *= -1;
      setPercent(auto);
    }
    requestAnimationFrame(autoLoop);
  }
  setPercent(50);
  autoLoop();
});

// =============================================
// 8. SMOOTH SCROLL pour les ancres #
//    Garde-fou : on vérifie que la cible existe
//    sur la page avant de tenter le scroll
//    (évite une erreur console sur les pages
//    qui ont des liens vers index.html#before)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
    // Si la cible n'existe pas sur cette page, le lien se comporte normalement (navigation)
  });
});

// =============================================
// 9. VIMEO LAZY LOAD
//    Les iframes portent data-src ; on ne charge
//    la vidéo que quand elle entre dans le viewport
//    pour éviter de plomber les performances.
// =============================================
const iframeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const iframe = entry.target;
      if (iframe.dataset.src && !iframe.src) {
        iframe.src = iframe.dataset.src;
        iframe.addEventListener('load', () => {
          const loader = iframe.closest('[data-reel]')?.querySelector('.reel-loader');
          if (loader) loader.classList.add('hidden');
        }, { once: true });
      }
      iframeObserver.unobserve(iframe);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('iframe[data-src]').forEach(el => iframeObserver.observe(el));

// =============================================
// 10. LIGHTBOX pour les stills
//     On attache le clic sur le .still-item
//     (pas seulement sur img) pour éviter les
//     problèmes de hit-zone liés à overflow:hidden.
//     L'image src est lue depuis data-lightbox
//     de l'<img> enfant.
// =============================================
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg     = lightbox.querySelector('img');
  const lbClose   = lightbox.querySelector('.lb-close');
  const lbCaption = lightbox.querySelector('.lb-caption');

  // Sélectionne tous les conteneurs cliquables
  document.querySelectorAll('.still-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const img = item.querySelector('img[data-lightbox]');
      if (!img) return;
      // Réinitialise l'image avant de l'afficher pour éviter le flash ancienne image
      lbImg.src = '';
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Charge l'image après que la lightbox est visible
      requestAnimationFrame(() => { lbImg.src = img.dataset.lightbox || img.src; });
    });
  });

  // Fallback : images orphelines avec data-lightbox hors .still-item
  document.querySelectorAll('img[data-lightbox]:not(.still-item img)').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lbImg.src = '';
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => { lbImg.src = img.dataset.lightbox || img.src; });
    });
  });

  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  // Escape partagé avec le menu — on vérifie que le menu n'est pas ouvert
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLb();
  });
}

// =============================================
// 11. ANIMATION DES BARRES SCOPE (about)
//     Démarre l'animation width quand les barres
//     deviennent visibles à l'écran.
// =============================================
document.querySelectorAll('.scope-fill').forEach(bar => {
  // On enlève la width initiale et on l'anime via JS
  const targetClass = [...bar.classList].find(c => c.startsWith('w-'));
  if (!targetClass) return;
  const targetW = targetClass.replace('w-', '') + '%';
  bar.style.width = '0';
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = targetW;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  barObserver.observe(bar);
});

// =============================================
// 12. COMPTEURS ANIMÉS (stats hero)
// =============================================
document.querySelectorAll('[data-counter]').forEach(el => {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  if (isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const dur   = 1400;
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  obs.observe(el);
});
