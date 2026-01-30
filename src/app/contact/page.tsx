import { ContactContent } from "@/modules/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me, a Software Developer specializing in full-stack development.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4 sm:my-2">
      <ContactContent />
    </div>
  );
}
