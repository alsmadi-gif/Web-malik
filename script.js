/* ================================================
   Loving Homes – script.js (تجديد الواجهة)
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Nav ─────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Audio Player ───────────────────────────── */
  const playBtn   = document.getElementById('playBtn');
  const bgAudio   = document.getElementById('bgAudio');
  const playIcon  = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const audioBarsEls = document.querySelectorAll('#audioBars .bar');

  if (playBtn && bgAudio) {
    playBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        playIcon.style.display  = 'none';
        pauseIcon.style.display = 'block';
        audioBarsEls.forEach(b => b.classList.remove('paused'));
      } else {
        bgAudio.pause();
        playIcon.style.display  = 'block';
        pauseIcon.style.display = 'none';
        audioBarsEls.forEach(b => b.classList.add('paused'));
      }
    });
  }

  /* ── Scroll Reveal ─────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Accordion / FAQ ───────────────────────── */
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel      = btn.nextElementSibling;
      const isOpen     = btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      panel.classList.toggle('open', isOpen);

      // Close siblings
      btn.closest('.faq-list, [role="list"]')
        ?.querySelectorAll('.accordion-btn')
        .forEach(other => {
          if (other !== btn) {
            other.classList.remove('open');
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling?.classList.remove('open');
          }
        });
    });
  });

  /* ── Contact Form ─────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('#name')?.value.trim();
      const email   = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        alert('يرجى إدخال الاسم والبريد الإلكتروني وتفاصيل الطلب.');
        return;
      }
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email)) {
        alert('صيغة البريد الإلكتروني غير صحيحة، يرجى التحقق.');
        return;
      }

      const successEl = document.getElementById('formSuccess');
      if (successEl) successEl.classList.add('visible');
      form.reset();
      successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ── Smooth anchor ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Header scroll shadow ─────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 30
        ? '0 4px 32px rgba(13,32,22,.45)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

});
