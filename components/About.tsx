"use client";

import { motion } from "framer-motion";
import { tools, profile } from "@/data/content";

// PERF: All animation objects at module scope — stable references, zero
// re-allocation on re-render.
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const transBase   = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const transDelay1 = { duration: 0.7, delay: 0.1 } as const;
const transDelay2 = { duration: 0.7, delay: 0.2 } as const;

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="timecode text-glow text-sm mb-4"
        >
          00:00:08:00 — ABOUT
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={transBase}
          className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-[1.05] mb-6 max-w-3xl"
        >
          Design that moves.
          <br />
          <span className="text-glow">Edits that land.</span>
        </motion.h2>

        {/* text-mist = 7.10:1 ✓ PASS */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={transDelay1}
          className="text-mist text-base md:text-lg leading-relaxed max-w-2xl mb-4"
        >
          I&apos;m {profile.name}, a {profile.title.toLowerCase()} based in
          Egypt. I help agencies and brands turn flat ideas into branded
          motion — logo reveals, social campaigns, and AI-assisted edits
          built to hold attention from the first frame.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={transDelay2}
          className="text-mist text-base md:text-lg leading-relaxed max-w-2xl"
        >
          Every project moves through the same pipeline: concept, design,
          animate, edit, deliver. The tools change per brief — the
          attention to timing and rhythm doesn&apos;t.
        </motion.p>

        {/*
          Tools marquee — pure CSS animation, zero JS cost.
          CONTRAST FIX: tool name labels
          Was:  text-mist/60 → 3.17:1 ✗ FAIL
          Now:  text-mist    → 7.10:1 ✓ PASS
          (text-sm body text requires ≥ 4.5:1)
        */}
        <div className="mt-14 overflow-hidden border-t border-b border-line py-4 group">
          <div
            aria-hidden="true"
            className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          >
            {[...tools, ...tools].map((tool, i) => (
              <span key={i} className="timecode text-sm text-mist mx-6 whitespace-nowrap">
                {tool.name} <span className="text-glow mx-2">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
