"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { siteConfig } from "@/shared/config/site";
import Image from "next/image";

export const ProfileSection = () => {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <ScrollAnimation>
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-white/10 bg-white/5">
          <Image
            src="/profile/profile.jpg"
            alt="Profile"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
            priority
          />
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="space-y-4 text-lg text-gray-300">
          <p>
            Hi, I&apos;m{" "}
            <span className="text-cyan-400">{siteConfig.name}</span>. I am a
            passionate Software Developer based in Vietnam, currently pursuing
            Software Engineering at{" "}
            <span className="font-semibold text-white">
              Cao Thang Technical College
            </span>
            .
          </p>
          <p>
            I specialize in Full Stack Development, focusing on the{" "}
            <span className="text-cyan-400">Next.js Ecosystem</span> (React,
            Node.js, TypeScript). I love building scalable web applications and
            solving complex system problems.
          </p>
          <p>
            When I&apos;m not coding, you can find me tweaking my{" "}
            <span className="text-cyan-400">Arch Linux</span> config, exploring
            AI technologies, or contributing to the open-source community.
          </p>
        </div>
      </ScrollAnimation>
    </div>
  );
};
