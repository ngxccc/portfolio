import { Award } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";
import type { Metadata } from "next";
import { CertificateList } from "./_components/certificate-list";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "View my certifications and achievements in web development, programming, and other technical skills.",
};

export default function CertificatesPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <div className="mb-12">
        <ScrollAnimation>
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-cyan-400" />
            <h2 className="gradient-text text-4xl font-bold">Certificates</h2>
          </div>
        </ScrollAnimation>
      </div>

      <CertificateList />
    </div>
  );
}
