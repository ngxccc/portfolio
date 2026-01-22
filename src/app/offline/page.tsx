import type { Metadata } from "next";
import { OfflineContent } from "./_components/offline-content";

export const metadata: Metadata = {
  title: "You are Offline",
  description:
    "It seems you have lost your internet connection. Please check your network status.",
};

export default function OfflinePage() {
  return <OfflineContent />;
}
