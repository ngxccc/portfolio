"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { skillsData } from "../data/skills-data";

export const SkillsContent = () => {
  return (
    <>
      <ScrollAnimation>
        <h2 className="gradient-text mb-4 text-4xl font-bold">
          Technical Skills
        </h2>
      </ScrollAnimation>

      <ScrollAnimation>
        <p className="mb-12 max-w-2xl text-gray-400">
          A comprehensive overview of my technical expertise and tools I work
          with
        </p>
      </ScrollAnimation>

      <div className="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
        {skillsData.map((skillGroup) => {
          const CategoryIcon = skillGroup.icon;

          return (
            <ScrollAnimation key={skillGroup.category}>
              <div className="break-inside-avoid rounded-lg border border-white/5 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-gray-800/70">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="rounded-lg bg-white/10 p-2 text-white">
                    <CategoryIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {skillGroup.items.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="group flex items-center justify-center gap-2 rounded-lg bg-gray-700/50 px-4 py-3 transition-all hover:bg-white/10"
                      >
                        <div className="text-gray-400 transition-colors group-hover:text-white">
                          <SkillIcon className={skill.iconClassName} />
                        </div>
                        <span className="text-sm text-gray-400 transition-colors group-hover:text-white">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    </>
  );
};
