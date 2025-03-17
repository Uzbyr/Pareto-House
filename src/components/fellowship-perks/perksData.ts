
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

export const perks: Perk[] = [
  {
    icon: <UserRoundCog className="w-12 h-12 text-pareto-pink" />,
    title: "World-Class Mentors",
    description:
      "Connect with top founders, operators, investors, researchers, public figures who've built successful companies",
  },
  {
    icon: <Users className="w-12 h-12 text-pareto-pink" />,
    title: "Elite Peer Network",
    description:
      "The world's most elite group of young generational talents in Mathematics, Physics, and Computer Science.",
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-pareto-pink" />,
    title: "Initial Capital",
    description:
      "Up to $100k as initial funding the day a fellow starts a company",
  },
  {
    icon: <Cloud className="w-12 h-12 text-pareto-pink" />,
    title: "Startup Resources",
    description:
      "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-pareto-pink" />,
    title: "Fast Track to Opportunities",
    description:
      "Access to internships at the most competitive startups in Silicon Valley and connections with people who can transform your career trajectory",
  },
];
