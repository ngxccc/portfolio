import { WifiOff, Home, LucideIcon } from "lucide-react";

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
