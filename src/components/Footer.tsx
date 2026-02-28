"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const ctaY = useTransform(scrollYProgress, [0.8, 1], ["20%", "0%"]);

  return (
    <footer className="w-full bg-[#0a0a0a] text-[#f5f5f5] px-6 py-24 md:px-12 md:py-32 flex flex-col justify-between relative overflow-hidden z-20 border-t border-white/[0.06]" id="contact">

      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#FF661A]/8 mix-blend-screen blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[30vw] h-[30vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-8 mb-32 z-10 relative">
        <motion.div style={{ y: ctaY }} className="flex flex-col">
          <h2 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] font-medium text-balance mb-8">
            Ready <br />
            <span className="text-gradient-animated italic font-light">to start ?</span>
          </h2>
          <p className="text-lg md:text-xl text-white/30 max-w-md text-balance mb-8">
            If you&apos;re looking to define your brand with clarity and intention, we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@zeyno.my"
            className="group flex items-center gap-4 text-2xl md:text-4xl font-medium text-white w-fit"
          >
            <span className="relative overflow-hidden">
              hello@zeyno.my
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF661A] transition-all duration-300 group-hover:w-full rounded-full" />
            </span>
            <span className="text-[#FF661A] transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div style={{ y: ctaY }} className="flex flex-col justify-end lg:pl-24">
          <form action="https://formspree.io/f/mykdbrqv" method="POST" className="flex flex-col gap-8 w-full max-w-lg">
            <div className="flex flex-col gap-2 relative group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-transparent border-b border-white/10 py-4 text-lg md:text-xl focus:outline-none focus:border-[#FF661A] transition-colors peer placeholder:text-white/20 text-white"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF661A] transition-all duration-500 peer-focus:w-full rounded-full" />
            </div>

            <div className="flex flex-col gap-2 relative group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent border-b border-white/10 py-4 text-lg md:text-xl focus:outline-none focus:border-[#FF661A] transition-colors peer placeholder:text-white/20 text-white"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF661A] transition-all duration-500 peer-focus:w-full rounded-full" />
            </div>

            <div className="flex flex-col gap-2 relative group mt-4">
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={3}
                required
                className="w-full bg-transparent border-b border-white/10 py-4 text-lg md:text-xl focus:outline-none focus:border-[#FF661A] transition-colors peer resize-none placeholder:text-white/20 text-white"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF661A] transition-all duration-500 peer-focus:w-full rounded-full" />
            </div>

            <button type="submit" className="mt-4 self-start bg-[#FF661A] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 glow-brand hover:shadow-none">
              Send Message →
            </button>
          </form>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/[0.06] pt-8 gap-8 z-10 relative">
        <div className="flex gap-6 text-sm md:text-base text-white/30">
          <Link href="https://instagram.com/studio.zeyno" className="hover:text-[#FF661A] transition-colors">Instagram</Link>
          <Link href="https://www.linkedin.com/company/zeyno-studio" className="hover:text-[#FF661A] transition-colors">LinkedIn</Link>
        </div>
        <div className="flex gap-6 text-sm text-white/20 flex-col md:flex-row items-start md:items-center">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#FF661A] transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-[#FF661A] transition-colors">Cookies Policy</Link>
          </div>
          <span className="mt-4 md:mt-0 flex items-center gap-2">
            © {new Date().getFullYear()} zeyno <span className="w-1.5 h-1.5 bg-[#FF661A] rounded-full inline-block animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
}