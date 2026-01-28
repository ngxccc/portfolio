import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

export const siteConfig = {
  name: "Tran Van Ngoc",
  shortName: "Ngxc",
  title: "Software Developer",
  description:
    "Software Developer specializing in Full Stack Development with expertise in Next.js, Node.js and modern Web Technologies.",
  ogImage: "/profile/logo.png",

  email: "ngocshintrann@gmail.com",
  phone: "+84857044507",
  address: "District 9, Ho Chi Minh City, Vietnam",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://ngxc.vercel.app",

  social: {
    github: {
      label: "GitHub",
      href: "https://github.com/ngxccc",
      icon: FaGithub,
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ngxc",
      icon: FaLinkedin,
    },
    instagram: {
      label: "Instagram",
      href: "https://instagram.com/n.gxc_",
      icon: FaInstagram,
    },
    tiktok: {
      label: "TikTok",
      href: "https://tiktok.com/@ngxc.dev",
      icon: FaTiktok,
    },
    mail: {
      label: "Email",
      href: "mailto:ngocshintrann@gmail.com",
      icon: LuMail,
    },
  },

  keywords: [
    "Trần Văn Ngọc",
    "Tran Van Ngoc",
    "Ngxc",
    "Full Stack Developer Vietnam",
    "Lập trình viên Full Stack",
    "React Developer Vietnam",
    "Lập trình viên React",
    "Next.js Portfolio",
    "Web Development Tutorials",
  ],
};
