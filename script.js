document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    const closeMenu = () => { mobileMenu.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); };
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.favorites, .price-section, .coupons, .promotions, .location, .stack-grid');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    revealTargets.forEach((target) => {
      if (!target.classList.contains('stack-grid')) target.classList.add('reveal-on-scroll');
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const dialog = document.querySelector('.gallery-dialog');
  if (!dialog) return;
  const galleries = {
    seafood: { title: 'Seafood', images: [
      ['./images/seafood-new-01.png', 'Fresh oysters on ice with lemon'],
      ['./images/seafood-new-02.png', 'Grilled salmon, lobster tail and shrimp'],
      ['./images/seafood-new-03.png', 'Buffet seafood station with crawfish and shrimp'],
      ['./assets/hero-seafood.jpg', 'Crab, shrimp, crawfish and corn seafood feast'],
      ['./images/drive-08.jpg', 'Hot seafood buffet selection'],
      ['./images/drive-09.jpg', 'Seasoned seafood at the buffet'],
      ['./images/drive-10.jpg', 'Crab legs and seafood buffet']
    ]},
    sushi: { title: 'Sushi', images: [
      ['./images/sushi-new-03.png', 'Assorted sushi rolls and nigiri platter'],
      ['./images/sushi-new-04.png', 'Close-up shrimp sushi roll'],
      ['./images/sushi-new-05.png', 'Salmon and specialty sushi rolls'],
      ['./images/sushi-new-02.png', 'Fresh sushi rolls at the buffet']
    ]},
    hibachi: { title: 'Hibachi', images: [
      ['./images/hibachi-new-01.png', 'Hibachi chef flame-grilling at the table'],
      ['./images/hibachi-new-02.png', 'Hibachi grill with fried rice, noodles, steak and shrimp'],
      ['./images/hibachi-new-03.png', 'Hibachi plate with steak, shrimp and fried rice'],
      ['./images/drive-05.jpg', 'Flaming Grill hibachi station']
    ]}
  };
  const title = dialog.querySelector('#gallery-title');
  const mainImage = dialog.querySelector('.gallery-main');
  const count = dialog.querySelector('.gallery-count');
  const thumbs = dialog.querySelector('.gallery-thumbs');
  let activeGallery = null;
  let activeIndex = 0;

  const render = () => {
    if (!activeGallery) return;
    const [src, alt] = activeGallery.images[activeIndex];
    mainImage.src = src; mainImage.alt = alt;
    count.textContent = `${activeIndex + 1} of ${activeGallery.images.length}`;
    thumbs.querySelectorAll('button').forEach((button, index) => {
      button.classList.toggle('active', index === activeIndex);
      button.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });
  };
  const buildThumbs = () => {
    thumbs.replaceChildren();
    activeGallery.images.forEach(([src], index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.setAttribute('aria-label', `Show photo ${index + 1}`);
      const image = document.createElement('img'); image.src = src; image.alt = '';
      button.append(image);
      button.addEventListener('click', () => { activeIndex = index; render(); });
      thumbs.append(button);
    });
  };
  const move = (amount) => { activeIndex = (activeIndex + amount + activeGallery.images.length) % activeGallery.images.length; render(); };

  document.querySelectorAll('.photo-stack').forEach((stack) => stack.addEventListener('click', () => {
    activeGallery = galleries[stack.dataset.gallery]; activeIndex = 0;
    title.textContent = activeGallery.title; buildThumbs(); render(); dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('.gallery-prev').addEventListener('click', () => move(-1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => move(1));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
});
