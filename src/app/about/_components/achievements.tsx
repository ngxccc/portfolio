"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { achievements } from "./about-data";

export const Achievements = () => {
  return (
    <ScrollAnimation>
      <div className="mt-16">
        <h3 className="gradient-text mb-8 text-2xl font-semibold">
          Achievements
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => {
            const Icon = item.icon;

            return (
              <ScrollAnimation key={item.title}>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <div className="mb-4 text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </ScrollAnimation>
  );
};
