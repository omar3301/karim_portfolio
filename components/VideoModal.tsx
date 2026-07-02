"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/content";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

type Props = {
  project: Project | null;
  onClose: () => void;
};

/**
 * BUG FIX — Framer Motion ref warning
 * This component is also rendered inside `AnimatePresence` (it animates
 * its own mount/unmount). Forwarding the ref to the outer motion.div keeps
 * AnimatePresence's PopChild measurement working correctly — same fix as
 * ProjectCard above.
 *
 * PERFORMANCE: the Vimeo/YouTube <iframe> only ever renders here, inside
 * the modal, and only while `project` is non-null. The grid never mounts
 * a single iframe, which is what was previously tanking LCP/TBT.
 */
const VideoModal = forwardRef<HTMLDivElement, Props>(function VideoModal(
  { project, onClose },
  ref
) {
  useLockBodyScroll(Boolean(project));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 backdrop-blur-sm px-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex items-center gap-2 text-paper/70 hover:text-glow transition-colors w-11 h-11 justify-end"
            >
              <span className="timecode text-xs hidden sm:inline">CLOSE</span>
              <X size={22} />
            </button>

            <div className="relative w-full aspect-video bg-panel border border-line overflow-hidden">
              <iframe
                src={project.embedUrl}
                title={project.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between mt-4 gap-3">
              <div className="min-w-0">
                <p className="timecode text-[10px] text-glow">{project.category.toUpperCase()}</p>
                <h3 className="font-display text-lg sm:text-xl uppercase truncate">
                  {project.title}
                </h3>
              </div>
              {/* CONTRAST FIX: text-mist/60 (3.17:1 ✗) → text-mist (7.10:1 ✓) */}
              <span className="timecode text-xs text-mist shrink-0">{project.client}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default VideoModal;
