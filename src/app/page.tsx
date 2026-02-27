"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef } from "react";

const InversionLens = dynamic(() => import("@/components/InversionLens"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse rounded-2xl" />,
});

/* ─── Reusable animated section wrapper ─── */
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <main className="w-full relative bg-[#0a0a0a] overflow-hidden">

      {/* ═══════════════════════════════════════════
          1. HERO — immersive, cinematic, dark
      ═══════════════════════════════════════════ */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden bg-black z-0">

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 120, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="absolute top-[-20%] left-[-15%] w-[60vw] h-[60vw] bg-[#FF661A]/30 blur-[160px] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.6, 1], rotate: [0, -100, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] bg-[#FF661A]/20 blur-[180px] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            className="absolute top-[40%] right-[20%] w-[30vw] h-[30vw] bg-purple-600/15 blur-[120px] rounded-full mix-blend-screen"
          />
        </div>

        {/* Video BG */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full z-0 opacity-30 mix-blend-overlay pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover filter contrast-125 saturate-50">
            <source src="/loader.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Grid overlay pattern */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Hero content */}
        <motion.div style={{ y: heroY }} className="relative z-10 flex flex-col items-center text-center text-white max-w-5xl mt-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 px-5 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] font-semibold text-white/70 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF661A] animate-pulse" />
            Strategic Design Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-8 relative"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -left-4 md:-top-12 md:-left-12 text-[#FF661A]"
            >
              <Sparkle size={48} fill="#FF661A" className="md:w-16 md:h-16" />
            </motion.div>

            Strategic Design for <br className="hidden md:block" />
            <span className="text-gradient-animated italic font-light">bold</span> brands.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-2xl font-medium max-w-2xl text-balance text-white/60 px-4"
          >
            A global branding agency for businesses ready to evolve, stand out, and dominate their market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link href="#work" className="w-full sm:w-auto">
              <button className="w-full bg-[#FF661A] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#111] transition-all duration-300 glow-brand hover:shadow-none text-sm sm:text-base">
                View Our Work
              </button>
            </Link>
            <Link href="#contact" className="w-full sm:w-auto">
              <button className="w-full border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base">
                Let&apos;s Talk
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#FF661A] to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. MARQUEE STRIP — energy break
      ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-4 md:py-6 bg-[#FF661A] overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-8 text-black font-bold text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap px-3 md:px-4">
              <span>Strategy</span> <span className="text-black/30">✦</span>
              <span>Branding</span> <span className="text-black/30">✦</span>
              <span>Identity</span> <span className="text-black/30">✦</span>
              <span>Web Design</span> <span className="text-black/30">✦</span>
              <span>Digital Experience</span> <span className="text-black/30">✦</span>
              <span>Creative Direction</span> <span className="text-black/30">✦</span>
              <span>Motion</span> <span className="text-black/30">✦</span>
              <span>Development</span> <span className="text-black/30">✦</span>
              <span>Social Media</span> <span className="text-black/30">✦</span>
              <span>SEO</span> <span className="text-black/30">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. INTRO / ABOUT — dark, textured
      ═══════════════════════════════════════════ */}
      <section className="relative w-full z-10 bg-[#0a0a0a] overflow-hidden" id="about">
        {/* Ambient glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF661A]/5 blur-[150px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 12s ease-in-out infinite reverse' }} />

        <div className="relative w-full py-16 md:py-40 px-6 md:px-12 text-white overflow-hidden">

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-24 relative z-10 items-start">
            <div className="w-full md:w-1/2 flex flex-col items-start relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                className="w-4 h-4 bg-[#FF661A] rounded-full mb-6 md:mb-12 glow-brand"
              />
              <RevealSection>
                <h2 className="text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] font-bold tracking-[-0.04em] text-white">
                  Building <br />
                  brands with <br />
                  <span className="text-gradient-animated italic font-light">intention.</span>
                </h2>
              </RevealSection>
            </div>
            <RevealSection delay={0.2} className="w-full md:w-1/2 md:pt-24">
              <p className="text-[clamp(1.1rem,2.2vw,1.75rem)] leading-[1.4] tracking-[-0.02em] font-medium text-balance text-white/50">
                We partner with founders, executives, and ambitious teams to clarify vision, sharpen positioning, and build brands that stand the test of time. From early-stage ventures to global innovators, we translate complexity into clear narratives, systems, and experiences.
              </p>
            </RevealSection>
          </div>

          {/* Value Columns */}
          <div className="hr-gradient max-w-[1400px] mx-auto mt-12 md:mt-32" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-[1400px] mx-auto pt-8 md:pt-24 relative z-10 pb-8 md:pb-24 px-2 md:px-12">
            <ValueColumn
              title="End-to-End"
              text="From strategic thinking to brand identity to high-performance digital builds. Every project is approached with precision, depth, and intent."
              delay={0}
              number="01"
            />
            <ValueColumn
              title="Flexible By Design"
              text="We don't count hours or inflate scope. Our model adapts to real needs, leaving room for iteration and evolution."
              delay={0.1}
              number="02"
            />
            <ValueColumn
              title="Always in Control"
              text="Nothing is locked in. Scale up, slow down, pause, or change direction — you stay in control at every stage."
              delay={0.2}
              number="03"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. VIDEO DIVIDER — Cinematic fullscreen
      ═══════════════════════════════════════════ */}
      <section className="sticky top-0 w-full h-[70svh] md:h-[100svh] z-0 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#FF661A]/5 mix-blend-overlay z-[5] pointer-events-none" />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
        >
          <source src="/content.mp4" type="video/mp4" />
        </video>
        {/* Center text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-white text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[-0.03em] text-center drop-shadow-2xl"
          >
            Crafting experiences <br />
            <span className="text-[#FF661A] italic font-light">that resonate.</span>
          </motion.h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SELECTED WORKS — dark, premium grid
      ═══════════════════════════════════════════ */}
      <section className="relative w-full pt-16 md:pt-40 pb-20 md:pb-48 px-4 md:px-12 text-white z-10 bg-[#0a0a0a] overflow-hidden" id="work">
        {/* Ambient */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/5 blur-[180px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 10s ease-in-out infinite' }} />

        {/* Works heading */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-12 md:mb-32 relative z-10 px-2 md:px-0">
          <RevealSection>
            <h2 className="text-[clamp(3rem,10vw,8rem)] leading-[0.9] font-medium tracking-[-0.04em] mb-8 md:mb-0 text-white">
              Selected<br />
              <span className="text-gradient-animated italic font-light">Works</span>
            </h2>
          </RevealSection>
          <RevealSection delay={0.2} className="flex flex-col max-w-sm mt-auto">
            <h3 className="text-lg md:text-xl font-medium mb-3 flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-[#FF661A] rounded-full inline-block animate-pulse" />
              Work
            </h3>
            <p className="text-white/40 text-base md:text-lg leading-relaxed text-balance">
              A curated selection of projects where strategy, design, and craft come together to create impact.
            </p>
          </RevealSection>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-48 relative z-10">
          <WorkCard title="Now by Sahr Khimji" tags="E-commerce · Luxury" src="/sahr.mp4" slug="sahr" delay={0} />
          <WorkCard title="CHITZ.FIT" tags="Branding · Web Dev" src="/chitz.mp4" slug="chitz" delay={0.1} />
          <WorkCard title="Social Media & SEO" tags="Digital Marketing · Content" src="/content.mp4" slug="social-seo" delay={0.2} />
          {/* Cyril */}
          <WorkCard title="Cyril's Portfolio" tags="Personal Branding · Portfolio" src="/cyril.mp4" slug="cyril" delay={0.3} />
          {/* LOOP */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] aspect-[4/3] flex flex-col items-center justify-center text-white gap-3"
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              🚧
            </motion.span>
            <span className="text-xl font-bold tracking-tight uppercase">LOOP Marketplace</span>
            <span className="text-xs text-white/30 font-medium uppercase tracking-widest">Under Construction</span>
            <span className="w-2 h-2 bg-[#FF661A] rounded-full animate-pulse mt-1 glow-brand" />
          </motion.div>
        </div>

        {/* ─── Services ─── */}
        <div id="services" className="pt-12 md:pt-24 relative z-10">
          <div className="hr-gradient mb-12 md:mb-24" />

          <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-32 gap-8 md:gap-12 px-2 md:px-0">
            <RevealSection className="max-w-4xl">
              <h2 className="text-[clamp(2rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] font-medium text-balance text-white">
                We work at the intersection of strategy, identity, and experience to shape brands with <span className="text-gradient-animated italic">meaning.</span>
              </h2>
            </RevealSection>
            <RevealSection delay={0.2} className="flex flex-col max-w-sm gap-3 text-base md:text-lg text-white/40">
              <p>We help brands define who they are, why they exist.</p>
              <p>At the intersection of strategy, branding, and design, we work with founders to build identities that are clear, distinctive, and built to last.</p>
            </RevealSection>
          </div>

          {/* Service cards — mobile gets bordered cards instead of plain rows */}
          <div className="flex flex-col w-full gap-3 md:gap-0">
            <ServiceRow number="01" title="Branding Identity" items={["Brand strategy", "Positioning & messaging", "Visual identity systems", "Brand guidelines"]} />
            <ServiceRow number="02" title="Visual Design" items={["Art direction", "Editorial layouts", "Typography systems", "Print & digital assets"]} />
            <ServiceRow number="03" title="Digital Experience" items={["Website design", "Motion & animation", "Interactive storytelling", "Performance-driven builds"]} />
            <ServiceRow number="04" title="Creative Direction" items={["Creative concepts", "Editorial vision", "Campaign direction", "Cross-media consistency"]} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. PROCESS — dark panels with glow
      ═══════════════════════════════════════════ */}
      <section className="relative w-full py-16 md:py-40 px-4 md:px-12 bg-[#0a0a0a] text-white z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] bg-[#FF661A]/5 blur-[150px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 10s ease-in-out infinite' }} />

        <div className="max-w-[1400px] mx-auto">
          <RevealSection className="mb-10 md:mb-24 px-2 md:px-0">
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.04em]">
              Our <span className="text-gradient-animated italic font-light">Process</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <ProcessCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>}
              title="Strategy"
              timeline="3-4 Days"
              description="In a comprehensive workshop, we'll set the baseline together. By analyzing your business, we develop a clear website strategy and compelling copywriting."
              number="01"
              delay={0}
            />
            <ProcessCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
              title="Design"
              timeline="4-6 Days"
              description="Building on the strategic foundation, we serve the winning shot – the web design. Every detail is carefully crafted to create an immersive experience."
              number="02"
              delay={0.15}
            />
            <ProcessCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
              title="Development"
              timeline="3-4 Days"
              description="Your website will be developed with precision. We focus on performance-driven development ensuring your site delivers a seamless experience."
              number="03"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. PRICING — premium dark cards
      ═══════════════════════════════════════════ */}
      <section className="relative w-full py-20 md:py-48 px-4 md:px-12 bg-[#0a0a0a] text-white z-10" id="pricing">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-32 gap-6 md:gap-8 px-2 md:px-0">
            <RevealSection>
              <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.04em]">
                Invest in<br />
                <span className="text-gradient-animated italic font-light">your brand.</span>
              </h2>
            </RevealSection>
            <RevealSection delay={0.2}>
              <p className="text-base md:text-lg text-white/30 max-w-sm mt-auto">
                Transparent pricing. No hidden fees. Choose the level of partnership that fits your ambition.
              </p>
            </RevealSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <PricingCard name="Branding" price="3,000" features={["Brand Strategy & Positioning", "Logo & Visual Identity", "Typography & Color System", "Brand Guidelines Document", "Social Media Kit"]} />
            <PricingCard name="Social Media" price="1,300" featured features={["Content Strategy", "12 Posts / Month", "Story & Reel Design", "Community Management", "Monthly Analytics Report"]} />
            <PricingCard name="Web Dev" price="1,400 – 5,000" features={["Custom Design & Dev", "Responsive Build", "CMS Integration", "Performance Optimization", "3 Rounds of Revisions"]} />
          </div>

          {/* Custom Quote CTA */}
          <RevealSection className="mt-6 md:mt-8 px-2 md:px-0">
            <div className="rounded-2xl glass-brand p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-2">Need something custom?</h3>
                <p className="text-white/40 text-base md:text-lg">Full-stack projects, retainers, or multi-service bundles — let&apos;s build a plan that fits.</p>
              </div>
              <a
                href="mailto:hello@zeyno.my"
                className="w-full md:w-auto text-center bg-[#FF661A] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap glow-brand hover:shadow-none"
              >
                Get a Quote →
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

    </main>
  );
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS — mobile-first design
───────────────────────────────────────── */

