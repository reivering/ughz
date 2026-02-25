"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll to hide navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white pointer-events-none"
      >
        <Link href="/" className="pointer-events-auto text-xl font-medium tracking-tight hover:text-[#FF661A] transition-colors duration-300">
          zeyno<span className="align-super text-[0.6rem] text-white/50">®</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex pointer-events-auto items-center space-x-8 text-sm font-medium">
          <Link 
            href="/#services" 
            className="relative group hover:text-[#FF661A] transition-colors"
          >
            <span>Services</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF661A] transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            href="/#work" 
            className="relative group hover:text-[#FF661A] transition-colors"
          >
            <span>Work</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF661A] transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            href="/pricing" 
            className={`relative group hover:text-[#FF661A] transition-colors ${pathname === '/pricing' ? 'text-[#FF661A]' : ''}`}
          >
            <span>Pricing</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF661A] transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(true)} 
          className="md:hidden pointer-events-auto text-sm font-bold uppercase tracking-widest hover:text-[#FF661A] transition-colors"
        >
          Menu
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0d0d0d] text-white flex flex-col px-6 py-6 md:px-12"
          >
            {/* Mobile Nav Header */}
            <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-xl font-medium tracking-tight hover:text-[#FF661A] transition-colors duration-300">
                zeyno<span className="align-super text-[0.6rem] text-white/50">®</span>
              </Link>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="text-sm font-bold uppercase tracking-widest text-[#FF661A] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-8 text-[clamp(2.5rem,8vw,4rem)] font-medium tracking-tight mt-12">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#FF661A] transition-colors w-fit">
                Home
              </Link>
              <Link href="/#services" onClick={() => setMenuOpen(false)} className="hover:text-[#FF661A] transition-colors w-fit">
                Services
              </Link>
              <Link href="/#work" onClick={() => setMenuOpen(false)} className="hover:text-[#FF661A] transition-colors w-fit">
                Work
              </Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)} className="hover:text-[#FF661A] transition-colors w-fit">
                Pricing
              </Link>
            </div>

            {/* Mobile Nav Footer */}
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <p className="text-[#666] text-sm uppercase tracking-widest">Get in touch</p>
              <a href="mailto:hello@zeyno.my" className="text-2xl text-[#FF661A] hover:text-white transition-colors">
                hello@zeyno.my
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}