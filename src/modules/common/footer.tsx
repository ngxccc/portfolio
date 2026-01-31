"use client";

import Link from "next/link";
import { Code2, Mail, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import { navigationConfig } from "@/shared/config/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-4 grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-4">
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-lg bg-cyan-500/10 p-2">
                <Code2 className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {siteConfig.address}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              {t("quick_links")}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {navigationConfig.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center text-sm text-gray-400 transition-colors hover:text-cyan-400"
                >
                  <span className="h-1 w-1 rounded-full bg-cyan-500 opacity-0 transition-all group-hover:mr-2 group-hover:opacity-100" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                {t("contact")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-cyan-500" />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-cyan-500" />
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                {t("social")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(siteConfig.social).map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-3">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              {t("copyright", {
                year: currentYear,
                name: siteConfig.shortName,
              })}
            </p>

            <a
              href={siteConfig.social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {t.rich("built_with", {
                name: siteConfig.shortName,
              })}
              <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
