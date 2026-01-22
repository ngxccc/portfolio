"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  FileText,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { ScrollAnimation } from "@/components/scroll-animation";
import { educationData } from "./education-data";

export const EducationContent = () => {
  return (
    <>
      <ScrollAnimation>
        <motion.div
          className="mb-12 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GraduationCap className="h-8 w-8 text-cyan-400" />
          <h2 className="gradient-text text-4xl font-bold">Education</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="space-y-12">
        {educationData.map((edu, index) => (
          <ScrollAnimation key={edu.school}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-gray-800/50 backdrop-blur-sm transition-all hover:bg-gray-800/70"
            >
              {/* Badge Duration */}
              <div className="absolute top-0 right-0 z-10 flex items-center gap-2 rounded-bl-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{edu.duration}</span>
              </div>

              <div className="grid gap-6 md:grid-cols-[300px,1fr]">
                {/* Left Column - Image */}
                <div className="relative h-64 md:h-full md:min-h-75">
                  <Image
                    src={edu.image}
                    alt={edu.school}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority={index === 0} // Ưu tiên load ảnh đầu tiên
                    quality={90}
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-gray-900/90 to-transparent">
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-white shadow-black drop-shadow-md">
                        {edu.school}
                      </h3>
                      <div className="mb-1 flex items-center gap-2 text-gray-200">
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <Award className="h-4 w-4" />
                        <span>{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-cyan-400" />
                    <h4 className="text-lg font-semibold text-white">
                      {edu.degree}
                    </h4>
                  </div>

                  <div className="mb-6 flex items-start gap-2 text-gray-300">
                    <FileText className="mt-1 h-5 w-5 shrink-0 text-gray-400" />
                    <p className="text-sm leading-relaxed">{edu.description}</p>
                  </div>

                  {/* Coursework Tags */}
                  {edu.coursework && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="cursor-default rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-white/20"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subject Tags */}
                  {edu.subjects && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="cursor-default rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-white/20"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.resultUrl && (
                    <motion.a
                      href={edu.resultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:text-cyan-400"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      View Result
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
    </>
  );
};
