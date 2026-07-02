"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 md:px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/*
          CONTRAST FIX: copyright text
          Was:  text-mist/50 → 2.55:1 ✗ FAIL
          Now:  text-mist    → 7.10:1 ✓ PASS
        */}
        <p className="timecode text-xs text-mist">
          © {year} {profile.name.toUpperCase()}. ALL FRAMES RESERVED.
        </p>
        {/*
          CONTRAST FIX: back-to-top button
          Was:  text-mist/60 → 3.17:1 ✗ FAIL
          Now:  text-mist    → 7.10:1 ✓ PASS
        */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -2 }}
          className="timecode text-xs text-mist hover:text-glow transition-colors"
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}
