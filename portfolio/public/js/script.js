// All contact details come from CONFIG in main.py (read via data-* attributes on <body>).
(function () {
  'use strict';
  var body = document.body;
  var wa = (body.dataset.whatsapp || '').replace(/\D/g, '');
  var waMsg = body.dataset.waMsg || '';
  var ig = (body.dataset.instagram || '').replace('@', '').trim();
  var email = (body.dataset.email || '').trim();

  var waPlaceholder = !wa || wa === '923001234567';
  var igPlaceholder = !ig || ig === 'your_username';

  // ---- WhatsApp + Instagram links ----
  function setLink(ids, href, ok, hint) {
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (ok) {
        el.href = href;
      } else {
        el.removeAttribute('target');
        el.setAttribute('aria-disabled', 'true');
        el.title = hint;
        el.addEventListener('click', function (e) { e.preventDefault(); });
      }
    });
  }
  setLink(['waBtn', 'waFoot'],
    'https://wa.me/' + wa + (waMsg ? '?text=' + encodeURIComponent(waMsg) : ''),
    !waPlaceholder, 'Add your WhatsApp number in main.py');
  setLink(['igBtn', 'igFoot'],
    'https://instagram.com/' + encodeURIComponent(ig),
    !igPlaceholder, 'Add your Instagram username in main.py');

  // "Contact Me": email if provided, otherwise WhatsApp
  var emailBtn = document.getElementById('emailBtn');
  if (email) {
    emailBtn.href = 'mailto:' + email;
  } else if (!waPlaceholder) {
    emailBtn.href = 'https://wa.me/' + wa + (waMsg ? '?text=' + encodeURIComponent(waMsg) : '');
    emailBtn.target = '_blank';
    emailBtn.rel = 'noopener';
  } else {
    emailBtn.setAttribute('aria-disabled', 'true');
    emailBtn.title = 'Add your email or WhatsApp number in main.py';
    emailBtn.addEventListener('click', function (e) { e.preventDefault(); });
  }

  // ---- Footer year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Mobile menu ----
  var menuBtn = document.getElementById('menuBtn');
  var links = document.getElementById('links');
  function closeMenu() { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---- Active section highlight ----
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  // ---- Rotating hero text ----
  var phrases = ['Frontend Web Development', 'Programming Fundamentals', 'AI Tools & Prompt Writing',
                 'Workflow Automation', 'Digital Design & Social Media'];
  var el = document.getElementById('rotText');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var i = 0, ch = phrases[0].length, deleting = true, wait = 1600;
    (function tick() {
      var full = phrases[i];
      if (!deleting && ch < full.length) { ch++; wait = 55; }
      else if (!deleting) { deleting = true; wait = 1600; }
      else if (ch > 0) { ch--; wait = 28; }
      else { deleting = false; i = (i + 1) % phrases.length; wait = 250; }
      el.textContent = phrases[i].slice(0, ch);
      setTimeout(tick, wait);
    })();
  }
})();
