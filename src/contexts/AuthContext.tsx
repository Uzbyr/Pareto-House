
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "@/types/auth";
import { getUserRole } from "@/utils/authUtils";
import { useAuthService } from "@/hooks/useAuthService";
import { useMetricsService } from "@/hooks/useMetricsService";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { Outlet } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = () => {
  // Use our custom hooks to manage state and functionality
  const {
    isAuthenticated,
    user,
    session,
    requirePasswordChange,
    login,
    logout,
    changePassword,
    isPareto20Email,
    setIsAuthenticated,
    setUser,
    setSession,
    setRequirePasswordChange,
  } = useAuthService();

  const { sessionId } = useVisitorTracking();

  const {
    siteMetrics,
    refreshMetrics,
    getApplications,
    submitApplication,
    trackPageVisit,
  } = useMetricsService(isAuthenticated, user);

  // Auth initialization and state change subscription
  useEffect(() => {
    const setupAuth = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentSession = sessionData.session;

      setSession(currentSession);
      setIsAuthenticated(!!currentSession);

      if (currentSession?.user) {
        const role = await getUserRole(currentSession.user.id);

        setUser({
          email: currentSession.user.email || "",
          role: role,
        });

        // Check if user needs to change password
        const requireChange =
          currentSession.user.user_metadata?.require_password_change === true;
        setRequirePasswordChange(requireChange);
      }
    };

    setupAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === "SIGNED_IN") {
        if (session?.access_token === currentSession?.access_token) {
          return;
        }
        setTimeout(async () => {
          const role = await getUserRole(currentSession.user.id);
          setSession(currentSession);
          setIsAuthenticated(true);
          setUser({
            email: currentSession.user.email || "",
            role: role,
          });
        }, 0);
      }

      if (event === "SIGNED_OUT") {
        setSession(null);
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Loading state replaced with early return of a loading component
  if (!user && isAuthenticated) {
    return <div className="flex items-center justify-center h-screen bg-zinc-900">Loading...</div>;
  }

  // Provide the complete auth context
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        session,
        requirePasswordChange,
        login,
        logout,
        changePassword,
        isPareto20Email,
        siteMetrics,
        refreshMetrics,
        getApplications,
        submitApplication,
        trackPageVisit,
      }}
    >
      <Outlet />
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
