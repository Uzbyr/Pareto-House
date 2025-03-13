import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  AuthContextType,
  Application,
  AuthUser,
  SiteMetrics,
} from "@/types/auth";
import { getUserRole, isPareto20Email } from "@/utils/authUtils";
import { collectRealMetrics } from "@/utils/metricsUtils";
import {
  getStoredApplications,
  storeApplications,
  getStoredPageViews,
  storePageViews,
  getStoredVisitorData,
  storeVisitorData,
} from "@/utils/storageUtils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>(
    getStoredApplications(),
  );
  const [siteMetrics, setSiteMetrics] =
    useState<SiteMetrics>(collectRealMetrics());

  const [sessionId] = useState<string>(() => {
    let id = sessionStorage.getItem("visitorSessionId");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("visitorSessionId", id);

      const visitorData = getStoredVisitorData();
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      visitorData.total += 1;
      visitorData.byDate[today] = (visitorData.byDate[today] || 0) + 1;

      storeVisitorData(visitorData);
    }
    return id;
  });

  const [pageViews, setPageViews] =
    useState<Record<string, number>>(getStoredPageViews());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user?.email) {
        setUser({
          email: session.user.email,
          role: getUserRole(session.user.email),
        });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user?.email) {
        setUser({
          email: session.user.email,
          role: getUserRole(session.user.email),
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const trackPageVisit = (pageName: string) => {
    setPageViews((prevViews) => {
      const newViews = {
        ...prevViews,
        [pageName]: (prevViews[pageName] || 0) + 1,
      };
      storePageViews(newViews);
      return newViews;
    });
  };

  const submitApplication = (
    applicationData: Omit<Application, "id" | "submissionDate" | "status">,
  ) => {
    const newApplication: Application = {
      ...applicationData,
      id: crypto.randomUUID(),
      submissionDate: new Date().toISOString(),
      status: "pending",
    };

    setApplications((prevApps) => {
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
            .from("applications")
            .select("*");

          if (error) {
            console.error("Error fetching applications:", error);
            return;
          }

          if (data) {
            const formattedApplications = data.map((app) => ({
              id: app.id.toString(),
              name: `${app.first_name} ${app.last_name}`,
              email: app.email,
              school: app.university,
              major: app.major,
              resumeUrl: app.resume_file,
              videoUrl: app.video_url,
              submissionDate: app.submission_date,
              status: app.status as "pending" | "approved" | "rejected",
              flagged: app.flagged,
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        trackPageVisit,
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
