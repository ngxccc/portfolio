"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { offlineData } from "../data/offline-data";
import { useTranslations } from "next-intl";

export const OfflineContent = () => {
  const t = useTranslations("Offline");
  const { icon: Icon, buttonIcon: ButtonIcon, buttonLink } = offlineData;

  return (
    <div
      className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-12"
      role="main"
      aria-label={t("title")}
    >
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Icon Animation */}
        <ScrollAnimation>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-6 flex justify-center sm:mb-8"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon
                className="h-24 w-24 text-gray-400 sm:h-32 sm:w-32"
                role="img"
                aria-label="No Internet Icon"
              />
            </motion.div>
          </motion.div>
        </ScrollAnimation>

        {/* Title */}
        <ScrollAnimation>
          <motion.h1
            className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("title")}
          </motion.h1>
        </ScrollAnimation>

        {/* Message */}
        <ScrollAnimation>
          <motion.p
            className="mx-auto mb-8 max-w-xs text-base text-gray-400 sm:max-w-none sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t("message")}
          </motion.p>
        </ScrollAnimation>

        {/* Button */}
        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={buttonLink}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:text-base"
              role="button"
              aria-label={t("button")}
            >
              <ButtonIcon
                className="h-4 w-4 transition-transform group-hover:scale-110 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
              <span>{t("button")}</span>
            </Link>
          </motion.div>
        </ScrollAnimation>

        {/* Background Animation Effect */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};
