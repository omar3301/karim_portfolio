"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/content";

const headlineWords = profile.headline.split(" ");

type Ripple = { id: number; x: number; y: number };

export default function Hero() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 overflow-hidden bg-glowRadial"
    >
      {/* Corner timecode readouts */}
      <div className="absolute top-20 left-6 md:left-10 timecode text-[11px] text-mist/50 hidden sm:block">
        REC <span className="text-glow animate-blink">●</span> 00:00:00:00
      </div>
      <div className="absolute top-20 right-6 md:right-10 timecode text-[11px] text-mist/50 hidden sm:block">
        16:9 — 23.976 FPS
      </div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="timecode text-glow text-sm mb-6"
          >
            {profile.title.toUpperCase()}
          </motion.div>

          <h1 className="font-display text-[11vw] sm:text-[9vw] md:text-[5.5vw] leading-[0.95] uppercase text-paper">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 max-w-xl text-mist text-base md:text-lg"
          >
            {profile.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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
              <ArrowDown size={16} />
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute rounded-full bg-ink/25 pointer-events-none"
                  style={{ left: ripple.x, top: ripple.y }}
                  initial={{ width: 0, height: 0, opacity: 0.6, x: 0, y: 0 }}
                  animate={{ width: 400, height: 400, opacity: 0, x: -200, y: -200 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>

        {/* Above-the-fold portrait — this is the LCP element, so it MUST
            use next/image with `priority` and no lazy-loading. Replace the
            src with Karim's real photo. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full max-w-sm mx-auto border border-line"
        >
          <Image
            src="https://i.ibb.co/cdVY7Zk/kemo.jpg"
            alt={`${profile.name} — ${profile.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 70vw, 30vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-glow" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-glow" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-glow" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-glow" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 timecode text-[10px] text-mist/50 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        SCROLL
        <ArrowDown size={14} className="text-glow" />
      </motion.div>
    </section>
  );
}
