import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Bot, Rss } from "lucide-react";

export const NAV_LIST = [
  { label: "About", path: "https://portfolio-juancamgs-projects.vercel.app/", icon: Bot },
];

export const SOCIALS = [
  { label: "Github", path: siteConfig.social.github, icon: Icons.github },
];
