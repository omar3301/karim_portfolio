"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 md:px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="timecode text-xs text-mist/50">
          © {year} {profile.name.toUpperCase()}. ALL FRAMES RESERVED.
        </p>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -2 }}
          className="timecode text-xs text-mist/60 hover:text-glow transition-colors"
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}
