"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { categories, projects, type Category, type Project } from "@/data/content";
import ProjectCard from "./ProjectCard";
import VideoModal from "./VideoModal";

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="timecode text-glow text-sm mb-4"
        >
          00:00:16:00 — SELECTED WORK
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
          <p className="text-mist/60 text-sm timecode mt-8">NO CLIPS IN THIS BIN YET.</p>
        )}
      </div>

      {/* Lightbox modal — the ONLY place an iframe is ever rendered */}
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
