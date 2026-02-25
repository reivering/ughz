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
    <main className="flex flex-col w-full min-h-screen bg-[#fcfcfc]" ref={containerRef}>
      
      {/* Dynamic Colored Background Blob */}
      <div className="fixed top-0 left-1/4 w-[60vw] h-[60vw] bg-[#FF661A]/10 mix-blend-multiply blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Hero Header */}
      <section className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: headerY }} className="max-w-5xl z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.04em] text-balance mb-8"
          >
            Transparent <br />
            <span className="italic font-light text-[#FF661A]">pricing.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl font-medium max-w-xl text-[#666] leading-relaxed"
          >
            No hidden fees. No surprises. Just real value for real businesses. Choose the engagement that fits your scale.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="w-full px-6 md:px-12 pb-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1600px] mx-auto">
          
          <PricingCard 
            title="Branding" 
            price="RM 2,000" 
            suffix="/ starting"
            desc="A complete brand identity that tells your story, builds trust, and sets you apart from the competition."
            features={[
              "Logo design (3 concepts)",
              "Brand guidelines & style guide",
              "Color palette & typography system",
              "Business card & stationery design",
              "Social media kit & templates",
              "Copywriting & brand messaging",
              "Custom graphics & visual assets"
            ]}
            delay={0.1}
          />

          <PricingCard 
            title="Web Development" 
            price="RM 1,000" 
            suffix="/ starting"
            desc="Fast, beautiful, and conversion-focused websites built to make your brand impossible to ignore online."
            features={[
              "Custom UI/UX design",
              "Fully responsive layout",
              "Smooth animations & interactions",
              "SEO-ready structure & meta setup",
              "Contact forms & CMS integration",
              "Performance & speed optimisation",
              "Deployment & domain setup"
            ]}
            delay={0.2}
          />

          <PricingCard 
            title="Social & SEO" 
            price="RM 2,000" 
            suffix="/ month"
            desc="Viral content, targeted ads, and SEO that puts you in front of the right people at the right time."
            features={[
              "Monthly content calendar",
              "Viral short-form video creation",
              "Paid ad campaigns (Meta & Google)",
              "SEO strategy & keyword targeting",
              "Community management",
              "Monthly performance reports",
              "A/B testing & ad optimisation"
            ]}
            delay={0.3}
          />

          {/* Featured / Full Package Card */}
          <PricingCard 
            title="Full Package" 
            price="Custom" 
            suffix="/ quote"
            desc="Everything you need to go from zero to market — branding, web, social, SEO, and full go-to-market strategy bundled together."
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
            delay={0.4}
          />

        </div>
      </section>
    </main>
  );
}

function PricingCard({ title, price, suffix, desc, features, featured = false, delay }: { title: string, price: string, suffix: string, desc: string, features: string[], featured?: boolean, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative flex flex-col p-8 md:p-10 rounded-2xl border ${featured ? 'bg-[#111] text-white border-transparent shadow-2xl shadow-[#FF661A]/20' : 'bg-white text-[#111] border-[#eaeaea] hover:border-[#FF661A]/50 transition-colors duration-500'}`}
    >
      {featured && (
        <div className="absolute -top-4 left-8 bg-[#FF661A] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-medium mb-4">{title}</h3>
      <div className="flex items-baseline gap-2 mb-6">
        <span className={`text-4xl font-medium tracking-tight ${featured ? 'text-[#FF661A]' : ''}`}>{price}</span>
        <span className={`text-sm ${featured ? 'text-[#aaa]' : 'text-[#666]'}`}>{suffix}</span>
      </div>
      
      <p className={`text-sm leading-relaxed mb-8 h-20 ${featured ? 'text-[#ccc]' : 'text-[#666]'}`}>
        {desc}
      </p>

      <div className={`w-full h-px mb-8 ${featured ? 'bg-[#333]' : 'bg-[#eaeaea]'}`} />

      <ul className="flex flex-col gap-4 mb-12 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${featured ? 'text-[#ccc]' : 'text-[#444]'}`}>
            <span className="text-[#FF661A] shrink-0 mt-0.5">✦</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-full font-medium transition-all duration-300 ${featured ? 'bg-[#FF661A] text-white hover:bg-[#cc5215]' : 'bg-[#f4f4f4] text-[#111] hover:bg-[#FF661A] hover:text-white'}`}>
        Get Started →
      </button>
    </motion.div>
  );
}