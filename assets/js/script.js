/**
 * Portfolio – Kiranpreet Kaur Sekhon
 * Handles: loader, header scroll, mobile nav, smooth scroll,
 * active link highlight, reveal-on-scroll, scroll-to-top.
 */

'use strict';

// ==================== LOADER ====================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 600);
});

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');

const handleScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};

window.addEventListener('scroll', handleScroll, { passive: true });

// ==================== MOBILE NAV ====================
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navbar.classList.toggle('active');
  document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
});

// Close nav on link click
document.querySelectorAll('[data-nav-link]').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navbar.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ==================== ACTIVE LINK HIGHLIGHT ====================
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const updateActiveLink = () => {
  const scrollPos = window.scrollY + 160;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ==================== REVEAL ON SCROLL ====================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el, i) => {
    const elementTop = el.getBoundingClientRect().top;
    const triggerPoint = windowHeight - 80;

    if (elementTop < triggerPoint) {
      // Stagger animation slightly for siblings
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById('scrollTop');

const toggleScrollTop = () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
};

window.addEventListener('scroll', toggleScrollTop, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});