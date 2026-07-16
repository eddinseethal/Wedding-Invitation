/* ============================================================
   EDDIN & SEETHAL WEDDING INVITATION - Premium JavaScript
   ============================================================ */

'use strict';

/* ── 1. PRELOADER ────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const openBtn = document.getElementById('open-invitation-btn');
  const rings = preloader ? preloader.querySelector('.preloader-rings') : null;
  const sub = preloader ? preloader.querySelector('.preloader-sub') : null;
  
  if (!preloader) return;
  
  setTimeout(() => {
    // Hide the loader rings and loading text, then show the custom button
    if (rings) rings.style.display = 'none';
    if (sub) sub.style.display = 'none';
    if (openBtn) {
      openBtn.style.display = 'inline-block';
      openBtn.style.animation = 'pulseGlow 2s infinite';
    } else {
      // Fallback if button is missing
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 900);
      initAOS();
    }
  }, 1200);

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 900);
      initAOS();
      
      // Explicitly trigger the music play to guarantee autoplay bypass on click
      const audio = document.getElementById('wedding-audio');
      const player = document.getElementById('music-player');
      const btn = document.getElementById('music-btn');
      if (audio && player && btn) {
        audio.volume = 0.6;
        audio.play().then(() => {
          player.classList.remove('paused');
          btn.innerHTML = '⏸';
          btn.classList.add('playing');
        }).catch(err => {
          console.log('Playback error on button click:', err);
        });
      }
    });
  }
});

/* ── 2. CUSTOM CURSOR ────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer:coarse)').matches) return;

  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    const speed = 0.12;
    rx += (mx - rx) * speed;
    ry += (my - ry) * speed;
    dot.style.left  = `${mx}px`;
    dot.style.top   = `${my}px`;
    ring.style.left = `${rx}px`;
    ring.style.top  = `${ry}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

/* ── 3. SCROLL PROGRESS ──────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
})();

/* ── 4. NAVBAR SCROLL BEHAVIOR ───────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const btt    = document.getElementById('back-to-top');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('scrolled', scrolled);
    if (btt) btt.classList.toggle('visible', scrolled);
  }, { passive: true });

  // Back-to-top
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile menu
  const toggle  = document.getElementById('nav-toggle');
  const overlay = document.getElementById('mobile-overlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    const closeBtn = document.getElementById('mobile-close');
    if (closeBtn) closeBtn.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
})();

/* ── 5. HERO PARTICLE CANVAS ─────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.size  = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.life   = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
      ctx.fillStyle = '#D39C98';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#D39C98';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
})();



/* ── 7. FLOATING HEARTS ──────────────────────────────────── */
(function initHearts() {
  const container = document.querySelector('.heart-container');
  if (!container) return;

  setInterval(() => {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = '❤️';
    h.style.cssText = `
      right: ${Math.random() * 40}px;
      font-size: ${Math.random() * 10 + 10}px;
      animation-duration: ${Math.random() * 2 + 2}s;
    `;
    container.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }, 1200);
})();

/* ── 8. COUNTDOWN TIMER ──────────────────────────────────── */
(function initCountdown() {
  const wedding = new Date('2026-09-07T15:30:00+05:30');

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  const fin = document.getElementById('cd-finished');
  const grid = document.getElementById('cd-grid');
  if (!dEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }
  function animateNum(el, val) {
    const current = el.textContent;
    const next    = pad(val);
    if (current !== next) {
      el.style.transform = 'translateY(-10px)';
      el.style.opacity   = '0';
      requestAnimationFrame(() => {
        el.textContent = next;
        el.style.transition = 'none';
        setTimeout(() => {
          el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
          el.style.transform  = 'translateY(0)';
          el.style.opacity    = '1';
        }, 10);
      });
    }
  }

  function tick() {
    const now  = new Date();
    const diff = wedding - now;

    if (diff <= 0) {
      if (grid) grid.style.display = 'none';
      if (fin)  { fin.style.display = 'block'; launchConfetti(); }
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    animateNum(dEl, days);
    animateNum(hEl, hours);
    animateNum(mEl, mins);
    animateNum(sEl, secs);

    setTimeout(tick, 1000);
  }
  tick();
})();

/* ── 9. CONFETTI ─────────────────────────────────────────── */
function launchConfetti() {
  const COLORS = ['#D39C98', '#E5B5B2', '#3E4E37', '#8EA37F', '#FFFDF9', '#ffffff'];
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -10px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        width: ${Math.random() * 8 + 6}px;
        height: ${Math.random() * 10 + 8}px;
        animation-duration: ${Math.random() * 3 + 3}s;
        animation-delay: ${Math.random() * 2}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 30);
  }
}

