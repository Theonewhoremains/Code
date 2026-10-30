/**
 * KITTEN HUB MASTERPIECE LIQUID ENGINE 4.0
 * - 60fps Interactive Liquid Aurora Canvas (Flowing light behind transparent glass)
 * - Dynamic Specular Glare & 3D Tilt
 * - Neo-Mochi Holographic Cat Eye-Tracking & Purr Resonance
 * - Formspree Terminal & Snappy Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiquidAuroraCanvas();
  initGlassSpecularTilt();
  initNeoCatMascot();
  initServiceFilters();
  initFAQAccordion();
  initMobileNav();
  initFormspreeTerminal();
  initLaserPawClick();
  initScrollReveals();
});

/* ==========================================================================
   1. 60fps Interactive Liquid Aurora Canvas
      Renders flowing, organic luminous fluid waves behind the transparent glass
   ========================================================================== */
function initLiquidAuroraCanvas() {
  const canvas = document.getElementById('liquid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  // Orbs of liquid light
  const blobs = [
    { x: 0.2, y: 0.25, r: 280, color: 'rgba(0, 240, 255, 0.35)', vx: 0.0006, vy: 0.0008, phase: 0 },
    { x: 0.8, y: 0.35, r: 340, color: 'rgba(236, 72, 153, 0.28)', vx: -0.0007, vy: 0.0005, phase: 1.5 },
    { x: 0.45, y: 0.75, r: 380, color: 'rgba(245, 158, 11, 0.26)', vx: 0.0005, vy: -0.0006, phase: 3.0 },
    { x: 0.7, y: 0.85, r: 300, color: 'rgba(139, 92, 246, 0.32)', vx: -0.0005, vy: -0.0007, phase: 4.5 }
  ];

  let mouseX = 0.5;
  let mouseY = 0.5;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const handlePointer = (clientX, clientY) => {
    mouseX = clientX / width;
    mouseY = clientY / height;
  };

  window.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  let time = 0;

  function animate() {
    time += 0.015;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'screen';

    blobs.forEach((blob, idx) => {
      // Harmonic movement
      blob.phase += 0.008;
      const currentX = (blob.x + Math.sin(time * 0.7 + blob.phase) * 0.12 + (mouseX - 0.5) * 0.08) * width;
      const currentY = (blob.y + Math.cos(time * 0.6 + blob.phase) * 0.12 + (mouseY - 0.5) * 0.08) * height;
      const currentR = blob.r + Math.sin(time + idx) * 35;

      const grad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, currentR);
      grad.addColorStop(0, blob.color);
      grad.addColorStop(0.5, blob.color.replace(/[\d\.]+\)$/, '0.12)'));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(currentX, currentY, currentR, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Specular Light Glare & 3D Glass Tilt
   ========================================================================== */
function initGlassSpecularTilt() {
  const glassCards = document.querySelectorAll('.liquid-glass-slab');
  if (!glassCards.length) return;

  const isTouch = window.matchMedia('(hover: none)').matches;

  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update inner spotlight variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (!isTouch && card.hasAttribute('data-tilt')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = (-(y - centerY) / centerY * 6).toFixed(2);
        const rotY = ((x - centerX) / centerX * 6).toFixed(2);

        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!isTouch && card.hasAttribute('data-tilt')) {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });
}

/* ==========================================================================
   3. Neo-Mochi Holographic Cat Mascot
      - Smooth Eye-Tracking toward mouse
      - Interactive Purr Frequency Wave Resonance
   ========================================================================== */
function initNeoCatMascot() {
  const catAvatar = document.getElementById('neo-cat-avatar');
  const pupilL = document.getElementById('cat-pupil-l');
  const pupilR = document.getElementById('cat-pupil-r');
  const purrWave = document.getElementById('purr-wave');
  const sparklesDock = document.getElementById('purr-sparkles');

  if (!catAvatar || !pupilL || !pupilR) return;

  let ticking = false;

  const trackTarget = (clientX, clientY) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = catAvatar.getBoundingClientRect();
        const catX = rect.left + rect.width / 2;
        const catY = rect.top + rect.height / 2;

        const dx = clientX - catX;
        const dy = clientY - catY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 38, 6);

        const px = (Math.cos(angle) * dist).toFixed(1);
        const py = (Math.sin(angle) * dist).toFixed(1);

        pupilL.style.transform = `translate(${px}px, ${py}px)`;
        pupilR.style.transform = `translate(${px}px, ${py}px)`;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('mousemove', (e) => trackTarget(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) trackTarget(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  const triggerPurrResonance = () => {
    catAvatar.style.transform = 'scale(1.12) translateY(-8px)';
    setTimeout(() => {
      catAvatar.style.transform = 'scale(1) translateY(0)';
    }, 320);

    // Spawn floating holographic sparkles
    if (sparklesDock) {
      const symbols = ['✨', '💖', '🐾', '⭐', '💎'];
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'purr-beam-sparkle';
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const posX = Math.floor(Math.random() * 150) + 35;
        const posY = Math.floor(Math.random() * 60) + 70;

        sparkle.style.left = `${posX}px`;
        sparkle.style.top = `${posY}px`;
        sparkle.style.animationDelay = `${i * 100}ms`;

        sparklesDock.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1900);
      }
    }
  };

  catAvatar.addEventListener('click', triggerPurrResonance);
  if (purrWave) purrWave.addEventListener('click', triggerPurrResonance);
}

/* ==========================================================================
   4. Snappy Service Monolith Filter
   ========================================================================== */
function initServiceFilters() {
  const chips = document.querySelectorAll('[data-filter]');
  const monoliths = document.querySelectorAll('[data-category]');
  if (!chips.length || !monoliths.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cat = chip.getAttribute('data-filter');

      monoliths.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.style.display = 'flex';
          card.style.animation = 'monolithPop 380ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive FAQ Prism Accordion
   ========================================================================== */
function initFAQAccordion() {
  const cards = document.querySelectorAll('.faq-prism-card');
  cards.forEach(card => {
    const btn = card.querySelector('.faq-trigger-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      cards.forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });
}

/* ==========================================================================
   6. Mobile Nav
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => panel.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target) && panel.classList.contains('open')) {
      panel.classList.remove('open');
    }
  });
}

/* ==========================================================================
   7. Formspree Contact Terminal
   ========================================================================== */
function initFormspreeTerminal() {
  const form = document.getElementById('consultation-form');
  const alertEl = document.getElementById('form-status');
  if (!form || !alertEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const prevContent = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';
    }

    alertEl.className = 'terminal-alert';
    alertEl.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        alertEl.className = 'terminal-alert success';
        alertEl.textContent = '✓ Transmission confirmed! Your inquiry has reached Kitten Hub. We will discuss your requirements and share next steps.';
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        alertEl.className = 'terminal-alert error';
        alertEl.textContent = data?.error || 'Unable to transmit at this moment. Please email kittenhubonline@gmail.com directly.';
      }
    } catch {
      alertEl.className = 'terminal-alert error';
      alertEl.textContent = 'Network offline. Please verify connection or email kittenhubonline@gmail.com directly.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevContent;
      }
    }
  });
}

/* ==========================================================================
   8. Laser Pointer Stamp on Click
   ========================================================================== */
function initLaserPawClick() {
  const svgMarkup = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <ellipse cx="8" cy="5" rx="1.8" ry="2.6"/>
      <ellipse cx="16" cy="5" rx="1.8" ry="2.6"/>
      <ellipse cx="4.5" cy="9.5" rx="1.6" ry="2.2"/>
      <ellipse cx="19.5" cy="9.5" rx="1.6" ry="2.2"/>
      <path d="M12 10.5c-2.9 0-5 1.9-5 4.8 0 1.9 1.6 3.5 4 3.5h2c2.4 0 4-1.6 4-3.5 0-2.9-2.1-4.8-5-4.8z"/>
    </svg>
  `;

  document.addEventListener('click', (e) => {
    if (e.target.closest('button, input, textarea, select, a')) return;

    const stamp = document.createElement('div');
    stamp.className = 'laser-cat-stamp';
    stamp.innerHTML = svgMarkup;
    stamp.style.left = `${e.clientX}px`;
    stamp.style.top = `${e.clientY}px`;
    stamp.style.setProperty('--rot', `${(Math.random() * 40 - 20).toFixed(0)}deg`);

    document.body.appendChild(stamp);
    setTimeout(() => stamp.remove(), 900);
  });
}

/* ==========================================================================
   9. Scroll Reveal
   ========================================================================== */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-fade');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
