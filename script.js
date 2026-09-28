document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.reveal');

    document.querySelectorAll('.phone-trigger').forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const phone = trigger.dataset.phone;
            const shouldCall = window.confirm(`Flaming Grill phone number: ${phone}\n\nPress OK to call.`);
            if (shouldCall) {
                window.location.href = trigger.href;
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (menuToggle && siteMenu) {
        const closeMenu = () => {
            siteMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = siteMenu.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    }

    document.querySelectorAll('button, .promo-button, .branch-button, .register-submit, .cta-button').forEach((button) => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.97)';
            setTimeout(() => {
                this.style.transform = '';
            }, 180);
        });
    });

    const registerForm = document.querySelector('.register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach((input) => {
                input.style.borderColor = '#4CAF50';
            });

            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(76, 175, 80, 0.96);
                color: white;
                padding: 1.5rem 2.2rem;
                border-radius: 14px;
                font-size: 1.05rem;
                font-weight: 700;
                z-index: 9999;
                box-shadow: 0 24px 45px rgba(0, 0, 0, 0.24);
            `;
            successMsg.textContent = 'Thank you for joining Flaming Grill.';
            document.body.appendChild(successMsg);

            setTimeout(() => {
                successMsg.remove();
                inputs.forEach((input) => {
                    input.value = '';
                    input.style.borderColor = '';
                });
            }, 2500);
        });
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => imageObserver.observe(element));

    document.querySelectorAll('img').forEach((img) => {
        img.loading = 'lazy';
        img.addEventListener('error', function () {
            this.style.background = 'linear-gradient(135deg, rgba(216,64,45,0.12), rgba(255,157,87,0.08))';
            this.style.border = '1px solid rgba(255,255,255,0.08)';
        });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 20 ? '0 14px 40px rgba(0, 0, 0, 0.22)' : '0 10px 28px rgba(0, 0, 0, 0.18)';
});

console.log('%c🔥 Welcome to Flaming Grill', 'font-size: 24px; color: #ff9d57; font-weight: bold;');
console.log('%cFire-kissed flavors, made unforgettable.', 'font-size: 14px; color: #d8402d;');
