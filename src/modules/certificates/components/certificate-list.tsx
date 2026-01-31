"use client";

import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Award, Home } from "lucide-react";
import { certificates } from "../data/certificates-data";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const CertificateList = () => {
  const t = useTranslations("Certificates");

  if (certificates.length === 0) {
    return (
      <ScrollAnimation>
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
          <div className="mb-4 rounded-full bg-cyan-500/10 p-4">
            <Award className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">
            {t("empty_state.title")}
          </h3>
          <p className="mb-6 max-w-md text-gray-400">
            {t("empty_state.description")}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            <Home className="h-4 w-4" />
            {t("empty_state.cta")}
          </Link>
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {certificates.map((cert, index) => {
        const title = t(`list.${cert.id}.title` as any);
        const issuer = t(`list.${cert.id}.issuer` as any);
        const date = t(`list.${cert.id}.date` as any);
        const description = t(`list.${cert.id}.description` as any);
        const skills = t(`list.${cert.id}.skills` as any).split(", ");

        return (
          <ScrollAnimation key={cert.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 group-hover:opacity-100" />

              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                    {title}
                  </h3>
                  <p className="text-lg text-gray-300">{issuer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{date}</span>
                </div>
              </div>

              <p className="mb-6 line-clamp-2 text-sm text-gray-400">
                {description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                whileHover={{ x: 5 }}
              >
                Xem chứng chỉ
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </ScrollAnimation>
        );
      })}
    </div>
  );
};
