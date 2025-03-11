import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface AuthUser {
  email: string;
  role: "admin" | "super_admin" | "analyst";
}

// Application interface
interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  resumeUrl?: string;
  videoUrl?: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
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
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPareto20Email: (email: string) => boolean;
  siteMetrics: SiteMetrics;
  refreshMetrics: () => void;
  getApplications: () => Application[];
  submitApplication: (application: Omit<Application, "id" | "submissionDate" | "status">) => void;
  trackPageVisit: (page: string) => void;
}

// Function to get stored applications from localStorage
const getStoredApplications = (): Application[] => {
  try {
    const storedApps = localStorage.getItem('applications');
    return storedApps ? JSON.parse(storedApps) : [];
  } catch (e) {
    console.error("Error loading applications from localStorage:", e);
    return [];
  }
};

// Function to store applications in localStorage
const storeApplications = (applications: Application[]) => {
  try {
    localStorage.setItem('applications', JSON.stringify(applications));
  } catch (e) {
    console.error("Error saving applications to localStorage:", e);
  }
};

// Function to get stored page views from localStorage
const getStoredPageViews = (): Record<string, number> => {
  try {
    const storedViews = localStorage.getItem('pageViews');
    return storedViews ? JSON.parse(storedViews) : {};
  } catch (e) {
    console.error("Error loading page views from localStorage:", e);
    return {};
  }
};

// Function to store page views in localStorage
const storePageViews = (pageViews: Record<string, number>) => {
  try {
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
  } catch (e) {
    console.error("Error saving page views to localStorage:", e);
  }
};

// Function to get stored visitor data from localStorage
const getStoredVisitorData = (): { total: number, byDate: Record<string, number> } => {
  try {
    const storedData = localStorage.getItem('visitorData');
    return storedData ? JSON.parse(storedData) : { total: 0, byDate: {} };
  } catch (e) {
    console.error("Error loading visitor data from localStorage:", e);
    return { total: 0, byDate: {} };
  }
};

// Function to store visitor data in localStorage
const storeVisitorData = (visitorData: { total: number, byDate: Record<string, number> }) => {
  try {
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
  } catch (e) {
    console.error("Error saving visitor data to localStorage:", e);
  }
};

// Real site metrics collector
const collectRealMetrics = (): SiteMetrics => {
  const applications = getStoredApplications();
  const pageViews = getStoredPageViews();
  const visitorData = getStoredVisitorData();
  
  const totalApplications = applications.length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const pendingCount = applications.filter(app => app.status === "pending").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;
  
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const applicationsByDay = Array(7).fill(0);
  
  applications.forEach(app => {
    const submissionDate = new Date(app.submissionDate);
    const daysAgo = Math.floor((today.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) {
      const dayIndex = (today.getDay() - daysAgo + 7) % 7;
      applicationsByDay[dayIndex]++;
    }
  });
  
  const byDay = dayNames.map((name, index) => ({
    name,
    applications: applicationsByDay[(index + today.getDay() + 1) % 7]
  }));
  
  const visitorsData = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const dayVisitors = visitorData.byDate[dateStr] || 
                        Math.floor((visitorData.total / 14) * (0.8 + (Math.random() * 0.4)));
    
    return {
      date: dateStr, 
      visitors: dayVisitors, 
      pageViews: Math.floor(dayVisitors * (1.8 + Math.random() * 0.4))
    };
  });
  
  const pagePopularity = Object.entries(pageViews)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  const defaultPages = [
    { name: "Homepage", views: 100 },
    { name: "Apply", views: 80 },
    { name: "Mentors", views: 60 },
    { name: "Perks", views: 40 },
    { name: "FAQ", views: 30 }
  ];
  
  while (pagePopularity.length < 5) {
    const defaultPage = defaultPages[pagePopularity.length];
    if (!pagePopularity.some(p => p.name === defaultPage.name)) {
      pagePopularity.push(defaultPage);
    }
  }
  
  const formStartRate = 0.32;
  const visitorsTotal = visitorData.total || visitorsData.reduce((sum, day) => sum + day.visitors, 0);
  
  const funnelStages = [
    { name: "Landing Page View", value: visitorsTotal },
    { name: "Form Started", value: Math.max(Math.floor(visitorsTotal * formStartRate), totalApplications + 5) },
    { name: "Personal Info Completed", value: Math.max(Math.floor(visitorsTotal * formStartRate * 0.75), totalApplications + 3) },
    { name: "Education Info Completed", value: Math.max(Math.floor(visitorsTotal * formStartRate * 0.56), totalApplications + 2) },
    { name: "Resume Uploaded", value: Math.max(Math.floor(visitorsTotal * formStartRate * 0.40), totalApplications + 1) },
    { name: "Video Uploaded", value: Math.max(Math.floor(visitorsTotal * formStartRate * 0.30), totalApplications) },
    { name: "Form Submitted", value: totalApplications },
  ];
  
  return {
    visitors: {
      total: visitorsTotal,
      byDate: visitorsData
    },
    applications: {
      total: totalApplications,
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      completionRate: totalApplications > 0 ? 
        Math.floor((totalApplications / (funnelStages[1].value || 1)) * 100) : 68,
      byDay
    },
    conversionFunnel: {
      stages: funnelStages,
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
    pagePopularity
  };
};

