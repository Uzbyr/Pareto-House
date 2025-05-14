
import { ReactNode } from "react";

export interface Perk {
  title: string;
  description: string;
}

// Define the perks data without icons
export const perksData = [
  {
    title: "World Class Mentors",
    description:
      "Connect with top founders, operators, investors, researchers, public figures who've built successful companies",
  },
  {
    title: "Elite Peer Network",
    description:
      "The world's most elite group of young generational talents in Mathematics, Physics, and Computer Science.",
  },
  {
    title: "Startup Resources",
    description:
      "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more",
  },
  {
    title: "Opportunity Accelerator",
    description:
      "Access to internships at the most competitive startups in Silicon Valley and connections with people who can transform your career trajectory",
  },
];
