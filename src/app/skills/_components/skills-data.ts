import {
  Code2,
  Layout,
  Server,
  Database,
  MessageSquare,
  Lightbulb,
  Users,
  Brain,
  Cloud,
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
  VirtualBoxLogo,
  VercelLogo,
  CSharpLogo,
  ExpressLogo,
  ArchLinuxLogo,
  WindowLogo,
} from "@/components/tech-logos";
import { ElementType } from "react";

export interface SkillItem {
  name: string;
  icon: ElementType;
  iconClassName?: string;
}

export interface SkillCategory {
  category: string;
  icon: ElementType;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
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
    category: "Front-End Development",
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
    category: "Back-End Development",
    icon: Server,
    items: [
      { name: "Node.js", icon: NodeLogo },
      { name: "Express.js", icon: ExpressLogo },
    ],
  },
  {
    category: "Databases & Cloud Storage",
    icon: Database,
    items: [
      { name: "MySQL", icon: MySQLLogo },
      { name: "MongoDB", icon: MongoDBLogo },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    items: [
      { name: "Git", icon: GitLogo },
      { name: "GitHub", icon: GitLogo },
      { name: "VS Code", icon: VSCodeLogo },
      { name: "Vercel", icon: VercelLogo },
      { name: "Compass", icon: MongoDBLogo },
      { name: "CI/CD", icon: Code2 },
    ],
  },
  {
    category: "Operating Systems",
    icon: Terminal,
    items: [
      { name: "Linux", icon: ArchLinuxLogo },
      { name: "Windows", icon: WindowLogo },
    ],
  },
  {
    category: "Soft Skills",
    icon: Brain,
    items: [
      { name: "Adaptability", icon: Lightbulb, iconClassName: "h-5 w-5" },
      { name: "Hardworking", icon: Zap, iconClassName: "h-5 w-5" },
      { name: "Open-minded", icon: Globe, iconClassName: "h-5 w-5" },
    ],
  },
];
