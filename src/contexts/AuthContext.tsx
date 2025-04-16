import React, { createContext, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "@/types/auth";
import { getUserRole } from "@/utils/authUtils";
import { useAuthService } from "@/hooks/useAuthService";
import { useMetricsService } from "@/hooks/useMetricsService";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
        console.log("Setting up auth for user:", currentSession.user.id);
        console.log("currentSession", currentSession);
        // Get user role from database
        const role = await getUserRole(currentSession.user.id);
        console.log("User role from getUserRole:", role);

        setUser({
          email: currentSession.user.email || "",
          role: role,
        });
      }
    };

    setupAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (session?.user?.id == currentSession?.user?.id) return;
      console.log('event', event, currentSession);

      if (currentSession && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        setSession(session);
        setIsAuthenticated(!!currentSession);
        // Use setTimeout to avoid potential recursion issues with RLS policies
        setTimeout(async () => {
          // Get user role from database
          const role = await getUserRole(currentSession.user.id);
          console.log("User role from onAuthStateChange:", role);

          setUser({
            email: currentSession.user.email || "",
            role: role,
          });
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Loading state replaced with early return of a loading component
  if (!user && isAuthenticated) {
    return <div>Loading...</div>;
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