/* ── 10. GALLERY & LIGHTBOX ──────────────────────────────── */
(function initGallery() {
  const items     = document.querySelectorAll('.gallery-item');
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  if (!lightbox) return;

  let imgs  = [];
  let cur   = 0;

  items.forEach((item, idx) => {
    const img = item.querySelector('img');
    if (img) imgs.push(img.src);

    // Lazy loading observer
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const lazyImg = e.target.querySelector('img[data-src]');
            if (lazyImg) {
              lazyImg.src = lazyImg.dataset.src;
              lazyImg.removeAttribute('data-src');
            }
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(item);
    }

    item.addEventListener('click', () => { cur = idx; openLightbox(cur); });
  });

  function openLightbox(i) {
    lbImg.src = imgs[i];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function prev() { cur = (cur - 1 + imgs.length) % imgs.length; lbImg.src = imgs[cur]; }
  function next() { cur = (cur + 1) % imgs.length; lbImg.src = imgs[cur]; }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  }, { passive: true });
})();

/* ── 11. RSVP FORM ───────────────────────────────────────── */
(function initRSVP() {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.rsvp-submit');
    btn.textContent = '✨ Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
      success.style.animation = 'heroFadeIn 0.8s ease forwards';
    }, 1200);
  });
})();

/* ── 12. MUSIC PLAYER ────────────────────────────────────── */
(function initMusic() {
  const player  = document.getElementById('music-player');
  const btn     = document.getElementById('music-btn');
  const audio   = document.getElementById('wedding-audio');
  if (!player || !btn || !audio) return;

  audio.volume = 0.6;
  let playing = false;

  function playAudio() {
    audio.play().then(() => {
      playing = true;
      btn.innerHTML = '⏸';
      player.classList.remove('paused');
      btn.classList.add('playing');
    }).catch(err => {
      console.log('Autoplay prevented, waiting for user interaction:', err);
    });
  }

  function pauseAudio() {
    audio.pause();
    playing = false;
    btn.innerHTML = '▶';
    player.classList.add('paused');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    playAudio();
  });

  // Try playing immediately
  playAudio();

  // Try playing on first user interaction if it was blocked
  const triggerPlay = () => {
    if (!playing) {
      playAudio();
    }
    cleanupListeners();
  };

  function cleanupListeners() {
    document.removeEventListener('click', triggerPlay);
    document.removeEventListener('touchstart', triggerPlay);
    document.removeEventListener('scroll', triggerPlay);
    document.removeEventListener('keydown', triggerPlay);
  }

  document.addEventListener('click', triggerPlay);
  document.addEventListener('touchstart', triggerPlay);
  document.addEventListener('scroll', triggerPlay);
  document.addEventListener('keydown', triggerPlay);
})();

/* ── 13. AOS (Animate on Scroll) CUSTOM IMPL ─────────────── */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.aosDelay || 0);
        setTimeout(() => e.target.classList.add('aos-animate'), delay);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ── 14. PARALLAX EFFECT ─────────────────────────────────── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
})();

/* ── 15. RIPPLE EFFECT ON BUTTONS ────────────────────────── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.event-btn, .location-btn, .rsvp-submit');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size/2}px;
    top:  ${e.clientY - rect.top  - size/2}px;
    background: rgba(255,255,255,0.25);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleAnim 0.6s ease forwards;
    pointer-events: none;
  `;
  if (!btn.style.position) btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

/* ── 16. SMOOTH SECTION REVEAL ───────────────────────────── */
(function initSectionReveal() {
  const sections = document.querySelectorAll('section');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.opacity = '1';
    });
  }, { threshold: 0.05 });
  sections.forEach(s => {
    s.style.transition = 'opacity 0.5s ease';
    obs.observe(s);
  });
})();




console.log('💒 Eddin & Seethal Wedding Invitation Loaded ❤️');
