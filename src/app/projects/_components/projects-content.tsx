"use client";

import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ScrollAnimation } from "@/components/scroll-animation";
import Image from "next/image";
import { projects } from "./projects-data";

export const ProjectsContent = () => {
  return (
    <>
      <ScrollAnimation>
        <h2 className="gradient-text mb-12 text-4xl font-bold">
          Featured Projects
        </h2>
      </ScrollAnimation>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ScrollAnimation key={project.title}>
            <div className="group overflow-hidden rounded-lg border border-white/5 bg-gray-800/50 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-gray-800/70 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-cyan-400">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-gray-400">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-sm text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center space-x-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <FaGithub className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center space-x-2 text-gray-400 transition-colors hover:text-cyan-400"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </>
  );
};
