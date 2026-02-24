/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT
 * Final Stability Version: Resolves disappearing elements & scroll glitches
 * Stack: GSAP 3 + ScrollTrigger + Lenis
 */

// Global State
let animationsInitialized = false;

/* ============================================================
   1. LENIS SMOOTH SCROLL
   ============================================================ */
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => 1 - Math.pow(2, -10 * t),
    smoothTouch: false,
});

lenis.stop(); // held until preloader finishes

// Bridge Lenis → GSAP ScrollTrigger
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
 * Utility: Robust ScrollTrigger Refresh
 * Fired after assets load or layout changes
 */
const refreshScroll = () => {
    ScrollTrigger.refresh(true);
};

// Auto-refresh on layout changes
const resizeObserver = new ResizeObserver(() => refreshScroll());
resizeObserver.observe(document.body);

// Refresh on full asset load
window.addEventListener('load', () => refreshScroll());

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');

function initCursor() {
    if (!cursor || window.innerWidth <= 768) return;

    const state = {
        mouseX: 0, mouseY: 0, curX: 0, curY: 0, isActive: false,
    };

    gsap.set(cursor, { opacity: 0, xPercent: -50, yPercent: -50, scale: 1 });

    const onMouseMove = (e) => {
        if (!state.isActive) {
            state.isActive = true;
            gsap.to(cursor, { opacity: 1, duration: 0.4 });
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', () => gsap.to(cursor, { scale: 0.7, duration: 0.2 }));
    window.addEventListener('mouseup', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
        state.curX += (state.mouseX - state.curX) * dt;
        state.curY += (state.mouseY - state.curY) * dt;
        gsap.set(cursor, { x: state.curX, y: state.curY });
    });

    // Hover detection
    const hoverTargets = 'a, button, .work-card, .testi-card, .pricing-card, .nav-hamburger, .open-modal';
    const darkSections = '#cta-banner, #pricing, #footer, #preloader';

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

    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
        state.isActive = false;
    });
}

/* ============================================================
   3. PAGE REVEAL & TRANSITIONS
   ============================================================ */
function revealPage() {
    gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });
}

function launchSite() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    revealPage();
    lenis.start();
    initHeroReveal();
    initScrollAnimations();
    initHoverAnimations();

    // Final calculations after layout settles
    setTimeout(refreshScroll, 500);
}

// Hover effects using GSAP to prevent CSS conflicts
function initHoverAnimations() {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }));
    });

    document.querySelectorAll('.testi-card').forEach(card => {
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }));
    });
}

/* ============================================================
   4. PRELOADER
   ============================================================ */
const preloader = document.getElementById('preloader');
const plChars = document.querySelectorAll('.pl-char');
const plLine = document.querySelector('.preloader-line');
const plSub = document.querySelector('.preloader-sub');

document.addEventListener('DOMContentLoaded', () => {
    initCursor();

    if (!preloader) {
        launchSite();
        return;
    }

    const hasVisited = sessionStorage.getItem('zeyno_v2_loaded');
    const loaderDuration = hasVisited ? 1200 : 2500;

    const tl = gsap.timeline();

    tl.to(plChars, { y: '0%', duration: 0.8, ease: 'power4.out', stagger: 0.05 })
        .to(plSub, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(plLine, { width: '100%', duration: loaderDuration / 1000, ease: 'power1.inOut' }, '-=0.1')
        .to(preloader, {
            yPercent: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            onStart: () => launchSite(),
            onComplete: () => {
                preloader.style.display = 'none';
                refreshScroll();
                sessionStorage.setItem('zeyno_v2_loaded', '1');
            },
        });

    // Safety fallback
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.display = 'none';
            launchSite();
            refreshScroll();
        }
    }, 4500);
});

/* ============================================================
   5. HERO REVEAL
   ============================================================ */
function initHeroReveal() {
    const heroVideo = document.querySelector('.hero-video, .case-hero-bg video');
    if (heroVideo) heroVideo.play().catch(() => { });

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
            .to('.hero-title .line span', { y: '0%', stagger: 0.1 }, 0.2)
            .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.4)
            .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.7 }, 0.6);
    }
}

/* ============================================================
   6. SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
    // ── Generic Reveals ──
    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'all', // Critical: prevents disappearing after reveal
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
            },
        });
    });

    // ── Section Labels ──
    gsap.utils.toArray('.section-label').forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            x: -20,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
            },
        });
    });

    // ── Logos ──
    gsap.to('#logos', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '#logos', start: 'top 95%' },
    });

    // ── Process (Horizontal) ──
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
        });
    }

    // ── Grids & Items ──
    const workGrid = document.querySelector('.work-grid');
    if (workGrid) {
        gsap.to('.work-card', {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power4.out',
            clearProps: 'all',
            scrollTrigger: { trigger: workGrid, start: 'top 90%' },
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
            scrollTrigger: { trigger: statsGrid, start: 'top 90%' },
        });
    }

    document.querySelectorAll('.stat-counter').forEach((el) => {
        const target = parseFloat(el.dataset.target);
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
                        el.textContent = (target % 1 !== 0) ? counter.val.toFixed(1) : Math.ceil(counter.val);
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
            scrollTrigger: { trigger: pricingGrid, start: 'top 85%' },
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
            scrollTrigger: { trigger: testimonialGrid, start: 'top 85%' },
        });
    }

    // ── Footer ──
    gsap.to('.footer-brand, .footer-col', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '#footer', start: 'top 90%' },
    });

    // Hard refresh after 1.2s to ensure all videos/assets are sized
    setTimeout(refreshScroll, 1200);
}

/* ============================================================
   7. NAV & UTILS
   ============================================================ */
const navEl = document.getElementById('nav');
const progressBar = document.getElementById('progress');

lenis.on('scroll', ({ scroll, limit, progress }) => {
    // Nav shrink
    if (scroll > 80) navEl.classList.add('nav-scrolled');
    else navEl.classList.remove('nav-scrolled');

    // Progress bar
    if (progressBar) {
        progressBar.style.width = (progress * 100) + '%';
    }
});

// Mobile Nav
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-nav-close');

function openMobileNav() {
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

// Contact Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openModal() {
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeMobileNav();
}

function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach(btn => btn.addEventListener('click', openModal));
if (modalClose) modalClose.addEventListener('click', closeModal);

// Simple form handle
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('form-submit');
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#22a86b';
        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
            closeModal();
            form.reset();
        }, 2000);
    });
}

/* ============================================================
   8. SMOOTH ANCHOR LINKS
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