import { OfflineContent } from "@/modules/offline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are Offline",
  description:
    "It seems you have lost your internet connection. Please check your network status.",
};

export default function OfflinePage() {
  return <OfflineContent />;
}
