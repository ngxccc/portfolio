"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { siteConfig } from "@/shared/config/site";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ProfileSection = () => {
  const t = useTranslations("About.Profile");
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <ScrollAnimation>
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-white/10 bg-white/5">
          <Image
            src="/profile/profile.jpg"
            alt="Profile"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
            priority
          />
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="space-y-4 text-lg text-gray-300">
          <p>
            {t.rich("p1", {
              name: siteConfig.name,
              highlight: (chunks) => (
                <span className="text-cyan-400">{chunks}</span>
              ),
              school: (chunks) => (
                <span className="font-semibold text-white">{chunks}</span>
              ),
            })}
          </p>
          <p>
            {t.rich("p2", {
              stack: (chunks) => (
                <span className="text-cyan-400">{chunks}</span>
              ),
            })}
          </p>
          <p>
            {t.rich("p3", {
              linux: (chunks) => (
                <span className="text-cyan-400">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </ScrollAnimation>
    </div>
  );
};
