/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT
 * Stack: GSAP 3 + ScrollTrigger + Lenis
 * Revamped: Light theme, orange accent, preloader, modal
 */

/* ============================================================
   1. LENIS SMOOTH SCROLL
   ============================================================ */
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => 1 - Math.pow(2, -10 * t),
    smoothTouch: false,
});

lenis.stop(); // held until preloader finishes

// Bridge Lenis → GSAP ScrollTrigger (single RAF via GSAP ticker)
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Global ScrollTrigger config
ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
});

/**
 * Robust ScrollTrigger Refresh
 * Refreshes layout calculations after assets/layout stabilize
 */
const refreshScroll = () => {
    ScrollTrigger.refresh(true);
};

// Handle layout changes (e.g., lazy loaded images, font changes)
const resizeObserver = new ResizeObserver(() => {
    refreshScroll();
});
resizeObserver.observe(document.body);

// Refresh on full asset load (images, videos, fonts)
window.addEventListener('load', () => {
    refreshScroll();
});

/* ============================================================
   2. CUSTOM CURSOR & PAGE TRANSITIONS
   ============================================================ */
const cursor = document.getElementById('cursor');

/**
 * 2.1 CURSOR LOGIC
 */
function initCursor() {
    if (!cursor || window.innerWidth <= 768) return;

    const state = {
        mouseX: 0,
        mouseY: 0,
        curX: 0,
        curY: 0,
        isActive: false,
    };

    // Initial state: hidden
    gsap.set(cursor, {
        opacity: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 1,
    });

    const onMouseMove = (e) => {
        if (!state.isActive) {
            state.isActive = true;
            gsap.to(cursor, { opacity: 1, duration: 0.4 });
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
    };

    const onMouseDown = () => gsap.to(cursor, { scale: 0.7, duration: 0.2 });
    const onMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth movement
    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
        state.curX += (state.mouseX - state.curX) * dt;
        state.curY += (state.mouseY - state.curY) * dt;
        gsap.set(cursor, { x: state.curX, y: state.curY });
    });

    // Hover detection
    const hoverTargets = 'a, button, .work-card, .testi-card, .pricing-card, .process-step, .nav-hamburger, .open-modal';
    const darkSections = '#cta-banner, #pricing, #footer, #preloader, .case-hero, .case-quote, #page-curtain';

    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.closest(hoverTargets)) cursor.classList.add('cursor-hover');
        if (target.closest(darkSections)) cursor.classList.add('cursor-dark');
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.closest(hoverTargets)) cursor.classList.remove('cursor-hover');
        if (target.closest(darkSections)) cursor.classList.remove('cursor-dark');
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
        state.isActive = false;
    });
}

/**
 * 2.2 PAGE TRANSITIONS
 */
function revealPage() {
    const currentOpacity = gsap.getProperty('body', 'opacity');
    if (currentOpacity < 1) {
        gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });
    }
}

function exitPage(href) {
    gsap.to('body', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
            window.location.href = href;
        }
    });
}

// Global link interception for smooth transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link &&
        link.href &&
        link.href.includes(window.location.origin) &&
        !link.hash &&
        link.target !== '_blank' &&
        !link.classList.contains('no-transition')) {

        // Check if it's the same page
        const currentUrl = window.location.href.split('#')[0];
        const targetUrl = link.href.split('#')[0];

        if (currentUrl !== targetUrl) {
            e.preventDefault();
            exitPage(link.href);
        }
    }
});

/**
 * 2.3 CARD HOVER ANIMATIONS (GSAP-based to avoid CSS conflict)
 */
function initHoverAnimations() {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        });
    });

    document.querySelectorAll('.testi-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        });
    });

    document.querySelectorAll('.pricing-card:not(.featured)').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { backgroundColor: '#1a1a1a', duration: 0.3, overwrite: 'auto' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { backgroundColor: '#131313', duration: 0.3, overwrite: 'auto' });
        });
    });
}
initHoverAnimations();

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        revealPage();
        ScrollTrigger.refresh();
    }
});

initCursor();

/* ============================================================
   3. PRELOADER
   ============================================================ */
const preloader = document.getElementById('preloader');
const plChars = document.querySelectorAll('.pl-char');
const plLine = document.querySelector('.preloader-line');
const plSub = document.querySelector('.preloader-sub');

const hasVisited = sessionStorage.getItem('zeyno_v2_loaded');
const loaderDuration = hasVisited ? 1200 : 2500;

document.addEventListener('DOMContentLoaded', () => {
    if (!preloader) {
        revealPage();
        lenis.start();
        initHeroReveal();
        initScrollAnimations();
        setTimeout(() => ScrollTrigger.refresh(true), 200);
        return;
    }

    const tl = gsap.timeline();

    tl.to(plChars, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.05,
    })
        .to(plSub, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(plLine, {
            width: '100%',
            duration: loaderDuration / 1000,
            ease: 'power1.inOut',
        }, '-=0.1')
        .to(preloader, {
            yPercent: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            onStart: () => {
                revealPage();
                lenis.start();
                initHeroReveal();
                initScrollAnimations();
            },
            onComplete: () => {
                preloader.style.display = 'none';
                refreshScroll();
                sessionStorage.setItem('zeyno_v2_loaded', '1');
            },
        });

    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.display = 'none';
            revealPage();
            lenis.start();
            initHeroReveal();
            initScrollAnimations();
            refreshScroll();
        }
    }, 4500);
});

