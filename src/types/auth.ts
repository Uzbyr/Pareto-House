
import { Session } from "@supabase/supabase-js";

export interface AuthUser {
  email: string;
  role: "admin" | "super_admin" | "analyst" | "fellow" | "alumni";
}

export interface Application {
  id: string;
  name: string;
  email: string;
  school: string;
  major?: string;
  resumeUrl?: string;
  videoUrl?: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  flagged?: boolean;
  // New fields from Supabase schema
  country?: string;
  nationality?: string;
  graduationYear?: string;
  preparatoryClasses?: string;
  studentSocieties?: string;
  buildingCompany?: string;
  companyContext?: string;
  websiteUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  educationLevel?: string;
  highSchool?: string;
  githubUrl?: string;
  categoryOfInterest?: string;
  hasCompetitionExperience?: string;
  competitionResults?: string; // Changed from string[] to string
  competitiveProfiles?: string[];
  resumeFile?: string;
  deckFile?: string;
  memoFile?: string;
}

export interface SiteMetrics {
  visitors: {
    total: number;
    byDate: { date: string; visitors: number; pageViews: number }[];
  };
  applications: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    completionRate: number;
    byDay: { name: string; applications: number }[];
  };
  conversionFunnel: {
    stages: { name: string; value: number }[];
    dropoffRates: { x: number; y: number; z: number; name: string }[];
    timeSpent: { name: string; timeSpent: number }[];
  };
  trafficSources: { name: string; value: number }[];
  pagePopularity: { name: string; views: number }[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPareto20Email: (email: string) => boolean;
  siteMetrics: SiteMetrics;
  refreshMetrics: () => void;
  getApplications: () => Application[];
  submitApplication: (
    application: Omit<Application, "id" | "submissionDate" | "status">,
  ) => void;
  trackPageVisit: (page: string) => void;
}
