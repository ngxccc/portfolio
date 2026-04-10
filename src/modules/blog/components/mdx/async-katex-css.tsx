"use client";

// PERF: Prevent main-thread blocking by delegating heavy CSS parsing to background network idle time.
// Time Complexity: O(1) for initial DOM render lock.
export default function AsyncKatexCSS() {
  return (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.45/dist/katex.min.css"
      // HACK: Browser assumes "print" media is non-critical for screen display -> It downloads without blocking.
      media="print"
      // WHY: React synthetic event. Once downloaded, we swap media to "all" to apply styles to the screen.
      onLoad={(e) => {
        e.currentTarget.media = "all";
      }}
    />
  );
}
