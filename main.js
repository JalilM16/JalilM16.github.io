/* ============================================================
   main.js — Jalil Matthews Portfolio
   ============================================================ */

// ─── SCROLL REVEAL ──────────────────────────────────────────
// Watches every .reveal element and adds .visible when it enters
// the viewport, triggering the CSS fade-up transition.

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings so cards animate in sequence
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────
// Highlights the nav link that corresponds to the section
// currently in view as the user scrolls.

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => navObserver.observe(section));


// ─── SMOOTH NAV SCROLL ───────────────────────────────────────
// Prevents default anchor jump and scrolls smoothly instead,
// accounting for the fixed navbar height.

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = document.querySelector('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ─── TYPEWRITER EFFECT (intro sub-title) ─────────────────────
// Cycles through role titles beneath the intro name.

const roles = [
  'Software Developer',
  'CS Student @ Western',
  'Web Developer',
  'IT Problem Solver',
];

const heroSub = document.querySelector('.hero-sub');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_AFTER_WORD = 1800;
const PAUSE_BEFORE_TYPE = 400;

function typeWriter() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    heroSub.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, PAUSE_AFTER_WORD);
      return;
    }
  } else {
    heroSub.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, PAUSE_BEFORE_TYPE);
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? DELETING_SPEED : TYPING_SPEED);
}

// Start the typewriter after the hero animation completes
setTimeout(typeWriter, 1200);


// ─── SKILL TAG HOVER RIPPLE ──────────────────────────────────
// Adds a subtle scale-pop when hovering skill tags.

document.querySelectorAll('.tag').forEach((tag) => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.06)';
    tag.style.transition = 'transform 0.15s ease';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'scale(1)';
  });
});


// ─── COPY EMAIL ON CLICK ─────────────────────────────────────
// Clicking the contact email copies it to the clipboard and
// shows a brief confirmation message.

const contactEmail = document.querySelector('.contact-email');
if (contactEmail) {
  contactEmail.addEventListener('click', async (e) => {
    const email = 'jalilmatthews125@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      const original = contactEmail.textContent;
      contactEmail.textContent = '✓ Copied to clipboard!';
      contactEmail.style.color = 'var(--accent2)';
      setTimeout(() => {
        contactEmail.textContent = original;
        contactEmail.style.color = '';
      }, 2000);
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${email}`;
    }
  });
}


// ─── SCROLL-TO-TOP ON LOGO CLICK ─────────────────────────────
document.querySelector('.nav-logo')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── EXPERIENCE CARD FLIP (mobile tap support) ───────────────
document.querySelectorAll('.exp-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ─── EDUCATION CARD FLIP (mobile tap support) ────────────────
document.querySelectorAll('.edu-card-flip').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
