"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const LoadingUI = () => {
  const t = useTranslations("Common");

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black">
      <motion.div
        className="relative h-24 w-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="absolute inset-0 rounded-full border-4 border-white/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-white"
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-white/50"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-2xl font-bold text-white"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {t("loading")}
        </motion.div>
        <motion.div className="text-sm text-white/50">
          {t("loading_sub")}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingUI;
