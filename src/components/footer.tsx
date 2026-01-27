"use client";

import Link from "next/link";
import { Code2, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

// Split links into columns of 3
const COLUMN1 = navigationConfig.slice(0, 3);
const COLUMN2 = navigationConfig.slice(3, 6);
const COLUMN3 = navigationConfig.slice(6, 9);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-4">
          {/* Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Software Developer based in {siteConfig.address}.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Links - First Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {/* Column 1 */}
              <div>
                {COLUMN1.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="mb-2 block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              {/* Column 2 */}
              <div>
                {COLUMN2.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="mb-2 block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              {/* Column 3 */}
              <div>
                {COLUMN3.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="mb-2 block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Social</h3>
            <div className="flex space-x-4">
              {Object.values(siteConfig.social).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} Tran Van Ngoc. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a
                href=""
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                Ngxc&apos;s Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
