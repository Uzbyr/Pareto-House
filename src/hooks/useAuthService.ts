import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
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

  console.log("user", user);

  return {
    isAuthenticated,
    user,
    session,
    requirePasswordChange,
    login,
    logout,
    changePassword,
    // These setter functions are exposed for the AuthProvider to use
    setIsAuthenticated,
    setUser,
    setSession,
    setRequirePasswordChange,
  };
};
