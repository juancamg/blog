import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { Bot, TrafficCone } from 'lucide-react';

export const NAV_LIST = [
  {
    label: 'Whoami',
    path: 'https://portfolio-juancamgs-projects.vercel.app/',
    icon: Bot,
  },
  {
    label: 'Shards',
    path: 'https://xhetic-shards.vercel.app/',
    icon: TrafficCone,
  },
];

export const SOCIALS = [
  { label: 'Github', path: siteConfig.social.github, icon: Icons.github },
];
