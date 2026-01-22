"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Globe } from "lucide-react";
import { interests } from "./about-data";

export const Interests = () => {
  return (
    <ScrollAnimation>
      <div className="mt-16">
        <h3 className="gradient-text mb-8 text-2xl font-semibold">
          Areas of Interest
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {interests.map((interest) => (
            <ScrollAnimation key={interest}>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                <Globe className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">{interest}</span>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </ScrollAnimation>
  );
};
