"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

function LazyVideo({ src, className, ...props }: any) {
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "200px" });

  useEffect(() => {
    if (!ref.current) return;
    if (isInView) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
      className={className}
      {...props}
    />
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax effect on hero text
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <main className="w-full relative bg-[#0d0d0d]">
      
      {/* 1. Hero Section (Sticky at back) */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden bg-[#0d0d0d] z-0">
        {/* Dynamic Glowing Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
               opacity: [0.3, 0.6, 0.3]
             }}
             transition={{ duration: 15, ease: "linear", repeat: Infinity }}
             className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/40 blur-[120px] rounded-full mix-blend-screen"
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.5, 1],
               rotate: [0, -90, 0],
               opacity: [0.2, 0.5, 0.2]
             }}
             transition={{ duration: 20, ease: "linear", repeat: Infinity }}
             className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF661A]/30 blur-[150px] rounded-full mix-blend-screen"
           />
        </div>

        {/* Video Background Fallback/Overlay */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-overlay pointer-events-none">
          <LazyVideo
            src="/loader.mp4"
            className="w-full h-full object-cover filter contrast-125 saturate-50"
          />
        </motion.div>
        
        {/* Centered Hero Content */}
        <motion.div style={{ y: heroY }} className="relative z-10 flex flex-col items-center text-center text-white max-w-5xl mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-8"
          >
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
             <button className="bg-[#FF661A] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#111] transition-colors duration-300">
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

      {/* spacer to scroll past the fixed hero */}
      <div className="w-full h-[100svh] pointer-events-none opacity-0"></div>

      {/* 2. Intro Section (Slides up and covers) */}
      <section className="relative w-full py-20 md:py-48 px-6 md:px-12 bg-[#fcfcfc] text-[#111] rounded-t-[40px] md:rounded-t-[80px] z-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]" id="about">
        {/* Animated glowing orb behind text for Light BG */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#FF661A]/10 blur-[100px] rounded-full mix-blend-multiply pointer-events-none z-0 animate-[pulse_6s_ease-in-out_infinite]" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10 items-start">
          <div className="w-full md:w-1/2 flex flex-col items-start">
             <motion.div 
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
               className="w-4 h-4 bg-[#FF661A] rounded-full mb-8 md:mb-12" 
             />
             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.04em] text-[#111]"
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
            className="w-full md:w-1/2 md:pt-20"
          >
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] font-medium text-balance text-[#111]">
              We partner with founders, executives, and ambitious teams to clarify vision, sharpen positioning, and build brands that stand the test of time. From early-stage ventures to global innovators, we translate complexity into clear narratives, systems, and experiences.
            </p>
          </motion.div>
        </div>

        {/* 3 Columns embedded inside the same panel so they scroll together */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-[1400px] mx-auto border-t border-[#eaeaea] pt-16 md:pt-24 mt-16 md:mt-24">
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
      </section>

      {/* 3. Video Divider (Sticky Panel 2) */}
      <section className="sticky top-0 w-full h-[100svh] z-0 overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 bg-[#FF661A]/10 mix-blend-overlay z-10 pointer-events-none" />
        <LazyVideo
          src="/content.mp4"
          className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
        />
      </section>

      <div className="w-full h-[100svh] pointer-events-none opacity-0"></div>

      {/* 4. Works & Services Section (Slides up and covers) */}
      <section className="relative w-full pt-20 md:pt-32 pb-32 md:pb-48 px-6 md:px-12 bg-[#fcfcfc] text-[#111] rounded-t-[40px] md:rounded-t-[80px] z-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]" id="work">
        
        {/* Works Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-20 md:mb-32">
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
              <span className="w-2 h-2 bg-[#FF661A] rounded-full inline-block animate-pulse" />
              Work
            </h3>
            <p className="text-[#444] text-lg leading-relaxed text-balance">
              A curated selection of projects where strategy, design, and craft come together to create impact. <br /><br />
              From insight to identity.
            </p>
          </motion.div>
        </div>

        {/* Selected Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24 mb-32 md:mb-48">
          <ProjectCard 
            title="Now by Sahr Khimji" 
            tags={["E-commerce", "Luxury", "Digital"]} 
            media="/sahr.mp4" 
            align="end"
            slug="sahr"
          />
          <ProjectCard 
            title="CHITZ.FIT" 
            tags={["Branding", "Web Dev", "Strategy"]} 
            media="/chitz.mp4" 
            align="start"
            slug="chitz"
          />
          <ProjectCard 
            title="Social Media & SEO" 
            tags={["Digital Marketing", "Content", "SEO"]} 
            media="/content.mp4" 
            align="end"
            slug="social-seo"
          />
          <ProjectCard 
            title="LOOP Marketplace" 
            tags={["Brand Identity", "UI/UX", "System Design"]} 
            media="/loader.mp4" 
            align="start"
            slug="loop"
          />
        </div>

        {/* Services List Section */}
        <div id="services" className="border-t border-[#111] pt-24">
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
      className="flex flex-col gap-6 relative group"
    >
      <div className="absolute -left-4 top-1 w-1 h-0 bg-[#FF661A] transition-all duration-500 group-hover:h-5 rounded-full" />
      <h3 className="text-xl font-medium tracking-tight text-[#111] group-hover:text-[#FF661A] transition-colors">{title}</h3>
      <p className="text-[#444] text-lg leading-relaxed text-balance">
        {text}
      </p>
    </motion.div>
  );
}

function ProjectCard({ title, tags, media, align, slug }: { title: string, tags: string[], media: string, align: "start" | "end", slug: string }) {
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
            <div className="absolute inset-0 bg-[#FF661A]/0 group-hover:bg-[#FF661A]/20 transition-all duration-500 mix-blend-overlay z-10" />
            <LazyVideo
              src={media}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="flex justify-between items-start w-full relative">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#111] group-hover:text-[#FF661A] transition-colors transform group-hover:translate-x-2 duration-300">
            {title}
          </h3>
          <div className="flex flex-col gap-1 text-right text-sm text-[#666] group-hover:opacity-60 transition-opacity">
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
        <span className="text-xl font-medium text-[#FF661A] group-hover:text-white/70 w-8 pt-2 md:pt-4 transition-colors">
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