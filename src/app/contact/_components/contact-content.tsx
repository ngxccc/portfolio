"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { contactInfo, socialLinks } from "./contact-data";

export const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Thêm gửi mail
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="mb-8 flex items-center gap-3 sm:mb-12"
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
        {/* Left Column - Contact Information */}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="rounded-xl border border-white/5 bg-gray-800/50 p-5 backdrop-blur-sm sm:p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white sm:text-xl">
              Office Hours
            </h3>
            <div className="space-y-2 text-sm text-gray-400 sm:text-base">
              <p>Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
              <p>Saturday: 10:00 AM - 2:00 PM (IST)</p>
              <p>Sunday: Closed</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-xl border border-white/5 bg-gray-800/50 p-6 backdrop-blur-sm sm:p-8"
        >
          <h3 className="mb-6 text-lg font-semibold text-white sm:text-xl">
            Send a Message
          </h3>
          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="space-y-5 sm:space-y-6"
          >
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-base"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-base"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-base"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                required
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-base"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-green-400 sm:text-base"
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
