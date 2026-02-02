import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Briefcase,
  Cloud,
  Code,
  Code2,
  Container,
  GitFork,
  GraduationCap,
  Palette,
} from "lucide-react";

export interface AchievementItem {
  id: string;
  icon: LucideIcon;
}

export type InterestItem = AchievementItem;

export const achievements: AchievementItem[] = [
  {
    id: "projects",
    icon: Code2,
  },
  {
    id: "experience",
    icon: Briefcase,
  },
  {
    id: "academic",
    icon: GraduationCap,
  },
];

// Thay vì mảng string, giờ là mảng object có Icon xịn
export const interests: InterestItem[] = [
  { id: "web", icon: Code },
  { id: "uiux", icon: Palette },
  { id: "cloud", icon: Cloud },
  { id: "devops", icon: Container },
  { id: "opensource", icon: GitFork },
  { id: "ai", icon: BrainCircuit },
];
