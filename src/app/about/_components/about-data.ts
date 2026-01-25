import { Briefcase, Code2, GraduationCap, LucideIcon } from "lucide-react";

export interface AchievementItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const achievements: AchievementItem[] = [
  {
    icon: Code2,
    title: "1 Projects",
    description: "Completed full-stack web applications",
  },
  {
    icon: Briefcase,
    title: "0 Internships",
    description: "Professional work experience",
  },
  {
    icon: GraduationCap,
    title: "8.2/10",
    description: "Academic excellence",
  },
];

export const interests = [
  "Web Development",
  "UI/UX Design",
  "Cloud Computing",
  "DevOps",
  "Open Source",
  "Artificial Intelligence",
];
