"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Command, ArrowRight } from "lucide-react";
import { navigationConfig } from "@/shared/config/navigation";

const SearchDialog = () => {
  const [blogPosts, setBlogPosts] = useState<SearchDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/search");
        const data = (await res.json()) as SearchDataType[];
        setBlogPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts for search", error);
      }
    };

    void fetchPosts();
  }, []);

  const allSearchData = useMemo(() => {
    return [...navigationConfig, ...blogPosts];
  }, [blogPosts]);

  const results = useMemo(() => {
    if (!searchQuery) return allSearchData.slice(0, 5);

    const lowerQuery = searchQuery.toLowerCase();
    return allSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.keywords.some((k) => k.toLowerCase().includes(lowerQuery)),
    );
  }, [allSearchData, searchQuery]);

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
        aria-label="Open search dialog"
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
                  {results.map((result, index) => {
                    return (
                      <button
                        key={result.path}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/5 ${
                          index === selectedIndex ? "bg-white/10" : ""
                        }`}
                        onClick={() => {
                          router.push(result.path);
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        aria-label={`Navigate to ${result.title}`}
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
                            index === selectedIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
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
