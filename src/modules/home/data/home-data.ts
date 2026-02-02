import { siteConfig } from "@/shared/config/site";
import type { IconType } from "react-icons";
import { FaGithub, FaTiktok } from "react-icons/fa";

interface SocialStatItem {
  id: "github" | "linkedin" | "tiktok";
  href: string;
  icon: IconType;
  label: string;
  value: string;
  iconSize: string;
}

export const socialStatsData: SocialStatItem[] = [
  {
    id: "github",
    href: siteConfig.social.github.href,
    icon: FaGithub,
    label: "GitHub Projects",
    value: "...",
    iconSize: "h-5 w-5 sm:h-6 sm:w-6",
  },
  {
    id: "tiktok",
    href: siteConfig.social.tiktok.href,
    icon: FaTiktok,
    label: "Tiktok Followers",
    value: "...",
    iconSize: "h-5 w-5 sm:h-6 sm:w-6",
  },
];
