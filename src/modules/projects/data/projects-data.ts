import { siteConfig } from "@/shared/config/site";

export interface ProjectItem {
  id: string;
  image: string;
  github: string;
  live?: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "portfolio",
    image: "/projects-img/portfolio.png",
    github: `${siteConfig.social.github.href}/portfolio`,
    live: siteConfig.url,
    tags: ["Next.js 16", "TypeScript", "Tailwind", "Framer Motion", "MDX"],
  },
  {
    id: "x_clone",
    image: "/projects-img/project-1.png",
    github: `${siteConfig.social.github.href}/x-clone`,
    live: "",
    tags: ["Express.js", "TypeScript", "MongoDB", "JWT", "REST API"],
  },
];
