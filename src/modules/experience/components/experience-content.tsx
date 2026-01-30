"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { experiences } from "../data/experience-data";

export const ExperienceContent = () => {
  return (
    <>
      <ScrollAnimation>
        <h2 className="gradient-text mb-8 flex items-center gap-3 text-3xl font-bold sm:mb-12 sm:text-4xl">
          <Briefcase className="h-7 w-7 text-cyan-400 sm:h-8 sm:w-8" />
          Professional Experience
        </h2>
      </ScrollAnimation>

      <div className="space-y-8 sm:space-y-12">
        {experiences.map((exp) => (
          <ScrollAnimation key={exp.title}>
            <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-gray-800/50 backdrop-blur-sm transition-all hover:bg-gray-800/70 sm:rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,300px]">
                <div className="p-6 sm:p-8">
                  {/* Header: Icon + Title + Company */}
                  <div className="mb-4 flex items-center gap-3 sm:mb-6">
                    <div className="rounded-lg bg-white/10 p-2 transition-colors group-hover:bg-white/20 sm:rounded-xl sm:p-3">
                      <Building2 className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-white sm:text-2xl">
                        {exp.title}
                      </h3>
                      <p className="text-base text-gray-400 sm:text-lg">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Metadata: Location + Period */}
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-300 sm:mb-6 sm:text-base">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{exp.location}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{exp.period}</span>
                  </div>

                  {/* Description List */}
                  <ul className="space-y-3 sm:space-y-4">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-300 sm:text-base"
                      >
                        <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile Button */}
                  <motion.a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-cyan-400 md:hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>

                {/* Desktop Image Section */}
                <div className="relative hidden h-full min-h-75 md:block">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={exp.image}
                      alt={exp.company}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-l from-transparent to-gray-900/90 transition-opacity duration-500 group-hover:opacity-80" />
                  </div>

                  {/* Hover Button Center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 px-6 py-3 font-bold text-white backdrop-blur-md transition-all hover:border-cyan-400 hover:text-cyan-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Certificate
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </>
  );
};
