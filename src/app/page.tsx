"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Asterisk, Sparkle, Hexagon, Target, Triangle } from "lucide-react";
import dynamic from "next/dynamic";

const InversionLens = dynamic(() => import("@/components/InversionLens"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse rounded-2xl" />,
});

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Crazy Parallax values
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 800]);

  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <main className="w-full relative bg-[#0d0d0d] overflow-hidden">

      {/* 1. Hero Section (Sticky at back) */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden bg-black z-0">

        {/* Dynamic Glowing Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/40 blur-[120px] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF661A]/30 blur-[150px] rounded-full mix-blend-screen"
          />
        </div>

        {/* NATIVE VIDEO BACKGROUND (Fixed playback) */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-overlay pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter contrast-125 saturate-50"
          >
            <source src="/loader.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Centered Hero Content */}
        <motion.div style={{ y: heroY }} className="relative z-10 flex flex-col items-center text-center text-white max-w-5xl mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-8 relative"
          >
            {/* Crazy spark icon attached to title */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -left-12 text-[#FF661A]"
            >
              <Sparkle size={64} fill="#FF661A" />
            </motion.div>

            Strategic Design for <br className="hidden md:block" />
            <span className="text-[#FF661A] italic font-light drop-shadow-md">bold</span> brands.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl font-medium max-w-2xl text-balance opacity-80"
          >
            A global branding agency for businesses ready to evolve, stand out, and dominate their market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex gap-4"
          >
            <button className="bg-[#FF661A] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#111] transition-colors duration-300 shadow-[0_0_40px_rgba(255,102,26,0.4)]">
              View Our Work
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
              Let&apos;s Talk
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-xs uppercase tracking-widest text-[#FF661A] animate-pulse z-10 font-bold"
        >
          (scroll)
        </motion.div>
      </section>

      {/* 2. Intro Section (Slides up and covers) */}
      <section className="relative w-full z-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#fcfcfc] via-[#f9f9f9] to-[#f4f4f4] rounded-t-[40px] md:rounded-t-[80px] overflow-hidden" id="about">
        {/* Wavy orange background texture */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]" style={{ width: '200%', animation: 'waveDrift 30s linear infinite' }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#FF661A" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative w-full py-20 md:py-48 px-6 md:px-12 text-[#111] overflow-hidden rounded-t-[40px] md:rounded-t-[80px]">
          {/* Animated fluid mesh for Light BG */}
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF661A]/5 blur-[120px] rounded-full mix-blend-multiply pointer-events-none z-0 animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/3 blur-[100px] rounded-full mix-blend-multiply pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite_reverse]" />

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10 items-start">
            <div className="w-full md:w-1/2 flex flex-col items-start relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                className="w-4 h-4 bg-[#FF661A] rounded-full mb-8 md:mb-12 shadow-[0_0_20px_rgba(255,102,26,0.4)]"
              />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] font-bold tracking-[-0.04em] text-[#111]"
              >
                Building <br />
                brands with <br />
                <span className="italic font-light text-[#FF661A]">intention.</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 md:pt-24"
            >
              <p className="text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.02em] font-medium text-balance text-[#333]">
                We partner with founders, executives, and ambitious teams to clarify vision, sharpen positioning, and build brands that stand the test of time. From early-stage ventures to global innovators, we translate complexity into clear narratives, systems, and experiences.
              </p>
            </motion.div>
          </div>

          {/* 3 Columns embedded inside the same panel so they scroll together */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-[1400px] mx-auto border-t border-[#eaeaea] pt-16 md:pt-24 mt-16 md:mt-32 relative z-10 pb-12 md:pb-24 px-6 md:px-12">
            <ValueColumn
              title="End-to-End"
              text="From strategic thinking to brand identity to high-performance digital builds, our process covers the full spectrum. Every project is approached with precision, depth, and intent."
              delay={0}
            />
            <ValueColumn
              title="Flexible By Design"
              text="We don’t count hours or inflate scope. Our model adapts to real needs, leaving room for iteration, adjustment, and evolution as priorities shift."
              delay={0.1}
            />
            <ValueColumn
              title="Always in"
              text="Nothing is locked in. Scale up, slow down, pause, or change direction — you stay in control at every stage of the collaboration."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* 3. Video Divider (Sticky Panel 2) */}
      <section className="sticky top-0 w-full h-[100svh] z-0 overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 bg-[#FF661A]/10 mix-blend-overlay z-10 pointer-events-none" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
        >
          <source src="/content.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 4. Works & Services Section (Slides up and covers) */}
      <section className="relative w-full pt-20 md:pt-32 pb-32 md:pb-48 px-6 md:px-12 text-[#111] rounded-t-[40px] md:rounded-t-[80px] z-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden bg-gradient-to-t from-[#fcfcfc] via-[#fdf9f7] to-[#fcfcfc]" id="work">
        {/* Wavy orange background texture */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]" style={{ width: '200%', animation: 'waveDrift 25s linear infinite' }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#FF661A" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Ambient Color Touches */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/10 blur-[150px] rounded-full mix-blend-multiply pointer-events-none z-0 animate-[pulse_7s_ease-in-out_infinite]" />

        {/* Works Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-20 md:mb-32 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,10vw,8rem)] leading-[0.9] font-medium tracking-[-0.04em] mb-12 md:mb-0 text-[#111]"
          >
            Selected<br />
            <span className="italic font-light text-[#FF661A]">Works</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col max-w-sm mt-auto"
          >
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2 text-[#111]">
              <span className="w-2 h-2 bg-[#FF661A] rounded-full inline-block animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              Work
            </h3>
            <p className="text-[#444] text-lg leading-relaxed text-balance">
              A curated selection of projects where strategy, design, and craft come together to create impact. <br /><br />
              From insight to identity.
            </p>
          </motion.div>
        </div>

        {/* Selected Works Grid — 3-column with InversionLens on Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-32 md:mb-48 relative z-10">

          {/* Sahr */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl overflow-hidden bg-[#111] aspect-[4/3] cursor-pointer"
          >
            <Link href="/work/sahr" className="block w-full h-full">
              <InversionLens src="/sahr.mp4" type="video" className="w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="text-white font-bold text-lg">Now by Sahr Khimji</p>
                <p className="text-white/60 text-sm">E-commerce · Luxury</p>
              </div>
            </Link>
          </motion.div>

          {/* CHITZ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl overflow-hidden bg-[#111] aspect-[4/3] cursor-pointer"
          >
            <Link href="/work/chitz" className="block w-full h-full">
              <InversionLens src="/chitz.mp4" type="video" className="w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="text-white font-bold text-lg">CHITZ.FIT</p>
                <p className="text-white/60 text-sm">Branding · Web Dev</p>
              </div>
            </Link>
          </motion.div>

          {/* Social Media & SEO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl overflow-hidden bg-[#111] aspect-[4/3] cursor-pointer"
          >
            <Link href="/work/social-seo" className="block w-full h-full">
              <InversionLens src="/content.mp4" type="video" className="w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="text-white font-bold text-lg">Social Media &amp; SEO</p>
                <p className="text-white/60 text-sm">Digital Marketing · Content</p>
              </div>
            </Link>
          </motion.div>

          {/* LOOP - Under Construction */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden bg-[#111] aspect-[4/3] flex flex-col items-center justify-center text-white gap-3"
          >
            <span className="text-5xl">🚧</span>
            <span className="text-xl font-bold tracking-tight uppercase">LOOP Marketplace</span>
            <span className="text-xs text-white/40 font-medium uppercase tracking-widest">Under Construction</span>
            <span className="w-2 h-2 bg-[#FF661A] rounded-full animate-pulse mt-1" />
          </motion.div>

        </div>

        {/* Services List Section */}
        <div id="services" className="border-t border-[#111] pt-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 md:mb-48 gap-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] font-medium max-w-4xl text-balance text-[#111]"
            >
              We work at the intersection of strategy, identity, and experience to shape brands with meaning.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col max-w-sm gap-4 text-lg text-[#444]"
            >
              <p>We help brands define who they are, why they exist.</p>
              <p>At the intersection of strategy, branding, and design, we work with founders, studios, and companies to build identities that are clear, distinctive, and built to last.</p>
            </motion.div>
          </div>

          <div className="flex flex-col w-full border-b border-[#eaeaea]">
            <ServiceRow
              number="01"
              title="Branding Identity"
              items={["Brand strategy", "Positioning & messaging", "Visual identity systems", "Brand guidelines"]}
            />
            <ServiceRow
              number="02"
              title="Visual Design"
              items={["Art direction", "Editorial layouts", "Typography systems", "Print & digital assets"]}
            />
            <ServiceRow
              number="03"
              title="Digital Experience"
              items={["Website design", "Motion & animation", "Interactive storytelling", "Performance-driven builds"]}
            />
            <ServiceRow
              number="04"
              title="Creative Direction"
              items={["Creative concepts", "Editorial vision", "Campaign direction", "Cross-media consistency"]}
            />
          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0d] text-white z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 group/process">
            {/* Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 pt-8 pb-12 md:pr-12 transition-all duration-500 group-hover/process:opacity-30 group-hover/process:blur-[2px] hover:!opacity-100 hover:!blur-none"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full border border-[#FF661A]/40 flex items-center justify-center text-[#FF661A]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Strategy</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#FF661A] font-semibold">3-4 Days</p>
                </div>
              </div>
              <p className="text-white/40 text-[15px] leading-relaxed mt-6">
                In a comprehensive workshop, we&apos;ll set the baseline together. By analyzing your business, we develop a clear website strategy and compelling copywriting.
              </p>
            </motion.div>

            {/* Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 pt-8 pb-12 md:px-12 md:border-l transition-all duration-500 group-hover/process:opacity-30 group-hover/process:blur-[2px] hover:!opacity-100 hover:!blur-none"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full border border-[#FF661A]/40 flex items-center justify-center text-[#FF661A]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Design</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#FF661A] font-semibold">4-6 Days</p>
                </div>
              </div>
              <p className="text-white/40 text-[15px] leading-relaxed mt-6">
                Building on the strategic foundation, we serve the winning shot – the web design. Every detail is carefully crafted to create an immersive experience.
              </p>
            </motion.div>

            {/* Development */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 pt-8 pb-12 md:pl-12 md:border-l transition-all duration-500 group-hover/process:opacity-30 group-hover/process:blur-[2px] hover:!opacity-100 hover:!blur-none"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full border border-[#FF661A]/40 flex items-center justify-center text-[#FF661A]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Development</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#FF661A] font-semibold">3-4 Days</p>
                </div>
              </div>
              <p className="text-white/40 text-[15px] leading-relaxed mt-6">
                Your website will be developed with precision. We focus on performance-driven development ensuring your site delivers a seamless experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-[#0d0d0d] text-white z-10" id="pricing">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32 gap-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.04em]"
            >
              Invest in<br />
              <span className="italic font-light text-[#FF661A]">your brand.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg text-white/40 max-w-sm mt-auto"
            >
              Transparent pricing. No hidden fees. Choose the level of partnership that fits your ambition.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <PricingCard
              name="Branding"
              price="3,000"
              features={["Brand Strategy & Positioning", "Logo & Visual Identity", "Typography & Color System", "Brand Guidelines Document", "Social Media Kit"]}
            />
            <PricingCard
              name="Social Media"
              price="1,300"
              featured
              features={["Content Strategy", "12 Posts / Month", "Story & Reel Design", "Community Management", "Monthly Analytics Report"]}
            />
            <PricingCard
              name="Web Dev"
              price="1,400 – 5,000"
              features={["Custom Design & Dev", "Responsive Build", "CMS Integration", "Performance Optimization", "3 Rounds of Revisions"]}
            />
          </div>

          {/* Custom Quote CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 rounded-2xl border border-[#FF661A]/30 bg-[#FF661A]/5 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Need something custom?</h3>
              <p className="text-white/40 text-lg">Full-stack projects, retainers, or multi-service bundles — let&apos;s build a plan that fits.</p>
            </div>
            <a
              href="mailto:hello@zeyno.my"
              className="bg-[#FF661A] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap shadow-[0_0_40px_rgba(255,102,26,0.3)]"
            >
              Get a Quote →
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

function ValueColumn({ title, text, delay }: { title: string, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6 relative group cursor-default"
    >
      <div className="absolute -left-4 top-1 w-1 h-0 bg-[#FF661A] transition-all duration-500 group-hover:h-8 rounded-full shadow-[0_0_10px_rgba(255,102,26,0.8)]" />
      <h3 className="text-2xl font-bold tracking-tight text-[#111] group-hover:text-[#FF661A] transition-colors">{title}</h3>
      <p className="text-[#444] text-lg leading-relaxed text-balance group-hover:text-[#111] transition-colors">
        {text}
      </p>
    </motion.div>
  );
}

function ProjectCard({ title, tags, media, align, slug }: { title: string, tags: string[], media: string, align: "start" | "end", slug: string }) {
  // Using native HTML video tag to bypass all React/Observer autoplay limitations
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full flex flex-col group cursor-pointer ${align === "end" ? "md:mt-32" : ""}`}
    >
      <Link href={`/work/${slug}`} className="w-full flex flex-col group cursor-pointer">
        <div className="w-full overflow-hidden mb-6 aspect-[4/5] bg-[#eaeaea] rounded-sm relative">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle Orange Glow overlay on hover */}
            <div className="absolute inset-0 bg-[#FF661A]/0 group-hover:bg-[#FF661A]/30 transition-all duration-500 mix-blend-overlay z-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={media} type="video/mp4" />
            </video>
          </motion.div>
        </div>
        <div className="flex justify-between items-start w-full relative">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#111] group-hover:text-[#FF661A] transition-colors transform group-hover:translate-x-2 duration-300">
            {title}
          </h3>
          <div className="flex flex-col gap-1 text-right text-sm text-[#666] group-hover:opacity-60 transition-opacity font-medium">
            {tags.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceRow({ number, title, items }: { number: string, title: string, items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row justify-between items-start py-12 md:py-16 border-t border-[#eaeaea] group hover:bg-[#FF661A] hover:text-white transition-all duration-500 -mx-6 md:-mx-12 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="flex gap-8 mb-8 md:mb-0 w-full md:w-1/2 relative z-10">
        <span className="text-xl font-bold text-[#FF661A] group-hover:text-white/70 w-8 pt-2 md:pt-4 transition-colors">
          {number}
        </span>
        <h3 className="text-[clamp(2.5rem,4vw,4rem)] leading-none tracking-tight font-medium text-[#111] group-hover:text-white transform group-hover:translate-x-4 transition-all duration-500">
          {title}
        </h3>
      </div>
      <div className="flex flex-col w-full md:w-1/2 pl-14 md:pl-0 pt-2 md:pt-4 relative z-10">
        <ul className="flex flex-col gap-4 text-lg md:text-xl text-[#444] group-hover:text-white/90 transition-colors">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 items-center">
              <span className="text-[#FF661A] group-hover:text-white text-sm transform transition-transform group-hover:scale-150 group-hover:mr-2 duration-300">✦</span> {item}
            </li>
          ))}
        </ul>
      </div>
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
      className={`flex flex-col p-8 md:p-10 rounded-2xl border transition-all duration-500 ${featured
        ? "bg-[#FF661A]/10 border-[#FF661A] shadow-[0_0_60px_rgba(255,102,26,0.15)] scale-[1.02]"
        : "bg-white/[0.03] border-white/10 hover:border-white/25"
        }`}
    >
      {featured && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF661A] mb-4">Most Popular</span>
      )}
      <h3 className="text-2xl font-bold tracking-tight mb-6">{name}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-lg text-white/40">RM</span>
        <span className="text-5xl font-bold tracking-tight">{price}</span>
        <span className="text-white/30 uppercase text-xs font-medium tracking-widest ml-1">++</span>
      </div>
      <ul className="flex flex-col gap-3 mb-10 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-white/60">
            <span className="text-[#FF661A] text-sm">✦</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="mailto:hello@zeyno.my"
        className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm text-center transition-all duration-300 block ${featured
          ? "bg-[#FF661A] text-white hover:bg-white hover:text-black"
          : "bg-white/10 text-white hover:bg-white hover:text-black"
          }`}
      >
        Get Started
      </a>
    </motion.div>
  );
}