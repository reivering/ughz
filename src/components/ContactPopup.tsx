"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "@/context/ContactContext";

export function ContactPopup() {
    const { isOpen, closeContactForm } = useContact();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
                >
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={closeContactForm}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="relative w-full max-w-lg p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-[#FF661A]/20 blur-[80px] rounded-full pointer-events-none" />

                        <button
                            onClick={closeContactForm}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <h2 className="text-3xl font-medium tracking-tight text-white mb-2">Let&apos;s talk</h2>
                        <p className="text-white/50 text-sm mb-8">Tell us about your project, and we&apos;ll be in touch.</p>

                        <form action="https://formspree.io/f/mykdbrqv" method="POST" className="flex flex-col gap-5 relative z-10 text-left">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-[#FF661A]">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF661A]/50 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-[#FF661A]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF661A]/50 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-[#FF661A]">Service</label>
                                <select name="service" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF661A]/50 transition-colors cursor-pointer appearance-none">
                                    <option value="branding">Branding</option>
                                    <option value="web">Web Development</option>
                                    <option value="social">Social & SEO</option>
                                    <option value="full">Full Package</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-[#FF661A]">Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your goals..."
                                    rows={4}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF661A]/50 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-[#FF661A] text-white py-4 rounded-xl font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 glow-brand hover:shadow-none"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
