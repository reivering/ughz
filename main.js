/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT (V5)
 * Final Stability Version: Resolves disappearing elements & initialization glitches
 * Stack: GSAP 3 + ScrollTrigger + Lenis
 */

// Safety: check if libraries are loaded
if (typeof gsap === 'undefined' || typeof Lenis === 'undefined') {
    console.error('ZEYNO: Essential libraries (GSAP or Lenis) failed to load.');
    document.body.style.opacity = '1'; // Force reveal if libraries fail
}

/* ============================================================
   1. LENIS SMOOTH SCROLL
   ============================================================ */
let lenis;
try {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
    });
    lenis.stop(); // held until launch
} catch (e) {
    console.warn('Lenis scroll failed to init:', e);
}

// Global ScrollTrigger config
gsap.registerPlugin(ScrollTrigger);

if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
});

/**
 * Utility: Robust ScrollTrigger Refresh
 */
const refreshScroll = () => {
    ScrollTrigger.refresh(true);
};

// Auto-refresh on layout changes
const resizeObserver = new ResizeObserver(() => refreshScroll());
resizeObserver.observe(document.body);
window.addEventListener('load', () => setTimeout(refreshScroll, 500));

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;

    const state = { mouseX: 0, mouseY: 0, curX: 0, curY: 0, isActive: false };
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
    window.addEventListener('mousedown', () => gsap.to(cursor, { scale: 0.8, duration: 0.2 }));
    window.addEventListener('mouseup', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
        state.curX += (state.mouseX - state.curX) * dt;
        state.curY += (state.mouseY - state.curY) * dt;
        gsap.set(cursor, { x: state.curX, y: state.curY });
    });

    // Hover detection
    const hoverTargets = 'a, button, .work-card, .testi-card, .pricing-card, .nav-hamburger, .open-modal';
    const darkSections = '#cta-banner, #pricing, #footer, #preloader, .case-hero, .case-quote';

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
}

/* ============================================================
   3. SITE LAUNCH & REVEAL
   ============================================================ */
let animationsInitialized = false;

function launchSite() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    // 1. Reveal Body
    gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });

    // 2. Start Scroll
    if (lenis) lenis.start();

    // 3. Init All Sections
    initHeroReveal();
    initScrollAnimations();
    initHoverEffects();

    // 4. Final Sync
    setTimeout(refreshScroll, 800);
}

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
            .to('.hero-title .line span', { y: '0%', stagger: 0.12 }, 0.3)
            .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.6)
            .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.7 }, 0.8);
    }
}

// Hover effects via GSAP (avoids CSS transition conflicts)
function initHoverEffects() {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }));
    });

    document.querySelectorAll('.testi-card, .pricing-card').forEach(card => {
        if (card.classList.contains('featured')) return;
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }));
    });
}

/* ============================================================
   4. PRELOADER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initCursor();

    const preloader = document.getElementById('preloader');
    if (!preloader) {
        launchSite();
        return;
    }

    const hasVisited = sessionStorage.getItem('zeyno_v2_loaded');
    const loaderDuration = hasVisited ? 1500 : 3000;

    const tl = gsap.timeline();
    const plChars = document.querySelectorAll('.pl-char');
    const plLine = document.querySelector('.preloader-line');
    const plSub = document.querySelector('.preloader-sub');

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

    // Forced Safety Reveal
    setTimeout(() => {
        if (!animationsInitialized) {
            console.warn('ZEYNO: Preloader timed out. Forcing reveal.');
            if (preloader) preloader.style.display = 'none';
            launchSite();
        }
    }, 5000);
});

/* ============================================================
   5. SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
    // ── Generic Item Reveals ──
    const reveals = gsap.utils.toArray('.reveal, .stat-item, .footer-brand, .footer-col');
    reveals.forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
            }
        });
    });

    // ── Horizontal Process Scroll ──
    const track = document.querySelector('.process-track');
    const wrap = document.querySelector('.process-track-wrap');
    if (track && wrap && window.innerWidth > 768) {
        gsap.to(track, {
            x: () => -(track.scrollWidth - wrap.offsetWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '#process',
                start: 'top top',
                end: () => `+=${track.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }

    // ── Staggered Lists ──
    const grids = [
        { grid: '.work-grid', items: '.work-card' },
        { grid: '.pricing-grid', items: '.pricing-card' },
        { grid: '.testimonials-grid', items: '.testi-card' }
    ];

    grids.forEach(g => {
        const gridEl = document.querySelector(g.grid);
        if (gridEl) {
            gsap.to(g.items, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'all',
                scrollTrigger: { trigger: gridEl, start: 'top 85%' }
            });
        }
    });

    // ── Stats Counter ──
    document.querySelectorAll('.stat-counter').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const obj = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = (target % 1 !== 0) ? obj.val.toFixed(1) : Math.ceil(obj.val);
                    }
                });
            }
        });
    });

    // ── Logo Strip ──
    gsap.to('#logos', {
        opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '#logos', start: 'top 95%' }
    });

    // ── Parallax Hero ──
    gsap.to('.hero-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });
}

/* ============================================================
   6. NAVIGATION & UTILS
   ============================================================ */
// Nav Scroll State
if (lenis) {
    lenis.on('scroll', ({ scroll, progress }) => {
        const nav = document.getElementById('nav');
        const bar = document.getElementById('progress');
        if (nav) {
            if (scroll > 100) nav.classList.add('nav-scrolled');
            else nav.classList.remove('nav-scrolled');
        }
        if (bar) bar.style.width = (progress * 100) + '%';
    });
}

// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-nav-close');

function toggleMobileNav(open) {
    if (open) {
        mobileNav.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

if (hamburger) hamburger.addEventListener('click', () => toggleMobileNav(true));
if (mobileClose) mobileClose.addEventListener('click', () => toggleMobileNav(false));
document.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', () => toggleMobileNav(false)));

// Modal Toggle
const modal = document.getElementById('modal-overlay');
function toggleModal(open) {
    if (open) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        toggleMobileNav(false);
    } else {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('.open-modal').forEach(b => b.addEventListener('click', () => toggleModal(true)));
document.getElementById('modal-close').addEventListener('click', () => toggleModal(false));
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) toggleModal(false); });

// Smooth Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target && lenis) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        }
    });
});