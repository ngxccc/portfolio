"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { achievements } from "../data/about-data";
import { useTranslations } from "next-intl";

export const Achievements = () => {
  const t = useTranslations("About.Achievements");
  return (
    <ScrollAnimation>
      <div className="mt-16">
        <h3 className="gradient-text mb-8 text-2xl font-semibold">
          {t("title")}
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => {
            const Icon = item.icon;
            const title = t(`items.${item.id}.title` as any);
            const description = t(`items.${item.id}.description` as any);

            return (
              <ScrollAnimation key={title}>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <div className="mb-4 text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-white">
                    {title}
                  </h4>
                  <p className="text-gray-400">{description}</p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </ScrollAnimation>
  );
};
