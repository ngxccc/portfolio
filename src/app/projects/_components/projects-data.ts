import { siteConfig } from "@/config/site";

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    title: "X Clone",
    description:
      "A Twitter/X clone backend API built with Node.js, Express, TypeScript, and MongoDB.",
    image: "/projects-img/project-1.png",
    github: `${siteConfig.social.github.href}/x-clone`,
    live: "",
    tags: ["Express.js", "TypeScript", "MongoDB", "JWT", "REST API"],
  },
];
