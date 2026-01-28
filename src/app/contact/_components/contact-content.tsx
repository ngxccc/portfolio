"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { contactInfo, socialLinks } from "./contact-data";

export const ContactContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="mb-4 flex items-center gap-3 sm:mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MessageSquare className="h-7 w-7 text-cyan-400 sm:h-8 sm:w-8" />
        <h2 className="gradient-text text-3xl font-bold sm:text-4xl">
          Get in Touch
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr,1.5fr]">
        {/* Contact Information */}
        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-xl border border-white/5 bg-gray-800/50 p-5 backdrop-blur-sm sm:p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
              Contact Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-white/5 sm:p-3"
                      >
                        <div className="text-gray-400 transition-colors group-hover:text-cyan-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 sm:text-sm">
                            {info.label}
                          </p>
                          <p className="text-sm text-white transition-colors group-hover:text-cyan-400 sm:text-base">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-3 p-2 sm:p-3">
                        <div className="text-gray-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 sm:text-sm">
                            {info.label}
                          </p>
                          <p className="text-sm text-white sm:text-base">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-xl border border-white/5 bg-gray-800/50 p-5 backdrop-blur-sm sm:p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
              Connect with Me
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10 sm:flex-none sm:justify-start sm:px-4"
                  >
                    <span className="text-gray-400 transition-colors group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-gray-400 transition-colors group-hover:text-white">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
