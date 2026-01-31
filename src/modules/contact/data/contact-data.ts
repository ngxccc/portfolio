import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/shared/config/site";

export const contactInfo = [
  {
    id: "email",
    icon: Mail,
    value: siteConfig.email,
    link: `mailto:${siteConfig.email}`,
  },
  {
    id: "phone",
    icon: Phone,
    value: siteConfig.phone,
    link: `tel:${siteConfig.phone}`,
  },
  {
    id: "location",
    icon: MapPin,
    value: siteConfig.address,
  },
  {
    id: "timezone",
    icon: Clock,
    value: "timezone_value",
  },
];

export const socialLinks = [
  siteConfig.social.github,
  siteConfig.social.linkedin,
  siteConfig.social.instagram,
  siteConfig.social.tiktok,
  siteConfig.social.mail,
];
