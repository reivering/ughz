/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT
 * Stack: GSAP + ScrollTrigger + Lenis
 */

/* ============================================================
   1. LENIS SMOOTH SCROLL
   ============================================================ */
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
(function animateCursor() {
    curX += (mouseX - curX) * 0.25;
    curY += (mouseY - curY) * 0.25;
    if (cursor) {
        cursor.style.left = curX + 'px';
        cursor.style.top = curY + 'px';
    }
    requestAnimationFrame(animateCursor);
})();

// Hover states
document.querySelectorAll('a, button, .service-card, .work-item, .team-card, .btn-submit').forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-hover'));
});

/* ============================================================
   3. LOADER
   ============================================================ */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    const tl = gsap.timeline({
        onComplete: () => {
            lenis.start();
            initScrollAnimations();
        }
    });

    // Wait for cinematic video to play, then exit
    tl.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 2 // Show video for 2 seconds
    });

    // Hero entrance
    tl.from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

    tl.to('.hero-title .line span', {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
    }, '-=0.6');

    tl.from('.hero-tagline', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.8');

    tl.from('.hero-scroll-hint', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4');

    tl.to('#nav', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.8');
});

// Disable scroll during load
lenis.stop();

/* ============================================================
   4. SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
});

/* ============================================================
   5. SCROLL ANIMATIONS (called after loader)
   ============================================================ */
function initScrollAnimations() {

    // --- About headline word reveal ---
    document.querySelectorAll('.about-headline .word span').forEach((span, i) => {
        gsap.to(span, {
            y: '0%',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: span.closest('.about-headline'),
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.08
        });
    });

    // --- About text fade ---
    gsap.from('.about-text', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#about',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Stats count up ---
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };
        gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate() {
                el.textContent = Math.ceil(counter.val) + suffix;
            },
            onStart() {
                el.textContent = '0' + suffix;
            }
        });
    });

    // --- Services cards stagger ---
    gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Work items stagger ---
    gsap.from('.work-item', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.work-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Quote text cinematic reveal ---
    gsap.from('.quote-text', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '#quotes',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Statement rows slide in ---
    document.querySelectorAll('.statement-row').forEach((row, i) => {
        gsap.from(row, {
            x: i % 2 === 0 ? -60 : 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // --- Testimonials fade in ---
    gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Team cards ---
    gsap.from('.team-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Contact headline reveal ---
    gsap.to('.contact-headline .line span', {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Contact form fields ---
    gsap.from('.form-field', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Section titles generic ---
    document.querySelectorAll('.section-title').forEach(el => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // --- Parallax hero bg ---
    gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Marquee runs at constant speed via CSS animation (no JS override)
}

/* ============================================================
   6. WORK ITEM HOVER PREVIEW
   ============================================================ */
const preview = document.getElementById('workPreview');
if (preview) {
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            preview.classList.add('visible');
        });
        item.addEventListener('mouseleave', () => {
            preview.classList.remove('visible');
        });
        item.addEventListener('mousemove', (e) => {
            preview.style.left = (e.clientX + 30) + 'px';
            preview.style.top = (e.clientY - 80) + 'px';
        });
    });
}

/* ============================================================
   7. CONTACT FORM SUBMIT
   ============================================================ */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalContent = btn.innerHTML;

        btn.textContent = 'SENDING...';
        btn.disabled = true;

        // Detect local/non-Netlify environment — form only works on live Netlify site
        const isLocal = window.location.hostname === 'localhost'
            || window.location.hostname === '127.0.0.1'
            || window.location.protocol === 'file:';

        if (isLocal) {
            // Show success UI locally without actually submitting
            setTimeout(() => {
                btn.textContent = 'SENT ✓';
                btn.style.background = '#000';
                btn.style.color = '#fff';
                btn.style.outline = '1px solid #fff';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style = '';
                    btn.disabled = false;
                }, 4000);
            }, 800);
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                btn.textContent = 'SENT ✓';
                btn.style.background = '#000';
                btn.style.color = '#fff';
                btn.style.outline = '1px solid #fff';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (err) {
            console.error('Form submission failed:', err);
            btn.textContent = 'ERROR — TRY AGAIN';
            btn.style.outline = '1px solid red';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

/* ============================================================
   8. SECTION LABEL ANIMATIONS
   ============================================================ */
gsap.utils.toArray('.section-label, .about-label').forEach(el => {
    gsap.from(el, {
        opacity: 0,
        x: -20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

/* ============================================================
   9. MOBILE HAMBURGER MENU
   ============================================================ */
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-cta');

function openMobileNav() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileNav.classList.contains('is-open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });
}

// Close menu when a link is tapped
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});
