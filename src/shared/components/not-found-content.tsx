"use client";

import { motion } from "framer-motion";
import { ScrollAnimation } from "./scroll-animation";
import Link from "next/link";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";

const NotFoundContent = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollAnimation>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="gradient-text text-8xl leading-none font-bold sm:text-9xl md:text-[12rem]"
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
              404
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.h2
            className="mb-4 text-2xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("title")}
          </motion.h2>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.p
            className="mb-8 text-base text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t("description")}
          </motion.p>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-100"
            >
              <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>{t("button")}</span>
            </Link>
          </motion.div>
        </ScrollAnimation>

        {/* Background Animation Layer */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 md:h-[200%] md:w-[200%]"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
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
export default NotFoundContent;
