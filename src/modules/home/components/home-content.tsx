"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Check, FileDown, User } from "lucide-react";
import { VercelLogo } from "@/shared/components/tech-logos";
import { homeData, socialStatsData } from "../data/home-data";
import { heroVariants, statsVariants } from "@/shared/config/animations";
import { formatCount } from "@/shared/lib/utils";

interface HomeContentProps {
  initialGithubRepos: number;
  initialTiktokFollowers: number;
}

export const HomeContent = ({
  initialGithubRepos,
  initialTiktokFollowers,
}: HomeContentProps) => {
  const [copied, setCopied] = useState(false);

  const githubRepos = initialGithubRepos;
  const tiktokFollowers = initialTiktokFollowers;

  const socialStats = socialStatsData.map((item) => {
    if (item.id === "github") {
      return { ...item, value: formatCount(githubRepos) };
    }
    if (item.id === "tiktok") {
      return { ...item, value: formatCount(tiktokFollowers) };
    }
    return item;
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(homeData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailClick = async (e: React.MouseEvent) => {
    // Logic này an toàn, không gây lỗi Hydration vì nó chạy sau khi page đã load
    if (typeof window !== "undefined" && window.innerWidth <= 640) {
      window.location.href = `mailto:${homeData.email}`;
      e.preventDefault();
    } else {
      await copyToClipboard();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={heroVariants.container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="relative mb-4 text-4xl font-bold tracking-tighter sm:mb-6 sm:text-6xl md:text-8xl"
            variants={heroVariants.item}
          >
            {homeData.name}
          </motion.h1>
          <motion.h1
            className="relative mb-4 text-2xl font-bold tracking-tighter sm:mb-6 sm:text-4xl md:text-6xl"
            variants={heroVariants.item}
          >
            {homeData.title}
          </motion.h1>

          <motion.p
            className="mx-auto mb-4 max-w-2xl px-2 text-lg text-gray-400 sm:mb-5 sm:px-4 sm:text-xl md:text-2xl"
            variants={heroVariants.item}
          >
            {homeData.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <a
              href={homeData.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100 sm:px-6 sm:py-3 sm:text-base"
            >
              <FileDown className="h-4 w-4 sm:h-5 sm:w-5" />
              Tải xuống CV
            </a>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Giới Thiệu
            </Link>
          </div>

          <button
            onClick={(e) => void handleEmailClick(e)}
            className="group relative flex cursor-copy items-center gap-2 py-2 pr-4 pl-8 transition-all hover:bg-transparent sm:cursor-pointer"
            aria-label={
              copied
                ? "Email copied to clipboard"
                : "Click to copy email address"
            }
          >
            <div className="absolute left-0 flex items-center">
              <div className="w-3 text-gray-500 transition-colors group-hover:text-white">
                <VercelLogo />
              </div>
              <span className="ml-3 font-mono text-lg text-gray-400 transition-colors group-hover:text-white">
                ~
              </span>
            </div>
            <span className="ml-4 text-gray-400 transition-colors group-hover:text-white sm:text-base">
              {homeData.email}
            </span>
            <div className="ml-1 hidden opacity-0 transition-opacity group-hover:opacity-100 sm:block">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400 transition-colors hover:text-white" />
              )}
            </div>
          </button>
        </motion.div>

        {/* Social Stats Grid */}
        <motion.div
          className="mx-auto mt-8 grid max-w-xs grid-cols-2 justify-items-center gap-6 sm:mt-12 sm:max-w-none"
          variants={statsVariants.container}
          initial="hidden"
          animate="visible"
        >
          {socialStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.a
                key={stat.id}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col items-center"
                variants={statsVariants.item}
                whileHover={statsVariants.hover}
              >
                {/* Icon Box */}
                <div className="mb-2 w-full max-w-50 rounded-xl p-3 transition-colors">
                  <Icon
                    className={`mx-auto ${stat.iconSize} text-gray-400 transition-colors group-hover:text-white`}
                  />
                </div>

                {/* Text Stats */}
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold sm:text-lg">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
