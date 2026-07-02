"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/content";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

/**
 * BUG FIX — Framer Motion ref warning
 * ----------------------------------------------------------------------
 * This card renders inside `AnimatePresence` (the whole grid uses
 * `AnimatePresence` + `layout` for filter transitions). AnimatePresence's
 * internal `PopChild` needs a real DOM ref on exiting children to
 * measure/animate them. Plain function components can't receive refs,
 * which is exactly what produced:
 *   "Function components cannot be given refs ... Check the render
 *    method of PopChild. at ProjectCard"
 *
 * Wrapping the component in `React.forwardRef` and forwarding the ref to
 * the actual DOM node (`motion.button`) resolves this completely.
 */
const ProjectCard = forwardRef<HTMLButtonElement, Props>(function ProjectCard(
  { project, onOpen },
  ref
) {
  return (
    <motion.button
      ref={ref}
      layout
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative aspect-video w-full overflow-hidden border border-line text-left bg-panel"
    >
      {/* BUG FIX — LCP / responsive image sizing
          Below-the-fold grid thumbnails: next/image, explicit `sizes` so
          the browser never downloads a full-width image for a 1/3-width
          slot, and no `priority` (these should lazy-load). */}
      <Image
        src={project.cover}
        alt={`${project.title} — cover thumbnail`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="w-14 h-14 rounded-full bg-glow/90 flex items-center justify-center shadow-glow">
          <Play size={20} className="text-ink fill-ink" />
        </span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="timecode text-[10px] text-glow mb-1">{project.category.toUpperCase()}</p>
          <h3 className="font-display text-lg uppercase leading-tight text-paper truncate">
            {project.title}
          </h3>
          <p className="text-xs text-mist/70 mt-0.5 truncate">{project.client}</p>
        </div>
        <span className="timecode text-[10px] text-mist/50 shrink-0">{project.year}</span>
      </div>
    </motion.button>
  );
});

export default ProjectCard;
