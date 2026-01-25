import { WifiOff, Home, LucideIcon } from "lucide-react";

export interface OfflineData {
  icon: LucideIcon;
  title: string;
  message: string;
  buttonText: string;
  buttonIcon: LucideIcon;
  buttonLink: string;
}

export const offlineData: OfflineData = {
  icon: WifiOff,
  title: "No Internet Connection",
  message: "Please check your internet connection and try again",
  buttonText: "Try Again",
  buttonIcon: Home,
  buttonLink: "/",
};
