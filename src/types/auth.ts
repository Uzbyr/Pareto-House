
import { User } from './user';
import { Application } from './application';
import { SiteMetrics } from './metrics';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPareto20Email: (email: string) => boolean;
  siteMetrics: SiteMetrics;
  refreshMetrics: () => void;
  getApplications: () => Application[];
  submitApplication: (application: Omit<Application, "id" | "submissionDate" | "status" | "name">) => void;
  trackPageVisit: (page: string) => void;
}
