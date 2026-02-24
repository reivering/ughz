/**
 * ZEYNO — MAIN ANIMATION & INTERACTION SCRIPT (V6)
 * Visibility Safety: Starts visible, animates if libraries are healthy.
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
                sessionStorage.setItem('zeyno_v2_loaded', '1');
            }
        });
    }

    // 2. Start Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, smoothTouch: false });
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
    // Reveal defaults for items
    const revealItems = '.reveal, .stat-item, .footer-brand, .footer-col, .work-card, .pricing-card, .testi-card';

    // Hide them first to animate 'in'
    gsap.set(revealItems, { opacity: 0, y: 40 });

    gsap.utils.toArray(revealItems).forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Horizontal Process
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
                pin: true, scroll: window, scrub: 1, invalidateOnRefresh: true
            }
        });
    }

    // Refresh everything
    setTimeout(() => ScrollTrigger.refresh(), 1000);
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
    // Preloader steps
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        launchSite();
        return;
    }

    const tl = gsap.timeline();
    const plChars = document.querySelectorAll('.pl-char');
    const plLine = document.querySelector('.preloader-line');

    tl.to(plChars, { y: '0%', duration: 0.8, ease: 'power4.out', stagger: 0.05 })
        .to('.preloader-sub', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(plLine, { width: '100%', duration: 2, ease: 'none' }, '-=0.1')
        .call(() => launchSite());

    // Safety timeout
    setTimeout(() => {
        if (!animationsInitialized) {
            console.warn('ZEYNO: Preloader recovery triggered.');
            launchSite();
        }
    }, 5000);
});

// ── NAV SCRULL UTILS ──
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

// ── UTILITY: CURSOR ──
(function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, opacity: 1 });
    });
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .work-card')) cursor.classList.add('cursor-hover');
        else cursor.classList.remove('cursor-hover');
    });
})();