import { Session } from "@supabase/supabase-js";

export interface AuthUser {
  email: string;
  role: UserRole;
}

export type UserRole = "admin" | "super_admin" | "fellow" | "alumni";

export interface Application {
  id: string;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  flagged?: boolean;
  country?: string;
  nationality?: string;
  graduationYear?: string;
  preparatoryClasses?: string;
  studentSocieties?: string;
  buildingCompany?: string;
  companyContext?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  resumeFile?: string;
  deckFile?: string;
  memoFile?: string;
  videoUrl?: string;
  educationLevel?: string;
  highSchool?: string;
  githubUrl?: string;
  categoryOfInterest?: string;
  hasCompetitionExperience?: string;
  competitionResults?: string;
  competitiveProfiles?: string[];
}

export interface VisitorData {
  total: number;
  byDate: Record<string, number>;
}

export interface PageView {
  path: string;
  count: number;
}

export interface SiteMetrics {
  totalVisitors: number;
  visitorsByDate: [string, number][];
  applicationsCount: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  topPages: PageView[];
  conversionRate: number;
  
  // These properties are used in the analytics pages
  visitors: {
    total: number;
    byDate: Array<{
      date: string;
      visitors: number;
      pageViews: number;
    }>;
  };
  applications: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    completionRate: number;
    byDay: Array<{
      name: string;
      applications: number;
    }>;
  };
  conversionFunnel: {
    stages: Array<{
      name: string;
      value: number;
    }>;
    dropoffRates: Array<{
      x: number;
      y: number;
      z: number;
      name: string;
    }>;
    timeSpent: Array<{
      name: string;
      timeSpent: number;
    }>;
  };
  trafficSources: Array<{
    name: string;
    value: number;
  }>;
  pagePopularity: Array<{
    name: string;
    views: number;
  }>;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: Session | null;
  requirePasswordChange: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<boolean>;
  isPareto20Email: (email: string) => boolean;
  siteMetrics: SiteMetrics;
  refreshMetrics: () => void;
  getApplications: () => Application[];
  submitApplication: (applicationData: Omit<Application, "id" | "submissionDate" | "status">) => void;
  trackPageVisit: (pageName: string) => void;
}
