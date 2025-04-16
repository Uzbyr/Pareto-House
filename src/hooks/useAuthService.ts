
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser } from "@/types/auth";
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

  const login = async (email: string, password: string): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data) {
        const role = await getUserRole(data.user.id)

        const authUser = {
          email: data.user.email || "",
          role: role,
        }

        setIsAuthenticated(true);
        setSession(data.session);
        setUser(authUser);
        return authUser;
      }

      if (error) {
        console.error("Login error:", error.message);
        return null;
      }

      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
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
  
  // Add the missing isPareto20Email function
  const isPareto20Email = (email: string): boolean => {
    return email.endsWith('@pareto20.com') || email.endsWith('@pareto.dev');
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
    isPareto20Email,
    // These setter functions are exposed for the AuthProvider to use
    setIsAuthenticated,
    setUser,
    setSession,
    setRequirePasswordChange,
  };
};
