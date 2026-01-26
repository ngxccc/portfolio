export interface NavItem {
  title: string;
  path: string;
  description: string;
  keywords: string[];
  type: string;
}

export const navigationConfig: NavItem[] = [
  {
    title: "Home",
    path: "/",
    description: "Go to the welcome page",
    keywords: ["home", "start", "welcome"],
    type: "page",
  },
  {
    title: "Blog",
    path: "/blog",
    description: "Read my latest technical articles and tutorials",
    keywords: ["blog", "posts", "articles", "tutorials"],
    type: "page",
  },
  {
    title: "About",
    path: "/about",
    description: "Learn more about my background and journey",
    keywords: ["about", "bio", "profile", "story"],
    type: "page",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "View my portfolio and open-source work",
    keywords: ["projects", "works", "portfolio", "apps"],
    type: "page",
  },
  {
    title: "Education",
    description: "View my educational background",
    path: "/education",
    keywords: ["education"],
    type: "page",
  },
  {
    title: "Experience",
    description: "Check out my professional experience",
    path: "/experience",
    keywords: ["experience"],
    type: "page",
  },
  {
    title: "Skills",
    description: "Explore my technical skills and expertise",
    path: "/skills",
    keywords: ["skills"],
    type: "page",
  },
  {
    title: "Certificates",
    description: "View my certifications and achievements",
    path: "/certificates",
    keywords: ["certificates"],
    type: "page",
  },
  {
    title: "Contact",
    description: "Get in touch with me",
    path: "/contact",
    keywords: ["contact"],
    type: "page",
  },
];
