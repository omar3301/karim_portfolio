"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { categories, projects, type Category, type Project } from "@/data/content";
import ProjectCard from "./ProjectCard";
import VideoModal from "./VideoModal";

// PERF: Module-scope animation objects — never recreated on re-render.
const labelVariant   = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const headingVariant = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const headingTrans   = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const pillTrans      = { type: "spring", stiffness: 350, damping: 30 } as const;

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // PERF: Stable references via useCallback — prevents child re-renders
  // caused by inline arrow functions being re-created each render.
  const handleClose = useCallback(() => setSelectedProject(null), []);

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={labelVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="timecode text-glow text-sm mb-4"
        >
          00:00:16:00 — SELECTED WORK
        </motion.div>

        <motion.h2
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={headingTrans}
          className="font-display text-3xl sm:text-4xl md:text-5xl uppercase mb-10"
        >
          Cut. Render. Repeat.
        </motion.h2>

        {/* Filter bar — horizontally scrollable on mobile, large tap targets */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative shrink-0 px-5 py-2.5 text-sm font-medium uppercase tracking-wide transition-colors border whitespace-nowrap ${
                  isActive
                    ? "text-ink border-glow"
                    : "text-mist border-line hover:border-paper/40 hover:text-paper"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-glow shadow-glowSm -z-10"
                    transition={pillTrans}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Project grid — LayoutGroup + layout prop animate reflow on
            filter change; AnimatePresence handles enter/exit. ProjectCard
            is forwardRef'd so PopChild can measure exiting cards correctly. */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filteredProjects.length === 0 && (
          /*
            CONTRAST FIX: empty state text
            Was:  text-mist/60 → 3.17:1 ✗ FAIL
            Now:  text-mist    → 7.10:1 ✓ PASS
          */
          <p className="text-mist text-sm timecode mt-8">NO CLIPS IN THIS BIN YET.</p>
        )}
      </div>

      {/* Lightbox modal — the ONLY place an iframe is ever rendered */}
      <VideoModal project={selectedProject} onClose={handleClose} />
    </section>
  );
}
