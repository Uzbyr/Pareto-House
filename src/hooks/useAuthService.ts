
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { getUserRole } from "@/utils/authUtils";
import {
  AuthState,
  AuthActions,
  AuthStateSetters,
} from "@/contexts/auth/types";

export const useAuthService = (): AuthState &
  AuthActions &
  AuthStateSetters => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [requirePasswordChange, setRequirePasswordChange] = 
    useState<boolean>(false);

  const login = async (email: string): Promise<boolean> => {
    try {
      console.log("Sending magic link for email:", email);
      // Call our custom magic link edge function instead of using Supabase directly
      const response = await supabase.functions.invoke("send-magic-link", {
        body: {
          email,
          redirectTo: `${window.location.origin}/auth-callback`,
        }
      });

      console.log("Magic link response:", response);

      if (response.error) {
        console.error("Login error:", response.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setRequirePasswordChange(false);

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        throw error;
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setRequirePasswordChange(false);
    }
  };

  const changePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
        data: {
          require_password_change: false,
        },
      });

      if (error) {
        console.error("Password change error:", error.message);
        return false;
      }

      setRequirePasswordChange(false);
      return true;
    } catch (error) {
      console.error("Password change error:", error);
      return false;
    }
  };

  const isPareto20Email = (email: string) => {
    return email.endsWith("@pareto20.com");
  };

  return {
    isAuthenticated,
    user,
    session,
    requirePasswordChange,
    login,
    logout,
    changePassword,
    isPareto20Email,
    // These setter functions are exposed for the AuthProvider to use
    setIsAuthenticated,
    setUser,
    setSession,
    setRequirePasswordChange,
  };
};
