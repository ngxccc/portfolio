"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Command, ArrowRight } from "lucide-react";

const searchData = [
  {
    title: "Home",
    description: "Go to the welcome page",
    path: "/",
    keywords: [
      "home",
      "cv",
      "resume",
      "start",
      "welcome",
      "portfolio",
      "ngxc",
      "tran van ngoc",
      "software developer",
      "full stack developer",
      "mern stack",
      "web developer",
    ],
  },
  {
    title: "About",
    description: "Learn more about me and my background",
    path: "/about",
    keywords: [
      "about",
      "background",
      "education",
      "bio",
      "profile",
      "cv",
      "resume",
      "ngxc",
      "tran",
      "van",
      "ngoc",
      "full stack developer",
      "software engineer",
      "web developer",
    ],
  },
  {
    title: "Education",
    description: "View my educational background",
    path: "/education",
    keywords: [
      "education",
      "university",
      "college",
      "degree",
      "school",
      "board",
      "computer science",
      "engineering",
      "b.tech",
      "bengal college",
    ],
  },
  {
    title: "Experience",
    description: "Check out my professional experience",
    path: "/experience",
    keywords: [
      "experience",
      "work",
      "career",
      "jobs",
      "professional",
      "internships",
      "certificates",
      "mern",
      "web developer",
      "full stack",
      "software developer",
    ],
  },
  {
    title: "Skills",
    description: "Explore my technical skills and expertise",
    path: "/skills",
    keywords: [
      "skills",
      "technologies",
      "programming",
      "languages",
      "frameworks",
      "web",
      "development",
      "software",
      "tools",
      "react",
      "node",
      "javascript",
      "typescript",
      "next.js",
      "mongodb",
      "sql",
    ],
  },
  {
    title: "Projects",
    description: "View my portfolio of projects",
    path: "/projects",
    keywords: [
      "projects",
      "portfolio",
      "work",
      "examples",
      "github",
      "code",
      "open-source",
      "web applications",
      "full stack",
      "mern stack",
      "react",
      "node",
    ],
  },
  {
    title: "Certificates",
    description: "View my certifications and achievements",
    path: "/certificates",
    keywords: [
      "certificates",
      "certifications",
      "achievements",
      "courses",
      "learning",
      "skills",
      "professional",
      "development",
      "awards",
      "badges",
    ],
  },
  {
    title: "Contact",
    description: "Get in touch with me",
    path: "/contact",
    keywords: [
      "contact",
      "email",
      "message",
      "connect",
      "hire",
      "freelance",
      "work",
      "collaboration",
      "job",
      "opportunity",
    ],
  },
];

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const results = useMemo(() => {
    if (!searchQuery) return searchData;

    const lowerQuery = searchQuery.toLowerCase();
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.keywords.some((k) => k.toLowerCase().includes(lowerQuery)),
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
      }

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        router.push(results[selectedIndex].path);
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 rounded-lg bg-white/15 px-3 py-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Search className="h-4 w-4" />
        <span className="hidden text-sm sm:block">Search ...</span>
        <span className="hidden items-center space-x-1 rounded bg-white/10 px-1.5 py-0.5 text-xs md:flex">
          <Command className="h-3 w-3" />
          <span>K</span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />

        <div className="mt-24 inline-block w-full max-w-2xl transform text-left align-middle transition-all">
          <div className="relative rounded-xl bg-gray-900 shadow-2xl">
            <div className="flex items-center border-b border-white/10 px-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full border-0 bg-transparent px-4 py-4 text-white focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0); // Reset selection khi gõ
                }}
                autoFocus
              />
              <div className="flex items-center space-x-1 rounded bg-white/10 px-1.5 py-0.5 text-xs text-gray-400">
                <span>Esc</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">
                  No results found.
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.path}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/5 ${
                        index === selectedIndex ? "bg-white/10" : ""
                      }`}
                      onClick={() => {
                        router.push(result.path);
                        setIsOpen(false);
                      }}
                    >
                      <div>
                        <div className="font-medium text-white">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {result.description}
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 text-gray-400 ${
                          index === selectedIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
