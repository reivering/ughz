"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { use } from "react";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projects[slug as keyof typeof projects];

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full relative bg-[#0d0d0d]">
      
      {/* 1. Hero Section (Sticky at back) */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-black z-0">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
        </motion.div>
        
        {/* Colorful Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
        
        <motion.div style={{ y: heroY }} className="relative z-10 flex flex-col items-start text-white max-w-5xl mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold uppercase tracking-widest text-[#FF661A] mb-6 drop-shadow-md"
          >
            {project.eyebrow}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-8 uppercase drop-shadow-lg"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl font-medium max-w-3xl text-balance opacity-90 drop-shadow-md"
          >
            {project.tagline}
          </motion.p>
        </motion.div>

        {/* Meta Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/20 pt-8 mt-12 w-full max-w-5xl"
        >
          {project.meta.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-sm text-[#FF661A] font-bold uppercase tracking-wider">{item.label}</span>
              <span className="text-white opacity-80 font-medium">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Spacer to scroll past the fixed hero */}
      <div className="w-full h-[100svh] pointer-events-none opacity-0"></div>

      {/* 2. Content Section (Slides up and covers) */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-gradient-to-br from-[#fcfcfc] via-[#f9f9f9] to-[#f4f4f4] text-[#111] rounded-t-[40px] md:rounded-t-[80px] z-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto flex flex-col gap-32">
          
          {/* Problem */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="w-full md:w-1/3">
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF661A] mb-4 block">The Problem</span>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.03em] font-medium whitespace-pre-line text-[#111]">
                {project.problem.title}
              </h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6 pt-2">
              {project.problem.desc.map((p, idx) => (
                <p key={idx} className="text-xl md:text-2xl text-[#444] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-[#eaeaea]" />

          {/* Solution */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="w-full md:w-1/3">
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF661A] mb-4 block">The Solution</span>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.03em] font-medium whitespace-pre-line text-[#111]">
                {project.solution.title}
              </h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6 pt-2">
              {project.solution.desc.map((p, idx) => (
                <p key={idx} className="text-xl md:text-2xl text-[#444] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-[#eaeaea] py-24">
          {project.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 text-center"
            >
              <div className="text-[clamp(4rem,6vw,5rem)] font-medium leading-none text-[#FF661A] tracking-tighter">
                {stat.value}
              </div>
              <div className="text-lg font-bold uppercase tracking-widest text-[#111]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pull Quote */}
        <div className="max-w-4xl mx-auto mt-32 md:mt-48 text-center pb-24">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.03em] font-medium text-[#111] italic font-light relative">
            <span className="text-[#FF661A] absolute -left-12 -top-12 text-8xl opacity-30 font-serif">"</span>
            {project.quote}
            <span className="text-[#FF661A] absolute -right-12 bottom-0 text-8xl opacity-30 font-serif">"</span>
          </h2>
        </div>

        <div className="flex justify-center mt-12 pb-24">
          <Link href="/#work" className="bg-[#111] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF661A] transition-colors duration-300">
            ← Back to Dashboard
          </Link>
        </div>

      </section>

    </main>
  );
}