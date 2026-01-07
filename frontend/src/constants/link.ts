import {
  Globe,
  Github,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Send,
  Music,
  Rss,
  Briefcase,
  ShoppingBag,
  Mail,
  Phone,
  X,
  type LucideIcon,
} from "lucide-react";
import { LINK_ICONS, LINK_TYPES } from "@mylinkspace/shared";

// Re-export types from shared
export type LinkIconType = (typeof LINK_ICONS)[number];
export type LinkType = (typeof LINK_TYPES)[number];

// Icon mapping for rendering
export const LINK_ICON_MAP: Record<LinkIconType, LucideIcon> = {
  Website: Globe,
  Github: Github,
  Instagram: Instagram,
  Telegram: Send,
  TikTok: Music,
  Facebook: Facebook,
  X: X,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Blog: Rss,
  Portfolio: Briefcase,
  Shop: ShoppingBag,
};

// Type icon mapping (optional, for UI)
export const LINK_TYPE_ICON_MAP: Record<LinkType, LucideIcon> = {
  Website: Globe,
  Email: Mail,
  Phone: Phone,
};
