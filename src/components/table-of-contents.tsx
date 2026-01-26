"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("#mdx-content h2, #mdx-content h3"),
    );

    const items = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    }));

    // Dùng requestAnimationFrame để "hoãn binh"
    // Nó giúp React render xong frame hiện tại rồi mới update state
    // => Hết lỗi "Synchronous setState"
    requestAnimationFrame(() => {
      setHeadings(items);
    });

    if (items.length === 0) return;

    // 2. Logic Observer giữ nguyên
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" },
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
        On this page
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((item) => (
          <li key={item.id} style={{ paddingLeft: (item.level - 2) * 16 }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block transition-colors hover:text-cyan-400",
                item.id === activeId
                  ? "font-medium text-cyan-400"
                  : "text-gray-500",
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
