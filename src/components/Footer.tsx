"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const ctaY = useTransform(scrollYProgress, [0.8, 1], ["20%", "0%"]);

  return (
    <footer className="w-full bg-[#111] text-[#fcfcfc] px-6 py-24 md:px-12 md:py-32 flex flex-col justify-between relative overflow-hidden" id="contact">
      
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#FF661A]/10 mix-blend-screen blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-32 z-10 relative">
        <motion.div style={{ y: ctaY }}>
          <h2 className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] font-medium text-balance">
            Ready <br />
            <span className="italic font-light text-[#FF661A]">to start ?</span>
          </h2>
        </motion.div>
        
        <div className="flex flex-col justify-end text-lg md:text-xl text-[#a0a0a0] md:max-w-md ml-auto">
          <p className="mb-8 text-balance">
            If you&apos;re looking to define your brand with clarity and intention, we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@zeyno.my"
            className="group flex items-center gap-4 text-2xl md:text-4xl font-medium text-white w-fit"
          >
            <span className="relative overflow-hidden">
              hello@zeyno.my
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF661A] transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="text-[#FF661A] transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#333] pt-8 gap-8 z-10 relative">
        <div className="flex gap-6 text-sm md:text-base text-[#a0a0a0]">
          <Link href="https://instagram.com/zeyno" className="hover:text-[#FF661A] transition-colors">Instagram</Link>
          <Link href="https://dribbble.com/zeyno" className="hover:text-[#FF661A] transition-colors">Dribbble</Link>
          <Link href="https://linkedin.com/company/zeyno" className="hover:text-[#FF661A] transition-colors">LinkedIn</Link>
        </div>
        <div className="flex gap-6 text-sm text-[#666] flex-col md:flex-row items-start md:items-center">
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