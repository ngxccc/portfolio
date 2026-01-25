"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollAnimation } from "@/components/scroll-animation";
import { offlineData } from "./offline-data";

export const OfflineContent = () => {
  const {
    icon: Icon,
    title,
    message,
    buttonText,
    buttonIcon: ButtonIcon,
    buttonLink,
  } = offlineData;

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      role="main"
      aria-label="Offline Page"
    >
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Icon Animation */}
        <ScrollAnimation>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-8 flex justify-center"
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
                className="h-32 w-32 text-gray-400"
                role="img"
                aria-label="No Internet Connection Icon"
              />
            </motion.div>
          </motion.div>
        </ScrollAnimation>

        {/* Title */}
        <ScrollAnimation>
          <motion.h1
            className="mb-4 text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>
        </ScrollAnimation>

        {/* Message */}
        <ScrollAnimation>
          <motion.p
            className="mb-8 text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {message}
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
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
              role="button"
              aria-label={buttonText}
            >
              <ButtonIcon
                className="h-5 w-5 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              <span>{buttonText}</span>
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
