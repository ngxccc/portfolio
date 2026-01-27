"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import SearchDialog from "./search-dialog";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/config/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
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
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  {navigationConfig.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        "nav-link",
                        pathname === link.path && "bg-white/10 text-white",
                      )}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile header right section */}
              <SearchDialog />
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full right-0 left-0 h-screen bg-black/90 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
