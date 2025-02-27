
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { Application } from "../types/application";
import { SiteMetrics } from "../types/metrics";
import { AuthContextType } from "../types/auth";
import { 
  getStoredApplications, 
  storeApplications, 
  getStoredPageViews, 
  storePageViews, 
  getStoredVisitorData, 
  storeVisitorData 
} from "../utils/localStorage";
import { createSampleApplicationsIfNeeded } from "../utils/sampleData";
import { collectRealMetrics } from "../utils/metricsCollector";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Check localStorage for existing auth state on initial load
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Initialize applications state
  const [applications, setApplications] = useState<Application[]>(() => {
    // Create sample applications if needed
    createSampleApplicationsIfNeeded();
    return getStoredApplications();
  });
  
  // Store visitor session ID to avoid counting revisits
  const [sessionId] = useState<string>(() => {
    let id = sessionStorage.getItem('visitorSessionId');
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('visitorSessionId', id);
      
      // Track a new visitor
      const visitorData = getStoredVisitorData();
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      visitorData.total += 1;
      visitorData.byDate[today] = (visitorData.byDate[today] || 0) + 1;
      
      storeVisitorData(visitorData);
    }
    return id;
  });

  // Initialize page views
  const [pageViews, setPageViews] = useState<Record<string, number>>(getStoredPageViews());

  // Initialize site metrics
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics>(collectRealMetrics());

  // Track page visit function
  const trackPageVisit = (pageName: string) => {
    setPageViews(prevViews => {
      const newViews = { 
        ...prevViews,
        [pageName]: (prevViews[pageName] || 0) + 1 
      };
      storePageViews(newViews);
      return newViews;
    });
  };

  // Submit application function
  const submitApplication = (applicationData: Omit<Application, "id" | "submissionDate" | "status">) => {
    // Combine firstName and lastName to create the name field if it doesn't exist
    const fullName = applicationData.name || 
      (applicationData.firstName && applicationData.lastName 
        ? `${applicationData.firstName} ${applicationData.lastName}`
        : "Anonymous Applicant");

    const newApplication: Application = {
      ...applicationData,
      name: fullName,
      id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
      submissionDate: new Date().toISOString(),
      status: "pending"
    };
    
    setApplications(prevApps => {
      const updatedApps = [...prevApps, newApplication];
      storeApplications(updatedApps);
      console.log("Application submitted successfully:", newApplication);
      console.log("Total applications:", updatedApps.length);
      return updatedApps;
    });
  };

  // Refresh metrics function
  const refreshMetrics = () => {
    setSiteMetrics(collectRealMetrics());
  };

  // Get applications data
  const getApplications = (): Application[] => {
    return applications;
  };

  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  // Update metrics when relevant data changes
  useEffect(() => {
    refreshMetrics();
  }, [applications, pageViews]);

  // Refresh metrics periodically when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshMetrics();
      }, 30000); // 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Generate initial data if needed when the app starts
  useEffect(() => {
    createSampleApplicationsIfNeeded();
  }, []);

  const isPareto20Email = (email: string) => {
    return email.endsWith('@pareto20.com');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // For this demo, we'll just check if the email domain is @pareto20.com
    // In a real app, you would validate credentials against a backend
    
    if (!isPareto20Email(email)) {
      return false;
    }

    // Mock admin accounts for demo purposes
    const adminAccounts = [
      { email: 'admin@pareto20.com', role: 'admin' as const, password: 'admin123' },
      { email: 'superadmin@pareto20.com', role: 'super_admin' as const, password: 'super123' },
      { email: 'analyst@pareto20.com', role: 'analyst' as const, password: 'analyst123' },
      { email: 'jules@pareto20.com', role: 'admin' as const, password: 'Kiara00!' }
    ];

    const matchedUser = adminAccounts.find(account => 
      account.email === email && account.password === password
    );

    if (matchedUser) {
      setIsAuthenticated(true);
      setUser({ email: matchedUser.email, role: matchedUser.role });
      refreshMetrics(); // Refresh metrics on login
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        isPareto20Email, 
        siteMetrics, 
        refreshMetrics,
        getApplications,
        submitApplication,
        trackPageVisit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