function ValueColumn({ title, text, delay, number }: { title: string; text: string; delay: number; number: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 relative p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FF661A]/30 transition-all duration-500"
    >
      {/* Number + gradient line */}
      <div className="flex items-center gap-3 mb-1">
        <span className="text-[#FF661A] text-2xl md:text-sm font-bold tracking-widest">{number}</span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#FF661A]/40 to-transparent" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h3>
      <p className="text-white/40 text-base md:text-lg leading-relaxed text-balance">
        {text}
      </p>
    </motion.div>
  );
}

function WorkCard({ title, tags, src, slug, delay }: { title: string; tags: string; src: string; slug: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden bg-[#111] aspect-[4/3] cursor-pointer border border-white/[0.06] hover:border-[#FF661A]/30 transition-all duration-500"
    >
      <Link href={`/work/${slug}`} className="block w-full h-full">
        <InversionLens src={src} type="video" className="w-full h-full" />
        {/* Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 z-10 md:translate-y-2 md:group-hover:translate-y-0">
          <p className="text-white font-bold text-base md:text-lg">{title}</p>
          <p className="text-white/50 text-xs md:text-sm">{tags}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceRow({ number, title, items }: { number: string; title: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row justify-between items-start 
        /* Mobile: bordered card */
        p-5 md:py-12 md:px-12 md:p-0
        rounded-2xl md:rounded-none
        bg-white/[0.03] md:bg-transparent
        border border-white/[0.06] md:border-0 md:border-t md:border-white/[0.06]
        /* Desktop hover */
        md:hover:bg-[#FF661A] md:hover:text-white md:-mx-12
        transition-all duration-500 group relative overflow-hidden"
    >
      {/* Orange left accent bar on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF661A] to-[#FF661A]/20 rounded-l-xl md:hidden" />

      <div className="flex gap-4 md:gap-8 mb-4 md:mb-0 w-full md:w-1/2 relative z-10">
        <span className="text-lg md:text-xl font-bold text-[#FF661A] md:group-hover:text-white/70 w-8 pt-1 md:pt-2 md:pt-4 transition-colors">
          {number}
        </span>
        <h3 className="text-[clamp(1.8rem,4vw,4rem)] leading-none tracking-tight font-medium text-white md:group-hover:text-white transform md:group-hover:translate-x-4 transition-all duration-500">
          {title}
        </h3>
      </div>
      <div className="flex flex-col w-full md:w-1/2 pl-12 md:pl-0 pt-1 md:pt-2 md:pt-4 relative z-10">
        <ul className="flex flex-col gap-2 md:gap-4 text-sm md:text-xl text-white/40 md:group-hover:text-white/90 transition-colors">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 md:gap-4 items-center">
              <span className="text-[#FF661A] md:group-hover:text-white text-xs md:text-sm transition-all">✦</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProcessCard({ icon, title, timeline, description, number, delay }: { icon: React.ReactNode; title: string; timeline: string; description: string; number: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col p-6 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#FF661A]/30 hover:bg-[#FF661A]/[0.03] transition-all duration-500 group relative overflow-hidden"
    >
      {/* Gradient accent on mobile */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF661A] via-[#FF661A]/50 to-transparent" />

      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FF661A]/30 flex items-center justify-center text-[#FF661A] group-hover:bg-[#FF661A]/10 group-hover:border-[#FF661A]/50 transition-all duration-500">
            {icon}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight">{title}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF661A] font-semibold">{timeline}</p>
          </div>
        </div>
        <span className="text-3xl md:text-4xl font-bold text-white/[0.05]">{number}</span>
      </div>
      <p className="text-white/40 text-sm md:text-[15px] leading-relaxed group-hover:text-white/55 transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
}

function PricingCard({ name, price, featured, features }: { name: string; price: string; featured?: boolean; features: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col p-6 md:p-10 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${featured
        ? "bg-[#FF661A]/[0.08] border-[#FF661A]/40 glow-brand md:scale-[1.02] hover:border-[#FF661A]"
        : "bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04]"
        }`}
    >
      {/* Top accent */}
      {featured && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF661A]" />}

      {featured && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF661A] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF661A] animate-pulse" />
          Most Popular
        </span>
      )}
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 md:mb-6 group-hover:text-[#FF661A] transition-colors">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6 md:mb-8">
        <span className="text-base md:text-lg text-white/30">RM</span>
        <span className="text-4xl md:text-5xl font-bold tracking-tight">{price}</span>
        <span className="text-[#FF661A] text-base md:text-lg font-bold ml-1">++</span>
      </div>
      <ul className="flex flex-col gap-2 md:gap-3 mb-8 md:mb-10 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-white/50 group-hover:text-white/70 transition-colors text-sm md:text-base">
            <span className="text-[#FF661A] text-xs md:text-sm">✦</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="mailto:hello@zeyno.my"
        className={`w-full py-3.5 md:py-4 rounded-full font-bold uppercase tracking-widest text-sm text-center transition-all duration-300 block ${featured
          ? "bg-[#FF661A] text-white hover:bg-white hover:text-black glow-brand hover:shadow-none"
          : "bg-white/10 text-white hover:bg-[#FF661A] hover:text-white"
          }`}
      >
        Get Started
      </a>
    </motion.div>
  );
}