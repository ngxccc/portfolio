import type { LucideIcon } from "lucide-react";
import { WifiOff, Home } from "lucide-react";

export interface OfflineConfig {
  icon: LucideIcon;
  buttonIcon: LucideIcon;
  buttonLink: string;
}

export const offlineData: OfflineConfig = {
  icon: WifiOff,
  buttonIcon: Home,
  buttonLink: "/",
};
