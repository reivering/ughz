/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT (V7)
 * Stability Focus: Fail-safes for preloader and reveal logic.
 * Stack: GSAP 3 + ScrollTrigger + Lenis
 */

// Global State
let animationsInitialized = false;

// ── LAUNCH LOGIC ──
function launchSite() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    console.log('ZEYNO: Launching site animations...');

    // 1. Reveal Elements that were hidden by preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        gsap.to(preloader, {
            yPercent: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                sessionStorage.setItem('zeyno_v7_loaded', '1');
                ScrollTrigger.refresh();
            }
        });
    }

    // 2. Start Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            smoothTouch: false,
            wheelMultiplier: 1.1
        });
        window.lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // 3. Trigger Sections
    initHeroReveal();
    initScrollAnimations();
    initHoverEffects();

    // 4. Force visible fallback for everything
    gsap.set('body', { opacity: 1 });
    setTimeout(() => ScrollTrigger.refresh(), 500);
}

// ── HERO REVEAL ──
function initHeroReveal() {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.add('nav-visible');

    const heroVideo = document.querySelector('.hero-video, .case-hero-bg video');
    if (heroVideo) heroVideo.play().catch(() => { });

    // Set initial states for animation (since CSS is default visible)
    gsap.set(['.hero-eyebrow', '.hero-tagline', '.hero-scroll'], { opacity: 0, y: 30 });
    gsap.set('.hero-title .line span', { y: '110%' });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to('.hero-title .line span', { y: '0%', stagger: 0.15 }, 0.4)
        .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.7 }, 0.8);
}

// ── SCROLL ANIMATIONS ──
function initScrollAnimations() {
    const revealItems = '.reveal, .stat-item, .footer-brand, .footer-col, .work-card, .pricing-card, .testi-card';

    // Initial state: subtle and safe
    gsap.set(revealItems, { opacity: 0, y: 30 });

    gsap.utils.toArray(revealItems).forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Fallback Reveal for all items after 4 seconds
    setTimeout(() => {
        gsap.to(revealItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, overwrite: 'auto' });
    }, 4000);

    // Horizontal Process Section
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
                invalidateOnRefresh: true
            }
        });
    }

    // Modal Triggers
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById('modal-overlay');
            if (modal) modal.classList.add('is-open');
        });
    });

    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            document.getElementById('modal-overlay').classList.remove('is-open');
        });
    }

    // Hamburger / Mobile Nav Triggers
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-nav-close');
    const mobileLinks = document.querySelectorAll('#mobile-nav a');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('is-open');
            hamburger.setAttribute('aria-expanded', 'true');
        });
    }

    const closeMobile = () => {
        if (mobileNav) {
            mobileNav.classList.remove('is-open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobile));
}

// ── HOVER EFFECTS ──
function initHoverEffects() {
    document.querySelectorAll('.work-card, .testi-card, .pricing-card').forEach(card => {
        if (card.classList.contains('featured')) return;
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.5, ease: 'power3.out' }));
    });
}

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        launchSite();
        return;
    }

    const tl = gsap.timeline();
    const plChars = document.querySelectorAll('.pl-char');
    const plLine = document.querySelector('.preloader-line');

    if (plChars.length && plLine) {
        tl.to(plChars, { y: '0%', duration: 0.8, ease: 'power4.out', stagger: 0.05 })
            .to('.preloader-sub', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
            .to(plLine, { width: '100%', duration: 1.5, ease: 'none' }, '-=0.1')
            .call(() => launchSite());
    } else {
        launchSite();
    }

    // Safety timeout: Ensure site launches no matter what
    setTimeout(() => {
        if (!animationsInitialized) {
            console.warn('ZEYNO: Preloader recovery triggered.');
            launchSite();
        }
    }, 5000);
});

// ── NAV & PROGRESS ──
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    const progress = document.getElementById('progress');
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) {
        if (scroll > 100) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');
    }
    if (progress) {
        const p = height > 0 ? (scroll / height) * 100 : 0;
        progress.style.width = p + '%';
    }
});

// ── CUSTOM CURSOR ──
(function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            opacity: 1,
            ease: 'power2.out'
        });
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .work-card, .pricing-card')) {
            cursor.classList.add('cursor-hover');
        } else {
            cursor.classList.remove('cursor-hover');
        }
    });

    // Fade out cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
})();