import { UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

export const getUserRole = async (userId: string): Promise<UserRole> => {
  if (!userId) return "fellow";

  try {
    // Query the user_roles table to get the user's role
    // With RLS policies in place, users can now access their own roles
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user role:", error);
      return "fellow"; // Default role if there's an error
    }

    if (!data) {
      console.log("No role found for user, defaulting to fellow");
      return "fellow"; // Default role if no role is found
    }

    // Return the role from the database
    return data.role as UserRole;
  } catch (error) {
    console.error("Exception when fetching user role:", error);
    return "fellow"; // Default role if there's an exception
  }
};

export const isPareto20Email = (email: string) => {
  return email.endsWith("@pareto20.com");
};

// Helper function to check if a user has admin privileges
export const hasAdminPrivileges = (role: UserRole | undefined) => {
  return role === "admin" || role === "super_admin";
};

// Function to check if a user can access a particular role-restricted area
export const canAccessRole = (
  userRole: UserRole | undefined,
  requiredRole: UserRole,
): boolean => {
  if (!userRole) return false;

  // Super admins can access everything
  if (userRole === "super_admin") return true;

  // Admins can access everything except super_admin routes
  if (userRole === "admin") {
    return requiredRole !== "super_admin";
  }

  // Regular users can only access their specific role pages
  return userRole === requiredRole;
};
