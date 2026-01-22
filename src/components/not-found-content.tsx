"use client";

import { motion } from "framer-motion";
import { ScrollAnimation } from "./scroll-animation";
import Link from "next/link";
import { Home } from "lucide-react";

const NotFoundContent = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollAnimation>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="gradient-text text-[12rem] leading-none font-bold"
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
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Page Not Found
          </motion.h2>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.p
            className="mb-8 text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Oops! The page you&apos;re looking for seems to have vanished into
            the digital void.
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
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </ScrollAnimation>

        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
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
