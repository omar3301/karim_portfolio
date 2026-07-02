"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";
import { profile, socials } from "@/data/content";

// Lucide doesn't ship Behance/Vimeo — we use clean SVG inline icons for those.
function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M7.443 5.35c.639 0 1.23.05 1.77.198.541.099.984.298 1.377.546.394.248.689.596.886 1.044.197.447.295.994.295 1.59 0 .695-.148 1.29-.492 1.739-.295.447-.787.844-1.377 1.142.836.248 1.475.695 1.869 1.341.394.646.59 1.39.59 2.186 0 .695-.148 1.29-.394 1.788-.246.497-.64.944-1.082 1.24-.443.347-.984.596-1.574.745-.591.149-1.23.198-1.869.198H0V5.35zm-.394 5.47c.492 0 .934-.1 1.23-.348.295-.248.443-.596.443-1.093 0-.298-.049-.546-.148-.744-.099-.198-.247-.348-.443-.447-.197-.099-.394-.149-.64-.198-.246-.05-.492-.05-.738-.05H2.853v2.88zm.197 5.717c.295 0 .59-.05.836-.099.246-.05.492-.149.689-.298.197-.149.344-.348.492-.596.099-.249.197-.547.197-.945 0-.745-.197-1.29-.59-1.588-.394-.298-.935-.447-1.574-.447H2.853v3.973zM17.606 17.5c.492.497 1.23.745 2.164.745.689 0 1.279-.199 1.77-.497.492-.348.787-.695.886-1.093h2.46c-.394 1.24-1.033 2.136-1.869 2.682-.836.497-1.869.795-2.951.795-.836 0-1.574-.15-2.262-.447-.64-.298-1.23-.695-1.672-1.192-.443-.497-.836-1.093-1.082-1.788-.246-.695-.344-1.44-.344-2.236 0-.794.148-1.539.394-2.234.246-.696.64-1.291 1.082-1.788.492-.497 1.033-.895 1.672-1.143.64-.298 1.377-.447 2.164-.447.886 0 1.672.199 2.36.547.64.348 1.18.845 1.623 1.44.443.596.738 1.29.935 2.036.148.745.197 1.49.148 2.285h-7.34c.05.993.344 1.788.836 2.285zm3.788-5.965c-.394-.447-1.033-.645-1.77-.645-.492 0-.886.099-1.23.248-.344.149-.59.347-.787.596-.197.248-.344.496-.394.744-.099.249-.148.497-.148.745h5.077c-.148-.844-.443-1.44-.836-1.888zM15.44 5.35h6.06v1.539h-6.06z" />
    </svg>
  );
}

function VimeoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.612-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.478 4.807z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.FC> = {
  LinkedIn: LinkedInIcon,
  Behance: BehanceIcon,
  Vimeo: VimeoIcon,
};

function FormField({
  label,
  value,
  onChange,
  type,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: "text" | "email" | "textarea";
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      {/*
        CONTRAST FIX: form field label
        Was:  text-mist/70 → 3.97:1 ✗ FAIL
        Now:  text-mist    → 7.10:1 ✓ PASS
      */}
      <span className="timecode text-xs text-mist">{label.toUpperCase()}</span>
      {type === "textarea" ? (
        <textarea
          required
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          /*
            CONTRAST FIX: placeholder text
            Was:  placeholder:text-mist/30 → 1.62:1 ✗ FAIL
            Now:  placeholder:text-mist/80 → 4.85:1 ✓ PASS
            WCAG 1.4.3 applies to placeholder text — it conveys expected input.
          */
          className="bg-transparent border-b border-line focus:border-glow outline-none py-2 text-paper placeholder:text-mist/80 transition-colors resize-none"
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border-b border-line focus:border-glow outline-none py-2 text-paper placeholder:text-mist/80 transition-colors"
        />
      )}
    </label>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Wire handleSubmit to a real backend before going live —
  // a Next.js API route, Formspree, or Resend work well.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="timecode text-glow text-sm mb-4"
        >
          00:00:32:00 — CONTACT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl uppercase mb-4"
        >
          Let&apos;s Cut <br className="hidden sm:block" />
          Something Great.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-mist max-w-lg mb-14"
        >
          Have a project in mind? Send a brief — or just say hi. I usually
          reply within a day.
        </motion.p>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <FormField
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              type="text"
              placeholder="Your name"
            />
            <FormField
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              type="email"
              placeholder="you@email.com"
            />
            <FormField
              label="Message"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              type="textarea"
              placeholder="Tell me about the project..."
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mt-2 bg-glow text-ink font-semibold px-8 py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-3 w-fit shadow-glow"
            >
              {submitted ? "Sent ✓" : "Send Message"}
              {!submitted && <Send size={16} />}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-10"
          >
            <div>
              {/* CONTRAST FIX: text-mist/60 (3.17:1 ✗) → text-mist (7.10:1 ✓) */}
              <p className="timecode text-xs text-mist mb-4">DIRECT</p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-paper/80 hover:text-glow transition-colors mb-3 py-1"
              >
                <Mail size={18} className="shrink-0" />
                <span className="break-all">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phoneRaw}`}
                className="flex items-center gap-3 text-paper/80 hover:text-glow transition-colors py-1"
              >
                <Phone size={18} className="shrink-0" />
                {profile.phone}
              </a>
            </div>

            <div>
              {/* CONTRAST FIX: text-mist/60 (3.17:1 ✗) → text-mist (7.10:1 ✓) */}
              <p className="timecode text-xs text-mist mb-4">SOCIAL</p>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.name];
                  // text-mist/80 = 4.85:1 ✓ PASS — confirmed, no change needed
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-12 h-12 flex items-center justify-center border border-line text-mist/80 hover:border-glow hover:text-glow hover:shadow-glowSm transition-colors"
                    >
                      {Icon && <Icon />}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
