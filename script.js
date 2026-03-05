/* =============================================================
   Toki Portfolio — script.js
   Sections:
     1. Custom Cursor
     2. Hamburger / Mobile Menu
     3. Scroll Reveal
     4. Skill Bar Animations
     5. Active Nav on Scroll
     6. Hire Toki CTA Button
   ============================================================= */


/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  // Move the dot cursor instantly with the mouse
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth-follow the ring cursor via RAF loop
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow cursor on interactive elements
  const interactables = document.querySelectorAll(
    'a, button, .project-card, .skill-item, .process-step'
  );
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px';
      cursor.style.height = '18px';
      ring.style.width    = '58px';
      ring.style.height   = '58px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      ring.style.width    = '38px';
      ring.style.height   = '38px';
    });
  });
})();


/* ── 2. HAMBURGER / MOBILE MENU ── */
(function initMobileMenu() {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });

  // Close menu when a link is tapped
  mob.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
    });
  });
})();


/* ── 3. SCROLL REVEAL ── */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger any skill bars nested inside a revealed element
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          bar.style.transform = `scaleX(${bar.dataset.w})`;
        });
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => observer.observe(el));
})();


/* ── 4. SKILL BAR ANIMATIONS ── */
(function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-fill');
        if (bar) {
          bar.style.transform = `scaleX(${bar.dataset.w})`;
        }
      }
    });
  }, { threshold: 0.2 });

  skillItems.forEach((el) => observer.observe(el));
})();


/* ── 5. ACTIVE NAV ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar   = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentSection
      );
    });

    // Add shadow to navbar on scroll
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 1px 40px rgba(0, 0, 0, 0.6)'
      : 'none';

  }, { passive: true });
})();


/* ── 6. HIRE TOKI CTA BUTTON ── */
(function initHireCta() {
  const btn = document.getElementById('hireCta');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
})();
