// ============================================================================
// CENTRAL CONTENT FILE
// Edit profile info, socials, experience, and project entries here.
// No copy is hardcoded inside component JSX.
// ============================================================================

export const profile = {
  name: "Karim Mahmoud",
  title: "Senior Graphic & Motion Designer",
  headline: "Bringing Ideas to Life Through Motion & Design.",
  subhead:
    "I design brand identities and craft motion graphics that make people stop scrolling — from logo reveals to full AI-assisted video campaigns.",
  email: "kabomossalam@gmail.com",
  phone: "+20 120 215 0272",
  phoneRaw: "+201202150272",
  location: "Egypt",
};

export const socials = [
  {
    name: "LinkedIn",
    handle: "karim-mahmoud",
    url: "https://www.linkedin.com/in/karim-mahmoud-4760a81a7/",
  },
  {
    name: "Behance",
    handle: "karimabomosalam",
    url: "https://www.behance.net/karimabomosalam",
  },
  {
    name: "Vimeo",
    handle: "karimabomossalam",
    url: "https://vimeo.com/karimabomossalam",
  },
];

export const tools = [
  { name: "Adobe Photoshop" },
  { name: "Adobe Illustrator" },
  { name: "Adobe After Effects" },
  { name: "Adobe Premiere Pro" },
  { name: "Blender" },
  { name: "DaVinci Resolve" },
  { name: "Midjourney" },
  { name: "Runway" },
];

// Experience is a literal sequence of jobs in time — the one place a
// numbered/ordered timeline genuinely earns its place in this design.
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Nahdet Misr Publishing Group",
    role: "Senior Graphics & Motion Designer",
    period: "Aug 2025 — Present",
    current: true,
  },
  {
    company: "FM Marketing Agency",
    role: "Motion Designer & Video Editor",
    period: "Jan 2025 — Aug 2025",
  },
  {
    company: "Hidaya Company",
    role: "Graphic & Motion Designer",
    period: "Jan 2024 — Jan 2025",
  },
  {
    company: "STS Agency",
    role: "Motion Designer",
    period: "Jan 2023 — Dec 2023",
  },
  {
    company: "El Wekalla Marketing Agency",
    role: "Graphic Designer",
    period: "Jan 2021 — Jan 2022",
  },
  {
    company: "Freelance",
    role: "Independent Designer & Editor",
    period: "2019 — Present",
    current: true,
  },
];

export const categories = [
  "All",
  "Logo Animation",
  "Motion Reels",
  "Video Editing",
  "AI Videos",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Category;
  cover: string; // static thumbnail — shown in the grid (never an iframe)
  embedUrl: string; // Vimeo/YouTube embed URL — only loaded inside the modal
  year: string;
};

// PLACEHOLDER PROJECT DATA — swap `cover` and `embedUrl` with real assets.
// embedUrl must be an embeddable Vimeo (player.vimeo.com/video/ID) or
// YouTube (youtube.com/embed/ID) URL — never a raw Drive link.
export const projects: Project[] = [
  {
    id: "proj-01",
    title: "Aurora — Logo Reveal",
    client: "Aurora Skincare",
    category: "Logo Animation",
    cover:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://player.vimeo.com/video/76979871",
    year: "2026",
  },
  {
    id: "proj-02",
    title: "Nile Foods — Campaign Reel",
    client: "Nile Foods Co.",
    category: "Motion Reels",
    cover:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://player.vimeo.com/video/148751763",
    year: "2025",
  },
  {
    id: "proj-03",
    title: "Hidaya — Ramadan Promo",
    client: "Hidaya Company",
    category: "Video Editing",
    cover:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2024",
  },
  {
    id: "proj-04",
    title: "STS — Brand Identity Sting",
    client: "STS Agency",
    category: "Logo Animation",
    cover:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://player.vimeo.com/video/76979871",
    year: "2023",
  },
  {
    id: "proj-05",
    title: "Product Launch — AI Explainer",
    client: "FM Marketing",
    category: "AI Videos",
    cover:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://player.vimeo.com/video/148751763",
    year: "2026",
  },
  {
    id: "proj-06",
    title: "Nahdet Misr — Title Sequence",
    client: "Nahdet Misr Publishing",
    category: "Motion Reels",
    cover:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2026",
  },
  {
    id: "proj-07",
    title: "AI Product Showcase",
    client: "Freelance Client",
    category: "AI Videos",
    cover:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://player.vimeo.com/video/76979871",
    year: "2026",
  },
  {
    id: "proj-08",
    title: "Wedding Highlight Cut",
    client: "Freelance Client",
    category: "Video Editing",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2025",
  },
];
