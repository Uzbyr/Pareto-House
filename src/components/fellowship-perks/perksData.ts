import {
  UserRoundCog,
  Users,
  PiggyBank,
  Cloud,
  TrendingUp,
} from "lucide-react";
import { ReactNode } from "react";

export interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

// We'll create icon factory functions instead of direct JSX
export const createUserRoundCogIcon = (): ReactNode => null; // Placeholder
export const createUsersIcon = (): ReactNode => null; // Placeholder
export const createPiggyBankIcon = (): ReactNode => null; // Placeholder
export const createCloudIcon = (): ReactNode => null; // Placeholder
export const createTrendingUpIcon = (): ReactNode => null; // Placeholder

// Define the perks data without JSX
export const perksData = [
  {
    iconType: "UserRoundCog",
    title: "World-Class Mentors",
    description:
      "Connect with top founders, operators, investors, researchers, public figures who've built successful companies",
  },
  {
    iconType: "Users",
    title: "Elite Peer Network",
    description:
      "The world's most elite group of young generational talents in Mathematics, Physics, and Computer Science.",
  },
  {
    iconType: "PiggyBank",
    title: "Initial Capital",
    description:
      "Up to $100k as initial funding the day a fellow starts a company",
  },
  {
    iconType: "Cloud",
    title: "Startup Resources",
    description:
      "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more",
  },
  {
    iconType: "TrendingUp",
    title: "Fast Track to Opportunities",
    description:
      "Access to internships at the most competitive startups in Silicon Valley and connections with people who can transform your career trajectory",
  },
];
