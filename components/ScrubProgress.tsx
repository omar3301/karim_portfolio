"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * SIGNATURE ELEMENT
 * A thin bar fixed to the top of the viewport that fills left-to-right as
 * the user scrolls — like scrubbing a video timeline. A small diamond
 * "playhead" rides the leading edge. Grounded directly in Karim's craft.
 */
export default function ScrubProgress() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.3,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-line/50" aria-hidden="true">
      <motion.div
        className="relative h-full bg-glow shadow-glowSm origin-left"
        style={{ scaleX: smoothProgress }}
      >
        <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-glow rotate-45 shadow-glowSm" />
      </motion.div>
    </div>
  );
}