/* ============================================================
   4. HERO REVEAL
   ============================================================ */
function initHeroReveal() {
    const heroVideo = document.querySelector('.hero-video, .case-hero-bg video');
    if (heroVideo) {
        heroVideo.play().catch(() => { });
    }

    const nav = document.getElementById('nav');
    if (nav) nav.classList.add('nav-visible');

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    const isCaseStudy = document.querySelector('.case-hero');

    if (isCaseStudy) {
        tl.to('.case-hero-bg', { opacity: 1, duration: 1.5 }, 0)
            .to('.case-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
            .to('.case-title', { opacity: 1, y: 0, duration: 1 }, 0.4)
            .to('.case-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.6)
            .to('.case-meta-bar > div', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.8);
    } else {
        tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0)
            .to('.hero-title .line span', {
                y: '0%',
                stagger: 0.1,
            }, 0.2)
            .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.4)
            .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.7 }, 0.6);
    }

    setTimeout(() => ScrollTrigger.refresh(), 500);
}

/* ============================================================
   5. SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
}, { passive: true });

/* ============================================================
   6. NAV
   ============================================================ */
const nav = document.getElementById('nav');
lenis.on('scroll', ({ scroll }) => {
    if (scroll > 80) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

/* ============================================================
   7. MOBILE NAV
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-nav-close');

function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
});

/* ============================================================
   8. CONTACT MODAL
   ============================================================ */
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openModal() {
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeMobileNav();
}

function closeModal() {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach((btn) => {
    btn.addEventListener('click', openModal);
});
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

/* ============================================================
   9. CONTACT FORM SUBMIT
   ============================================================ */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const service = form.querySelector('[name="service"]').value;
        if (!name || !email || !service) {
            submitBtn.textContent = 'Please fill required fields';
            submitBtn.style.background = '#e05252';
            setTimeout(() => {
                submitBtn.textContent = 'Send Message →';
                submitBtn.style.background = '';
            }, 2500);
            return;
        }
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:';
        if (isLocal) {
            await new Promise((r) => setTimeout(r, 1000));
            onSuccess();
        } else {
            try {
                const body = new URLSearchParams(new FormData(form)).toString();
                const res = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    body,
                });
                if (res.ok) {
                    onSuccess();
                } else {
                    throw new Error('Server error');
                }
            } catch {
                onError();
            }
        }
    });
}

function onSuccess() {
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.style.background = '#22a86b';
    submitBtn.disabled = false;
    form.reset();
    setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        closeModal();
    }, 3000);
}

function onError() {
    submitBtn.textContent = 'Error — Try Again';
    submitBtn.style.background = '#e05252';
    submitBtn.disabled = false;
    setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
    }, 3000);
}

/* ============================================================
   10. SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {

    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
            },
        });
    });

    gsap.utils.toArray('.section-label').forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            x: -20,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });
    });

    gsap.to('#logos', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
            trigger: '#logos',
            start: 'top 95%',
        },
    });

    const track = document.querySelector('.process-track');
    const trackWrap = document.querySelector('.process-track-wrap');

    if (track && trackWrap && window.innerWidth > 768) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#process',
                start: 'top top',
                end: () => `+=${track.scrollWidth - trackWrap.offsetWidth + 800}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        tl.to(track, {
            x: () => -(track.scrollWidth - trackWrap.offsetWidth),
            ease: 'none',
            clearProps: 'transform'
        });
    }

    const workGrid = document.querySelector('.work-grid');
    if (workGrid) {
        gsap.to('.work-card', {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power4.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: workGrid,
                start: 'top 90%',
            },
        });
    }

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        gsap.to('.stat-item', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: statsGrid,
                start: 'top 90%',
            },
        });
    }

    document.querySelectorAll('.stat-counter').forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const isFloat = target % 1 !== 0;
        const counter = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    val: target,
                    duration: 2.0,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = isFloat
                            ? counter.val.toFixed(1)
                            : Math.ceil(counter.val);
                    },
                });
            },
        });
    });

    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        gsap.to('.pricing-card', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: pricingGrid,
                start: 'top 85%',
            },
        });
    }

    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (testimonialGrid) {
        gsap.to('.testi-card', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: testimonialGrid,
                start: 'top 85%',
            },
        });
    }

    if (document.querySelector('.cta-title')) {
        gsap.from('.cta-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '#cta-banner',
                start: 'top 85%',
            },
        });
    }

    if (document.querySelector('.cta-btns')) {
        gsap.from('.cta-btns', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: '#cta-banner',
                start: 'top 80%',
            },
        });
    }

    gsap.fromTo('.hero-bg',
        { yPercent: -10 },
        {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        }
    );

    gsap.to('.footer-brand, .footer-col', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
            trigger: '#footer',
            start: 'top 90%',
        },
    });

    setTimeout(() => {
        refreshScroll();
        console.log("ScrollTrigger Hard Refresh");
    }, 1200);
}

/* ============================================================
   11. SMOOTH ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const target = anchor.getAttribute('href');
        if (target === '#') return;
        const el = document.querySelector(target);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    });
});