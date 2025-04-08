
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Application, MetricsState, MetricsActions, AuthContextType } from "@/contexts/auth/types";
import { collectRealMetrics } from "@/utils/metricsUtils";
import {
  getStoredApplications,
  storeApplications,
  getStoredPageViews,
  storePageViews,
} from "@/utils/storageUtils";

export const useMetricsService = (isAuthenticated: boolean, currentUser: AuthContextType['user']): MetricsState & MetricsActions => {
  const [applications, setApplications] = useState<Application[]>(
    getStoredApplications(),
  );
  const [siteMetrics, setSiteMetrics] = useState<MetricsState['siteMetrics']>(
    collectRealMetrics(),
  );
  const [pageViews, setPageViews] = useState<Record<string, number>>(getStoredPageViews());

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
      if (isAuthenticated && currentUser) {
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
  }, [isAuthenticated, currentUser]);

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

  return {
    siteMetrics,
    refreshMetrics,
    getApplications,
    submitApplication,
    trackPageVisit,
  };
};
