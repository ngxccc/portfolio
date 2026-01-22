export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  image: string;
  certificateUrl: string;
  description: string[];
}

export const experiences: ExperienceItem[] = [
  // {
  //   title: "Software Engineering Intern",
  //   company: "Code Alpha",
  //   location: "Remote",
  //   period: "Jun 2024 - Aug 2024",
  //   type: "Internship",
  //   image: "/experience/codeAlpha_page.jpg",
  //   certificateUrl: "/files/experience_pdf/codeAlpha.pdf",
  //   description: [
  //     "Optimized web application performance with JavaScript and React.js, achieving a 98% error-free rate",
  //     "Implemented advanced features on a React.js platform, resulting in a 40% surge in user interaction",
  //   ],
  // },
];
