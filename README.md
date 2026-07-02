# Karim Mahmoud — Portfolio v2

**Senior Graphic & Motion Designer portfolio** — rebuilt with performance
and bug-fix priorities from the Lighthouse audit.

## What was fixed in v2

### 1. Framer Motion ref error — `forwardRef`
`ProjectCard` and `VideoModal` are now wrapped in `React.forwardRef`,
forwarding the ref down to the underlying DOM node (`motion.button` /
`motion.div`). This gives `AnimatePresence`'s internal `PopChild` the DOM
ref it needs to measure and animate exiting elements. The warning:
> "Function components cannot be given refs. Check the render method of
>  PopChild. at ProjectCard"
is fully resolved.

### 2. LCP — 14.6 s → target < 2.5 s
- Hero portrait image uses `next/image` with `priority` (no lazy-load).
- All grid thumbnails use `next/image` with `sizes="(max-width: 768px)
  100vw, (max-width: 1200px) 50vw, 33vw"` — browser downloads the right
  resolution per viewport, not always the full-size image.
- `next.config.js` enables `avif` and `webp` format negotiation.
- **Zero iframes in the grid** — Vimeo/YouTube iframes only mount inside
  the lightbox modal when a project is actively selected.

### 3. Mobile-first
- Navbar uses a full-panel hamburger menu with ≥44px tap targets.
- Filter bar is horizontally scrollable on mobile (no wrap/overflow).
- All click targets meet 44px minimum across the site.

---

## Getting started

```bash
npm install
npm run dev          # → http://localhost:3000
npm run build        # production build
npm run start        # serve production build locally
```

---

## Project structure

```
app/
  layout.tsx               → root layout, fonts, metadata
  page.tsx                 → assembles all sections
  global.css               → base styles, scrollbar, grain, focus, modal-open
components/
  ScrubProgress.tsx        → signature scroll-playhead bar
  GrainOverlay.tsx         → static film-grain texture
  Navbar.tsx               → fixed nav, hamburger mobile menu
  PageTransition.tsx       → one-time page-load "render" curtain
  Hero.tsx                 → headline stagger + ripple CTA (LCP image: priority)
  About.tsx                → bio + tools marquee
  PortfolioGrid.tsx        → filter bar + Framer Motion layout grid
  ProjectCard.tsx          ★ forwardRef — fixes ref warning
  VideoModal.tsx           ★ forwardRef — lightbox, iframe only mounts here
  ExperienceTimeline.tsx   → vertical edit-timeline with clip markers
  Contact.tsx              → form + social icons (LinkedIn, Behance, Vimeo)
  Footer.tsx               → copyright + back-to-top
data/
  content.ts               → ALL editable copy: profile, socials, tools,
                              experience, and project entries
lib/
  useLockBodyScroll.ts     → body scroll lock while modal is open
```

---

## Customising content

All text and data lives in **`data/content.ts`** — edit that file only
to update profile info, socials, experience entries, or project listings.

## Swapping in real media

**Profile photo (Hero LCP element)**
```tsx
// In components/Hero.tsx, replace the Image src with:
src="/images/karim-profile.jpg"
// Drop the real photo into public/images/karim-profile.jpg
```

**Project covers** — replace `cover` values in `data/content.ts` with
hosted thumbnail URLs or `/images/proj-xx.jpg` local paths.

**Project embed URLs** — replace `embedUrl` with real Vimeo or YouTube
embed links:
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
Never use raw Google Drive links — they are not embeddable.

**Contact form** — `components/Contact.tsx` simulates submission
client-side. Wire `handleSubmit` to a real backend before deploying:
a Next.js API route, [Formspree](https://formspree.io), or
[Resend](https://resend.com) all work well.

---

## Deploying to Vercel

```bash
# Push to GitHub, then:
vercel deploy
# Or connect the repo in the Vercel dashboard — zero config needed.
```

Set `metadataBase` in `app/layout.tsx` to the real production URL before
the first deploy.