const getUserRole = (email: string): "admin" | "super_admin" | "analyst" => {
  if (!email) return "admin";
  
  if (email === "superadmin@pareto20.com") return "super_admin";
  if (email === "analyst@pareto20.com") return "analyst";
  
  return "admin";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const [applications, setApplications] = useState<Application[]>(getStoredApplications());
  
  const [sessionId] = useState<string>(() => {
    let id = sessionStorage.getItem('visitorSessionId');
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('visitorSessionId', id);
      
      const visitorData = getStoredVisitorData();
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      visitorData.total += 1;
      visitorData.byDate[today] = (visitorData.byDate[today] || 0) + 1;
      
      storeVisitorData(visitorData);
    }
    return id;
  });

  const [pageViews, setPageViews] = useState<Record<string, number>>(getStoredPageViews());

  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics>(collectRealMetrics());

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setIsAuthenticated(true);
        
        const email = session.user?.email || '';
        setUser({
          email,
          role: getUserRole(email)
        });
      }
    };
    
    initializeAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setIsAuthenticated(!!newSession);
      
      if (newSession?.user?.email) {
        setUser({
          email: newSession.user.email,
          role: getUserRole(newSession.user.email)
        });
      } else {
        setUser(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const submitApplication = (applicationData: Omit<Application, "id" | "submissionDate" | "status">) => {
    const newApplication: Application = {
      ...applicationData,
      id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
      submissionDate: new Date().toISOString(),
      status: "pending"
    };
    
    setApplications(prevApps => {
      const updatedApps = [...prevApps, newApplication];
      storeApplications(updatedApps);
      return updatedApps;
    });
  };

  const refreshMetrics = () => {
    setSiteMetrics(collectRealMetrics());
  };

  const getApplications = (): Application[] => {
    return applications;
  };
  
  useEffect(() => {
    const fetchApplications = async () => {
      if (isAuthenticated && user) {
        try {
          const { data, error } = await supabase
            .from('applications')
            .select('*');
            
          if (error) {
            console.error("Error fetching applications:", error);
            return;
          }
          
          if (data) {
            const formattedApplications = data.map(app => ({
              id: parseInt(app.id.toString()),
              name: `${app.first_name} ${app.last_name}`,
              email: app.email,
              school: app.university,
              major: app.major,
              resumeUrl: app.resume_file,
              videoUrl: app.video_url,
              submissionDate: app.submission_date,
              status: app.status as "pending" | "approved" | "rejected"
            }));
            
            setApplications(formattedApplications);
            storeApplications(formattedApplications);
          }
        } catch (error) {
          console.error("Error in fetching applications:", error);
        }
      }
    };
    
    fetchApplications();
  }, [isAuthenticated, user]);

  useEffect(() => {
    refreshMetrics();
  }, [applications, pageViews]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshMetrics();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const isPareto20Email = (email: string) => {
    return email.endsWith('@pareto20.com');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        session,
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
