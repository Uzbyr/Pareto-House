
import { AuthContextType, SiteMetrics, Application, UserRole } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

// Export relevant types for use in our auth-related files
export type {
  AuthContextType,
  SiteMetrics,
  Application,
  UserRole
};

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthContextType['user'];
  session: Session | null;
  requirePasswordChange: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<boolean>;
  isPareto20Email: (email: string) => boolean;
}

// Add this new interface for internal setter functions
export interface AuthStateSetters {
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: AuthContextType['user']) => void;
  setSession: (session: Session | null) => void;
  setRequirePasswordChange: (value: boolean) => void;
}

export interface MetricsState {
  siteMetrics: SiteMetrics;
}

export interface MetricsActions {
  refreshMetrics: () => void;
  getApplications: () => Application[];
  submitApplication: (applicationData: Omit<Application, "id" | "submissionDate" | "status">) => void;
  trackPageVisit: (pageName: string) => void;
}
