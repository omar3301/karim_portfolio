import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./global.css";
import ScrubProgress from "@/components/ScrubProgress";
import GrainOverlay from "@/components/GrainOverlay";

// Anton: condensed display face for headlines.
// Inter: body face.
// JetBrains Mono: utility face for timecodes / nav labels / tags.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karimmahmoud.design"),
  title: {
    default: "Karim Mahmoud — Senior Graphic & Motion Designer",
    template: "%s — Karim Mahmoud",
  },
  description:
    "Portfolio of Karim Mahmoud, Senior Graphic & Motion Designer specializing in logo animation, motion reels, video editing, and AI-assisted video production.",
  keywords: [
    "Karim Mahmoud",
    "Motion Designer",
    "Graphic Designer",
    "Video Editor Egypt",
    "Motion Graphics Portfolio",
    "AI Video Production",
  ],
  authors: [{ name: "Karim Mahmoud" }],
  openGraph: {
    title: "Karim Mahmoud — Senior Graphic & Motion Designer",
    description:
      "Logo animation, motion reels, video editing, and AI-assisted video production.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Mahmoud — Senior Graphic & Motion Designer",
    description:
      "Logo animation, motion reels, video editing, and AI-assisted video production.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-body bg-ink text-paper antialiased">
        {/* Persistent scroll-scrub progress bar — mimics a video playhead */}
        <ScrubProgress />
        {/* Fixed, performance-cheap grain texture */}
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
