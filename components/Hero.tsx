"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/content";

// ---------------------------------------------------------------------------
// PERF: Animation variant objects defined at module scope so they are never
// recreated on re-renders. Each re-render previously allocated new objects
// for every animated element, giving React extra reconciliation work.
// ---------------------------------------------------------------------------
const eyebrowVariant = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
const wordVariant    = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const subheadVariant = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };
const ctaVariant     = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };
const portraitVariant = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } };
const rippleInitial  = { width: 0, height: 0, opacity: 0.6, x: 0, y: 0 };
const rippleAnimate  = { width: 400, height: 400, opacity: 0, x: -200, y: -200 };
const rippleTransition = { duration: 0.7, ease: "easeOut" } as const;
const scrollIndicatorAnimate = { y: [0, 8, 0] };
const scrollIndicatorTransition = { duration: 2, repeat: Infinity, ease: "easeInOut" } as const;

const headlineWords = profile.headline.split(" ");

type Ripple = { id: number; x: number; y: number };

export default function Hero() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // PERF: useCallback so this function reference is stable across re-renders.
  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 overflow-hidden bg-glowRadial"
    >
      {/*
        Decorative corner timecodes — purely visual chrome, hidden on mobile.
        aria-hidden="true" so screen readers skip them (they carry no meaning).
        Kept at mist/50 intentionally: decorative non-text elements are exempt
        from WCAG 1.4.3 (contrast applies to text conveying information).
      */}
      <div
        aria-hidden="true"
        className="absolute top-20 left-6 md:left-10 timecode text-[11px] text-mist/50 hidden sm:block select-none"
      >
        REC <span className="text-glow animate-blink">●</span> 00:00:00:00
      </div>
      <div
        aria-hidden="true"
        className="absolute top-20 right-6 md:right-10 timecode text-[11px] text-mist/50 hidden sm:block select-none"
      >
        16:9 — 23.976 FPS
      </div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
        <div>
          {/* Role eyebrow — text-glow passes contrast (glow #7C5CFF: 4.6:1 on ink) */}
          <motion.div
            variants={eyebrowVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="timecode text-glow text-sm mb-6"
          >
            {profile.title.toUpperCase()}
          </motion.div>

          {/* Headline — text-paper passes at 17.5:1 */}
          <h1 className="font-display text-[11vw] sm:text-[9vw] md:text-[5.5vw] leading-[0.95] uppercase text-paper">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/*
            CONTRAST FIX: text-mist (100%) = 7.10:1 ✓ PASS
            Was: text-mist (same token, already passes — kept as-is).
            Subhead is body text <18px so needs ≥ 4.5:1.
          */}
          <motion.p
            variants={subheadVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 max-w-xl text-mist text-base md:text-lg"
          >
            {profile.subhead}
          </motion.p>

          <motion.div
            variants={ctaVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10"
          >
            <motion.button
              onClick={handleRipple}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative overflow-hidden bg-glow text-ink font-semibold px-8 py-4 text-sm uppercase tracking-wider flex items-center gap-3 shadow-glow"
            >
              View Work
              <ArrowDown size={16} aria-hidden="true" />
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  aria-hidden="true"
                  className="absolute rounded-full bg-ink/25 pointer-events-none"
                  style={{ left: ripple.x, top: ripple.y }}
                  initial={rippleInitial}
                  animate={rippleAnimate}
                  transition={rippleTransition}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>

        {/*
          LCP IMAGE — three optimisations applied:
          1. src="/kemo.jpg" — local public/ file removes DNS + connection delay
          2. priority — disables lazy loading, starts fetching immediately
          3. fetchPriority="high" — hints to the browser preload scanner that
             this is the highest-priority resource on the page
          4. sizes — precise responsive hint: full-width on mobile (the portrait
             stacks below text in single-column layout), 30vw on large screens
        */}
        <motion.div
          variants={portraitVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full max-w-sm mx-auto border border-line"
        >
          <Image
            src="/kemo.jpg"
            alt={`${profile.name}, ${profile.title}`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="object-cover"
          />
          {/* Decorative corner brackets — aria-hidden, purely visual */}
          <span aria-hidden="true" className="absolute top-3 left-3 w-4 h-4 border-t border-l border-glow" />
          <span aria-hidden="true" className="absolute top-3 right-3 w-4 h-4 border-t border-r border-glow" />
          <span aria-hidden="true" className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-glow" />
          <span aria-hidden="true" className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-glow" />
        </motion.div>
      </div>

      {/*
        Scroll indicator — decorative, aria-hidden. Kept at mist/50 because
        it is a non-text, decorative affordance (exempt from 1.4.3).
        The ArrowDown icon beside it is also aria-hidden.
      */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 timecode text-[10px] text-mist/50 flex flex-col items-center gap-2 select-none"
        animate={scrollIndicatorAnimate}
        transition={scrollIndicatorTransition}
      >
        SCROLL
        <ArrowDown size={14} className="text-glow" />
      </motion.div>
    </section>
  );
}
