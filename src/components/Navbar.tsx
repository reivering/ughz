"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

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
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
          }`}
      >
        <Link href="/" className="text-xl font-medium tracking-tight text-white hover:text-[#FF661A] transition-colors duration-300">
          zeyno<span className="align-super text-[0.6rem] text-white/50">®</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          <NavLink href="/#services" label="Services" active={false} />
          <NavLink href="/#work" label="Work" active={false} />
          <NavLink href="/pricing" label="Pricing" active={pathname === '/pricing'} />
          <a
            href="mailto:hello@zeyno.my"
            className="ml-4 px-5 py-2 rounded-full bg-[#FF661A] text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 glow-brand hover:shadow-none"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-sm font-bold uppercase tracking-widest text-white hover:text-[#FF661A] transition-colors"
        >
          Menu
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 30px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 30px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 30px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white flex flex-col px-6 py-6 md:px-12"
          >
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#FF661A]/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Mobile Nav Header */}
            <div className="flex justify-between items-center mb-16 relative z-10">
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
            <div className="flex flex-col gap-6 text-[clamp(2.5rem,8vw,4rem)] font-medium tracking-tight mt-8 relative z-10">
              {[
                { href: "/", label: "Home" },
                { href: "/#services", label: "Services" },
                { href: "/#work", label: "Work" },
                { href: "/pricing", label: "Pricing" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#FF661A] transition-colors w-fit flex items-center gap-4 group"
                  >
                    <span className="text-sm font-bold text-white/20 group-hover:text-[#FF661A] transition-colors">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Nav Footer */}
            <div className="mt-auto mb-12 flex flex-col gap-4 relative z-10">
              <div className="h-[1px] bg-gradient-to-r from-[#FF661A]/40 to-transparent mb-6" />
              <p className="text-white/30 text-sm uppercase tracking-widest">Get in touch</p>
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

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative group transition-colors hover:text-white ${active ? "text-[#FF661A]" : ""}`}
    >
      <span>{label}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF661A] transition-all duration-300 group-hover:w-full rounded-full" />
    </Link>
  );
}