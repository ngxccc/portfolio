"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { useTranslations } from "next-intl";
import { interests } from "../data/about-data";

export const Interests = () => {
  const t = useTranslations("About.Interests");
  return (
    <ScrollAnimation>
      <div className="mt-16">
        <h3 className="gradient-text mb-8 text-2xl font-semibold">
          {t("title")}
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {interests.map((item) => {
            const Icon = item.icon;
            const title = t(`list.${item.id}` as any);
            return (
              <ScrollAnimation key={item.id}>
                <div className="group flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/5">
                  <Icon className="h-5 w-5 text-cyan-400 transition-transform group-hover:scale-110" />

                  <span className="text-gray-300 transition-colors group-hover:text-white">
                    {title}
                  </span>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </ScrollAnimation>
  );
};
