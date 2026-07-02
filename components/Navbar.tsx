"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/content";

const NAV_LINKS = [
  { label: "About", href: "#about", code: "00:00:08:00" },
  { label: "Work", href: "#work", code: "00:00:16:00" },
  { label: "Experience", href: "#experience", code: "00:00:24:00" },
  { label: "Contact", href: "#contact", code: "00:00:32:00" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-[3px] left-0 right-0 z-40 backdrop-blur-md bg-ink/75 border-b border-line/40">
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="font-display text-lg tracking-wide text-paper hover:text-glow transition-colors"
        >
          KARIM<span className="text-glow">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button onClick={() => handleNavClick(link.href)} className="group flex flex-col items-center">
                <span className="timecode text-[10px] text-mist/60 group-hover:text-glow transition-colors">
                  {link.code}
                </span>
                <span className="text-sm font-medium text-paper/85 group-hover:text-paper transition-colors">
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden md:inline-block text-sm font-medium px-4 py-2 border border-line text-paper/90 hover:border-glow hover:text-glow hover:shadow-glowSm transition-all"
        >
          Let&apos;s Talk
        </a>

        {/* Mobile hamburger — generous 44px+ tap target */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu — full-width panel, large tap targets */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden overflow-hidden bg-ink border-b border-line/40"
          >
            <ul className="flex flex-col px-6 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-line/30 last:border-0">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full flex items-center justify-between py-4 text-left text-paper/90 hover:text-glow transition-colors"
                  >
                    <span className="text-base font-medium">{link.label}</span>
                    <span className="timecode text-[10px] text-mist/50">{link.code}</span>
                  </button>
                </li>
              ))}
              <li className="py-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="block w-full text-center py-3 border border-line text-paper hover:border-glow hover:text-glow transition-colors"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
