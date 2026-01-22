import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    link: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    link: `tel:${siteConfig.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.address,
  },
  {
    icon: Clock,
    label: "Time Zone",
    value: "ICT (UTC+7)",
  },
];

export const socialLinks = [
  siteConfig.social.github,
  siteConfig.social.linkedin,
  siteConfig.social.instagram,
  siteConfig.social.tiktok,
  siteConfig.social.mail,
];
