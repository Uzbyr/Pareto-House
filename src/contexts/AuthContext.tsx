
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  role: "admin" | "super_admin" | "analyst";
}

// Site metrics interface
interface SiteMetrics {
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

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPareto20Email: (email: string) => boolean;
  siteMetrics: SiteMetrics;
  refreshMetrics: () => void;
  getApplications: () => any[];
}

// Real site metrics collector
const collectRealMetrics = (): SiteMetrics => {
  // In a real app, this would fetch from analytics APIs or backend
  // For this demo, we'll generate somewhat realistic data based on the current date
  
  const today = new Date();
  const visitorsData = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (13 - i));
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Generate somewhat random but trending upward data
    const baseVisitors = 100 + Math.floor(i * 15);
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8-1.2 random factor
    const visitors = Math.floor(baseVisitors * randomFactor);
    
    return {
      date: dateStr, 
      visitors, 
      pageViews: Math.floor(visitors * (1.8 + Math.random() * 0.4)) // 1.8-2.2x pageviews per visitor
    };
  });

  // Get the localStorage stored application count if any
  const storedAppCount = localStorage.getItem('applicationCount');
  const applicationCount = storedAppCount ? parseInt(storedAppCount) : 0;
  
  // Calculate applications stats
  const totalApplications = applicationCount + 156; // Base of 156 + any submitted via the form
  const approvedCount = Math.floor(totalApplications * 0.27); // ~27% approved
  const pendingCount = Math.floor(totalApplications * 0.57); // ~57% pending
  const rejectedCount = totalApplications - approvedCount - pendingCount; // Remainder rejected
  
  return {
    visitors: {
      total: visitorsData.reduce((sum, day) => sum + day.visitors, 0),
      byDate: visitorsData
    },
    applications: {
      total: totalApplications,
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      completionRate: 68,
      byDay: [
        { name: "Sun", applications: 4 + Math.floor(Math.random() * 3) },
        { name: "Mon", applications: 7 + Math.floor(Math.random() * 4) },
        { name: "Tue", applications: 8 + Math.floor(Math.random() * 4) },
        { name: "Wed", applications: 12 + Math.floor(Math.random() * 5) },
        { name: "Thu", applications: 10 + Math.floor(Math.random() * 4) },
        { name: "Fri", applications: 15 + Math.floor(Math.random() * 5) },
        { name: "Sat", applications: 6 + Math.floor(Math.random() * 3) },
      ]
    },
    conversionFunnel: {
      stages: [
        { name: "Landing Page View", value: totalApplications * 12 }, // Assume ~8% conversion from landing to submit
        { name: "Form Started", value: Math.floor(totalApplications * 12 * 0.32) },
        { name: "Personal Info Completed", value: Math.floor(totalApplications * 12 * 0.24) },
        { name: "Education Info Completed", value: Math.floor(totalApplications * 12 * 0.18) },
        { name: "Resume Uploaded", value: Math.floor(totalApplications * 12 * 0.13) },
        { name: "Video Uploaded", value: Math.floor(totalApplications * 12 * 0.095) },
        { name: "Form Submitted", value: totalApplications },
      ],
      dropoffRates: [
        { x: 2.5, y: 35, z: 500, name: "Personal Info" },
        { x: 5.2, y: 28, z: 400, name: "Education" },
        { x: 8.7, y: 15, z: 300, name: "Resume Upload" },
        { x: 12.1, y: 12, z: 150, name: "Video Upload" },
      ],
      timeSpent: [
        { name: "Personal Info", timeSpent: 2.5 },
        { name: "Education", timeSpent: 3.2 },
        { name: "Resume Upload", timeSpent: 5.1 },
        { name: "Video Upload", timeSpent: 8.4 },
      ]
    },
    trafficSources: [
      { name: "Direct", value: 42 },
      { name: "Social", value: 28 },
      { name: "Search", value: 20 },
      { name: "Referral", value: 10 },
    ],
    pagePopularity: [
      { name: "Homepage", views: 2400 },
      { name: "Apply", views: 1800 },
      { name: "Mentors", views: 1200 },
      { name: "Perks", views: 800 },
      { name: "FAQ", views: 600 },
    ]
  };
};

// Application data generator
const generateApplications = () => {
  // Get the localStorage stored application data if any
  const storedApps = localStorage.getItem('applications');
  const previousApps = storedApps ? JSON.parse(storedApps) : [];
  
  // Combine with mock data
  const baseApplications = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Applicant ${i + 1}`,
    email: `applicant${i + 1}@example.com`,
    school: ["Harvard", "MIT", "Stanford", "Berkeley", "Oxford"][Math.floor(Math.random() * 5)],
    submissionDate: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)],
  }));
  
  return [...previousApps, ...baseApplications];
};

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

  // Initialize site metrics
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics>(collectRealMetrics());

  // Refresh metrics function
  const refreshMetrics = () => {
    setSiteMetrics(collectRealMetrics());
  };

  // Get applications data
  const getApplications = () => {
    return generateApplications();
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

  // Refresh metrics every 30 seconds when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshMetrics();
      }, 30000); // 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

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
        getApplications
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
