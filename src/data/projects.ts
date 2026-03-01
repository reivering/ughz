export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  video: string;
  meta: { label: string; value: string }[];
  externalLink?: string;
  problem: { title: string; desc: string[] };
  solution: { title: string; desc: string[] };
  stats: { value: string; label: string }[];
  quote: string;
}

export const projects: Record<string, Project> = {
  "sahr": {
    slug: "sahr",
    title: "NOW BY SAHR KHIMJI",
    eyebrow: "Case Study · Luxury Fashion · India",
    tagline: "Bridging the gap between Instagram luxury and high-end e-commerce — building a digital storefront worthy of the brand.",
    video: "/sahr.mp4",
    meta: [
      { label: "Services", value: "E-commerce · Web Development" },
      { label: "Industry", value: "Luxury Fashion Boutique" },
      { label: "Location", value: "India · Worldwide" }
    ],
    externalLink: "https://sahrkhimjinow.in",
    problem: {
      title: "A known boutique.\nInvisible online.",
      desc: [
        "Now by Sahr Khimji had built a loyal, high-end clientele through word-of-mouth and Instagram — but their digital presence didn't match the calibre of their product. Without a proper e-commerce experience, they were relying entirely on Instagram DMs and WhatsApp to close sales.",
        "Every sale was manual. Every enquiry was a conversation. The brand deserved better — and so did their clients."
      ]
    },
    solution: {
      title: "Boutique reimagined.\nOnline.",
      desc: [
        "We designed and built a dark-luxury e-commerce experience that felt like walking into the boutique itself — refined, intentional, and immersive. Every product page, every interaction, was crafted to communicate premium quality before the customer even read a word.",
        "An automated flow replaced the manual DM-to-sale process entirely. Customers could now browse, select, and purchase with the same ease they'd expect from any world-class luxury brand."
      ]
    },
    stats: [
      { value: "250%", label: "Increase in sales reach" },
      { value: "100%", label: "Automated purchase flow" },
      { value: "0", label: "Manual DMs needed to close a sale" }
    ],
    quote: "Luxury is not decoration. It's an experience."
  },
  "chitz": {
    slug: "chitz",
    title: "CHITZ.FIT",
    eyebrow: "Case Study · Fitness & Coaching",
    tagline: "Streamlining a fitness empire through high-conversion web architecture and a unified digital hub.",
    video: "/chitz.mp4",
    meta: [
      { label: "Services", value: "Branding · Web Development" },
      { label: "Industry", value: "Fitness & Coaching" },
      { label: "Location", value: "Malaysia" }
    ],
    externalLink: "https://chitz.fit",
    problem: {
      title: "Scattered traffic.\nLost leads.",
      desc: [
        "CHITZ.FIT had built a strong following across Instagram, but their digital infrastructure was holding them back. Potential clients were being lost across multiple DMs, a fragmented link-in-bio, and a lack of any centralised booking or lead capture system.",
        "Without a proper digital home, every coaching inquiry was a manual effort — costing them hours weekly and leaving money on the table. They needed a system, not just a website."
      ]
    },
    solution: {
      title: "One hub.\nZero friction.",
      desc: [
        "We designed and built a centralised web platform that does the heavy lifting — automatically screening leads, booking consultations, and showcasing their coaching programmes in a high-conversion layout.",
        "The new site replaced the patchwork of links and manual DMs with a single, fast, beautifully branded digital presence that converts visitors into paying clients on autopilot."
      ]
    },
    stats: [
      { value: "400%", label: "Increase in engagement" },
      { value: "80%", label: "Reduction in manual screening time" },
      { value: "3×", label: "More qualified leads monthly" }
    ],
    quote: "It's not just a website. It's a system."
  },
  "social-seo": {
    slug: "social-seo",
    title: "SOCIAL & SEO",
    eyebrow: "Case Study · Social Media & SEO",
    tagline: "We strategically amplify brands across social platforms for maximum visibility and engagement.",
    video: "/content.mp4",
    meta: [
      { label: "Services", value: "Social Media · SEO · Content" },
      { label: "Industry", value: "Digital Marketing" },
      { label: "Reach", value: "Global Audience" }
    ],
    problem: {
      title: "Quiet platforms.\nLow engagement.",
      desc: [
        "Many brands struggle to cut through the noise on social media. Algorithms change, trends shift, and without a clear strategy, your content gets buried. Our clients often face the challenge of having a great product but zero visibility where it matters most: on their customers' feeds.",
        "They needed more than just \"posting\"; they needed a system that targets the right audience, triggers the right emotions, and ranks high on search intent."
      ]
    },
    solution: {
      title: "Data-driven creative.\nRelevant reach.",
      desc: [
        "We implemented a multi-platform content engine that pairs viral-ready creative with hardcore SEO data. By identifying high-intent keywords and trending visual hooks, we transformed their social profiles from passive placeholders into active lead generators.",
        "Our approach ensures that every piece of content serves a purpose: either to build brand authority or to drive direct conversions. We don't just chase likes; we build relevance."
      ]
    },
    stats: [
      { value: "320%", label: "Increase in organic reach" },
      { value: "4.5×", label: "Avg. engagement rate boost" },
      { value: "Top 3", label: "SERP ranking for key terms" }
    ],
    quote: "Expansion is not optional. It's a strategy."
  },
  "loop": {
    slug: "loop",
    title: "LOOP",
    eyebrow: "Case Study · Marketplace & Identity",
    tagline: "Reimagining the student marketplace experience through a bold Gen Z visual identity and frictionless UX.",
    video: "/loader.mp4",
    meta: [
      { label: "Services", value: "Brand Identity · Strategy" },
      { label: "Industry", value: "Student Marketplace" },
      { label: "Audience", value: "Gen Z · University Students" }
    ],
    problem: {
      title: "A better cycle.\nA forgotten market.",
      desc: [
        "The student second-hand marketplace was cluttered, inconsistent, and built on Facebook groups and WhatsApp forwards. LOOP set out to fix that — but they needed a brand identity strong enough to cut through the noise and earn the trust of a notoriously skeptical Gen Z audience.",
        "They came to us with a concept, a product, and energy. What they needed was the visual language and positioning to make it real."
      ]
    },
    solution: {
      title: "Bold design for\na bold generation.",
      desc: [
        "We built LOOP's entire visual identity from scratch — a system that felt native to Gen Z: sharp, confident, and unapologetically loud. Every asset, from the logotype to the app UI guidelines, was designed to feel different from anything else in the market.",
        "The brand strategy we paired it with gave LOOP a clear voice, a mission statement that resonates, and a positioning that made them the obvious choice for students who wanted something better."
      ]
    },
    stats: [
      { value: "100%", label: "Custom brand identity" },
      { value: "12ms", label: "Avg. interaction speed on assets" },
      { value: "5×", label: "Social traction in launch week" }
    ],
    quote: "Bold design for a bold generation."
  },
  "cyril": {
    slug: "cyril",
    title: "CYRIL'S PORTFOLIO",
    eyebrow: "Case Study · Personal Branding",
    tagline: "Crafting a standout personal brand and portfolio that positions Cyril as a creative force in the industry.",
    video: "/cyril.mp4",
    meta: [
      { label: "Services", value: "Personal Branding · Portfolio" },
      { label: "Industry", value: "Creative Professional" },
      { label: "Location", value: "Malaysia" }
    ],
    externalLink: "https://cyril.lat",
    problem: {
      title: "Talent without\na platform.",
      desc: [
        "Cyril had the skills, the vision, and the drive — but no digital presence that reflected any of it. Without a portfolio, every opportunity required a cold pitch, a patchwork of links, and a hope that the work would speak for itself.",
        "In a world where perception is everything, having no portfolio meant being invisible to the clients and collaborators that mattered most."
      ]
    },
    solution: {
      title: "A portfolio that\nspeaks volumes.",
      desc: [
        "We designed and built a portfolio experience that doesn't just display work — it tells a story. Every section is crafted to guide visitors through Cyril's creative journey, building credibility and intrigue with every scroll.",
        "The result is a living, breathing digital identity that works around the clock — attracting opportunities, showcasing range, and positioning Cyril as a serious creative professional."
      ]
    },
    stats: [
      { value: "10×", label: "More inbound inquiries" },
      { value: "100%", label: "Custom-built experience" },
      { value: "24/7", label: "Always-on personal brand" }
    ],
    quote: "Your portfolio is your loudest introduction."
  }
};
