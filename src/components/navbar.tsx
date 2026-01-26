"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import SearchDialog from "./search-dialog";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/config/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Ngxc</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-6 md:flex">
              <SearchDialog />
              {navigationConfig.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "nav-link",
                    pathname === link.path && "bg-white/15 backdrop-blur-sm",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Mobile header right section */}
            <div className="flex items-center space-x-2 md:hidden">
              <SearchDialog />
              <button
                className="p-2 text-gray-400 transition-colors hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full right-0 left-0 bg-black/50 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-1 px-4 pt-2 pb-3">
              {navigationConfig.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-3 py-2 text-gray-400 transition-colors hover:text-white ${
                    pathname === link.path
                      ? "bg-white/10 text-white backdrop-blur-sm"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
