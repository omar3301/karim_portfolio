"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/content";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="timecode text-glow text-sm mb-4"
        >
          00:00:24:00 — EXPERIENCE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl uppercase mb-16"
        >
          The Edit Timeline
        </motion.h2>

        {/* Vertical track rail */}
        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-line" />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Diamond playhead marker */}
                <span
                  className={`absolute -left-10 md:-left-14 top-1.5 w-3.5 h-3.5 rotate-45 ${
                    item.current
                      ? "bg-glow shadow-glowSm"
                      : "bg-line border border-mist/30"
                  }`}
                />

                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-display text-xl sm:text-2xl uppercase">{item.company}</h3>
                  {item.current && (
                    <span className="timecode text-[10px] text-glow border border-glow px-2 py-0.5 animate-pulseGlow">
                      LIVE
                    </span>
                  )}
                </div>

                <p className="timecode text-xs text-mist/60 mb-2">{item.period}</p>
                <p className="text-mist text-sm">{item.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
