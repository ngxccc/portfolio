import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const alt = "Ngxc Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("Failed to load font data");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Blog Post";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Ngxc Blog";
  const tags = post?.tags ?? ["Tech", "Coding"];

  const [interBold, jetBrainsMono] = await Promise.all([
    fetch(
      new URL(
        "https://gitlab.com/ngxc/fonts-store/-/raw/main/inter/Inter_18pt-Bold.ttf",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "https://gitlab.com/ngxc/fonts-store/-/raw/main/jetbrains-mono/JetBrainsMono-Medium.ttf",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#050505",
        padding: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.2,
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          opacity: 0.5,
        }}
      />

      {/* --- CONTENT --- */}

      {/* Header: Logo / Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: 28,
          fontFamily: '"JetBrains Mono"',
          color: "#22d3ee", // Cyan-400
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
      </div>

      {/* Body: Post Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "auto",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontFamily: '"Inter"',
            fontWeight: 700,
            color: "transparent",
            lineHeight: 1.1,
            backgroundImage:
              "linear-gradient(to bottom right, #ffffff, #94a3b8)",
            backgroundClip: "text",
          }}
        >
          {title}
        </div>
      </div>

      {/* Footer: Metadata (Date & Tags) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          width: "100%",
          fontFamily: '"JetBrains Mono"',
          fontSize: 20,
          color: "#9ca3af", // Gray-400
        }}
      >
        {/* Date */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <div style={{ display: "flex" }}>{date}</div>
        </div>

        <div style={{ width: "1px", height: "20px", background: "#334155" }} />

        {/* Tags (Render tối đa 3 tags) */}
        <div style={{ display: "flex", gap: "12px" }}>
          {tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                backgroundColor: "rgba(34, 211, 238, 0.1)", // Cyan tint
                border: "1px solid rgba(34, 211, 238, 0.3)",
                color: "#22d3ee",
                borderRadius: "8px",
                padding: "4px 12px",
                fontSize: 18,
              }}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "JetBrains Mono",
          data: jetBrainsMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
