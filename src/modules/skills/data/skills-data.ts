import {
  Code2,
  Layout,
  Server,
  Database,
  Lightbulb,
  Brain,
  Terminal,
  Wrench,
  Zap,
  Globe,
} from "lucide-react";
import {
  CppLogo,
  PythonLogo,
  JavaScriptLogo,
  HTML5Logo,
  CSSLogo,
  ReactLogo,
  TypeScriptLogo,
  NodeLogo,
  MySQLLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  ShadCNLogo,
  NextjsLogo,
  VercelLogo,
  CSharpLogo,
  ExpressLogo,
  ArchLinuxLogo,
  WindowLogo,
  GithubLogo,
} from "@/shared/components/tech-logos";
import { ElementType } from "react";

export interface SkillItem {
  name?: string;
  id?: string;
  icon: ElementType;
  iconClassName?: string;
}

export interface SkillCategory {
  id: string;
  icon: ElementType;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "languages",
    icon: Code2,
    items: [
      { name: "JavaScript", icon: JavaScriptLogo },
      { name: "TypeScript", icon: TypeScriptLogo },
      { name: "Python", icon: PythonLogo },
      { name: "C++", icon: CppLogo },
      { name: "C#", icon: CSharpLogo },
    ],
  },
  {
    id: "frontend",
    icon: Layout,
    items: [
      { name: "Next.js", icon: NextjsLogo },
      { name: "React.js", icon: ReactLogo },
      { name: "Tailwind", icon: TailwindLogo },
      { name: "ShadCN", icon: ShadCNLogo },
      { name: "HTML5", icon: HTML5Logo },
      { name: "CSS3", icon: CSSLogo },
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: NodeLogo },
      { name: "Express.js", icon: ExpressLogo },
    ],
  },
  {
    id: "database",
    icon: Database,
    items: [
      { name: "MySQL", icon: MySQLLogo },
      { name: "MongoDB", icon: MongoDBLogo },
    ],
  },
  {
    id: "tools",
    icon: Wrench,
    items: [
      { name: "Git", icon: GitLogo },
      { name: "GitHub", icon: GithubLogo },
      { name: "VS Code", icon: VSCodeLogo },
      { name: "Vercel", icon: VercelLogo },
      { name: "Compass", icon: MongoDBLogo },
    ],
  },
  {
    id: "os",
    icon: Terminal,
    items: [
      { name: "Linux", icon: ArchLinuxLogo },
      { name: "Windows", icon: WindowLogo },
    ],
  },
  {
    id: "soft_skills",
    icon: Brain,
    items: [
      { id: "adaptability", icon: Lightbulb, iconClassName: "h-5 w-5" },
      { id: "hardworking", icon: Zap, iconClassName: "h-5 w-5" },
      { id: "open_minded", icon: Globe, iconClassName: "h-5 w-5" },
    ],
  },
];
