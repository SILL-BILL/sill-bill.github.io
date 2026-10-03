const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const mobile = window.matchMedia('(max-width: 760px)');

if (header && document.body.classList.contains('home')) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('pageshow', updateHeader);
}

if (header && toggle && nav) {
  const links = [...nav.querySelectorAll('a')];
  let opened = false;
  function setOpen(value, restoreFocus = false) {
    opened = value && mobile.matches;
    header.classList.toggle('menu-open', opened);
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'メニューを閉じる' : 'メニューを開く');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    setOpen(!opened);
    if (opened) links[0].focus();
  });
  document.addEventListener('keydown', event => {
    if (!opened) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, true);
    }
    if (event.key === 'Tab') {
      const items = [toggle, ...links];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  document.addEventListener('click', event => {
    if (opened && !header.contains(event.target)) {
      setOpen(false, true);
    }
  });
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  mobile.addEventListener('change', () => {
    setOpen(false, mobile.matches && nav.contains(document.activeElement));
  });
  header.classList.add('nav-ready');
}
