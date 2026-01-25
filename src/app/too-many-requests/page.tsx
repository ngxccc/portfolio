import type { Metadata } from "next";
import { TooManyRequestsContent } from "./_components/too-many-requests-content";

export const metadata: Metadata = {
  title: "Too Many Requests",
  description: "Security check: Rate limit exceeded.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TooManyRequestsPage() {
  return <TooManyRequestsContent />;
}
