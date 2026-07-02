/**
 * Fixed, static film-grain texture (pure CSS background, no JS, no
 * repaint cost). Reinforces the video/film subject without a literal icon.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay bg-noise" aria-hidden="true" />;
}
