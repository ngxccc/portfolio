"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

export const BackToTop = () => {
  const t = useTranslations("Common");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hiện khi cuộn quá 400px
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed right-8 bottom-8 z-50 cursor-pointer rounded-full border border-cyan-400/45 bg-cyan-600/25 p-3 text-cyan-300 transition-all hover:-translate-y-1",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0",
      )}
      aria-label={t("back_to_top")}
      title={t("back_to_top")}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
