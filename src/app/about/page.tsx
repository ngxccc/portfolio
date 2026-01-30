import type { Metadata } from "next";
import { ProfileSection } from "./_components/profile-section";
import { Achievements } from "./_components/achievements";
import { Interests } from "./_components/interests";
import { ScrollAnimation } from "@/shared/components/scroll-animation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about me, a full-stack developer with expertise in building web applications with React, Node.js, and modern web technologies.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-4xl px-4">
      {/* Tiêu đề chính */}
      <ScrollAnimation>
        <h2 className="gradient-text mb-8 text-4xl font-bold">About Me</h2>
      </ScrollAnimation>

      <ProfileSection />
      <Achievements />
      <Interests />
    </div>
  );
}
