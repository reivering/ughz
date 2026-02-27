"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PricingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#0a0a0a] overflow-hidden" ref={containerRef}>

      {/* Dynamic Background Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FF661A]/8 blur-[150px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 8s ease-in-out infinite' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0" style={{ animation: 'pulse-glow 12s ease-in-out infinite reverse' }} />

      {/* Grid overlay pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating Geometry */}
      <motion.div
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="fixed top-[20%] left-[10%] w-32 h-32 border-[1px] border-[#FF661A]/10 rounded-full pointer-events-none z-0"
      />
      <motion.div
        animate={{ rotate: -360, x: [0, -30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[20%] right-[10%] w-64 h-64 border-[1px] border-[#FF661A]/5 rounded-full pointer-events-none z-0"
      />

      {/* Hero Header */}
      <section className="relative w-full pt-28 md:pt-48 pb-12 md:pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: headerY }} className="max-w-5xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-6 md:mb-8 text-white"
          >
            Transparent <br />
            <span className="text-gradient-animated italic font-light">pricing.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-2xl font-medium max-w-xl text-white/40 leading-relaxed"
          >
            No hidden fees. No surprises. Just real value for real businesses. Choose the engagement that fits your scale.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="w-full px-4 md:px-12 pb-24 md:pb-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-[1600px] mx-auto">

          <PricingCard
            title="Branding"
            price="RM 2,000"
            suffix="/ starting"
            desc="A complete brand identity that tells your story, builds trust, and sets you apart."
            features={[
              "Logo design (3 concepts)",
              "Brand guidelines & style guide",
              "Color palette & typography system",
              "Business card & stationery design",
              "Social media kit & templates",
              "Copywriting & brand messaging",
              "Custom graphics & visual assets"
            ]}
            number="01"
            delay={0.1}
          />

          <PricingCard
            title="Web Development"
            price="RM 1,000"
            suffix="/ starting"
            desc="Fast, beautiful, and conversion-focused websites built to dominate online."
            features={[
              "Custom UI/UX design",
              "Fully responsive layout",
              "Smooth animations & interactions",
              "SEO-ready structure & meta setup",
              "Contact forms & CMS integration",
              "Performance & speed optimisation",
              "Deployment & domain setup"
            ]}
            number="02"
            delay={0.2}
          />

          <PricingCard
            title="Social & SEO"
            price="RM 2,000"
            suffix="/ month"
            desc="Viral content, targeted ads, and SEO that puts you in front of the right people."
            features={[
              "Monthly content calendar",
              "Viral short-form video creation",
              "Paid ad campaigns (Meta & Google)",
              "SEO strategy & keyword targeting",
              "Community management",
              "Monthly performance reports",
              "A/B testing & ad optimisation"
            ]}
            number="03"
            delay={0.3}
          />

          {/* Featured / Full Package Card */}
          <PricingCard
            title="Full Package"
            price="Custom"
            suffix="/ quote"
            desc="Everything you need — branding, web, social, SEO, and full go-to-market strategy."
            features={[
              "Everything in Branding",
              "Everything in Web Development",
              "Everything in Social & SEO",
              "Go-to-market strategy",
              "Dedicated account manager",
              "Priority turnaround",
              "Monthly strategy calls"
            ]}
            featured={true}
            number="04"
            delay={0.4}
          />

        </div>
      </section>
    </main>
  );
}

function PricingCard({ title, price, suffix, desc, features, featured = false, number, delay }: { title: string; price: string; suffix: string; desc: string; features: string[]; featured?: boolean; number: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col p-6 md:p-10 rounded-2xl border transition-all duration-500 overflow-hidden ${featured
          ? 'bg-[#FF661A]/[0.08] text-white border-[#FF661A]/40 glow-brand'
          : 'bg-white/[0.02] text-white border-white/[0.06] hover:border-white/15'
        }`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${featured ? 'bg-[#FF661A]' : 'bg-gradient-to-r from-[#FF661A]/40 to-transparent'}`} />

      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-5xl md:text-6xl font-bold text-white/[0.03]">{number}</span>

      {featured && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF661A] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF661A] animate-pulse" />
          Most Popular
        </span>
      )}

      <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{title}</h3>
      <div className="flex items-baseline gap-2 mb-4 md:mb-6">
        <span className={`text-3xl md:text-4xl font-medium tracking-tight ${featured ? 'text-[#FF661A]' : ''}`}>{price}</span>
        <span className="text-sm text-white/30">{suffix}</span>
      </div>

      <p className="text-sm leading-relaxed mb-6 md:mb-8 text-white/40 min-h-[3rem]">
        {desc}
      </p>

      <div className="w-full h-px mb-6 md:mb-8 bg-gradient-to-r from-white/10 to-transparent" />

      <ul className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/50">
            <span className="text-[#FF661A] shrink-0 mt-0.5 text-xs">✦</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="mailto:hello@zeyno.my"
        className={`w-full py-3.5 md:py-4 rounded-full font-medium transition-all duration-300 text-center text-sm block ${featured
            ? 'bg-[#FF661A] text-white hover:bg-white hover:text-black glow-brand hover:shadow-none'
            : 'bg-white/10 text-white hover:bg-[#FF661A] hover:text-white'
          }`}
      >
        Get Started →
      </a>
    </motion.div>
  );
}