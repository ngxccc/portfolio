import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

export const siteConfig = {
  name: "Trần Văn Ngọc",
  shortName: "Ngxc",
  title: "Full Stack Developer (Fresher/Intern)",
  description:
    "Sinh viên năm 2 tại TP.HCM với đam mê xây dựng Web Applications tối ưu. Mình đang đào sâu vào Next.js, Node.js và hệ sinh thái công nghệ hiện đại. Hiện đang tìm kiếm cơ hội Thực tập (Open for Internship).",
  ogImage: "/profile/logo.png",

  email: "ngocshintrann@gmail.com",
  phone: "+84857044507",
  address: "Quận 9, TP. Hồ Chí Minh, Việt Nam",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://ngxc.vercel.app",
  cvLink: "/files/cv-pdf/tran-van-ngoc-cv.pdf",
  statsUrl:
    "https://raw.githubusercontent.com/shin-client/my-portfolio-data/main/stats.json",
  githubApi: "https://api.github.com/users/ngxccc",

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
    "Sinh viên Cao đẳng",
    "Thực tập sinh IT",
    "Tìm việc thực tập IT",
    "Web Developer Intern",
    "Full Stack Developer Vietnam",
    "Lập trình viên Full Stack",
    "React Developer Vietnam",
    "Lập trình viên React",
    "Next.js Portfolio",
    "Web Development Tutorials",
    "Tech Blogger",
  ],
};
