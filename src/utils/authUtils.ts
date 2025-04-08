
import { UserRole } from "@/types/auth";

export const getUserRole = (email: string): UserRole => {
  if (!email) return "fellow";

  if (email === "superadmin@pareto20.com") return "super_admin";
  if (email === "admin@pareto20.com") return "admin";
  
  // Check for alumni email pattern if needed
  // if (email.includes("alumni")) return "alumni";

  // By default, assume this is a fellow
  return "fellow";
};

export const isPareto20Email = (email: string) => {
  return email.endsWith("@pareto20.com");
};

// Helper function to check if a user has admin privileges
export const hasAdminPrivileges = (role: UserRole | undefined) => {
  return role === "admin" || role === "super_admin";
};

// Function to check if a user can access a particular role-restricted area
export const canAccessRole = (userRole: UserRole | undefined, requiredRole: UserRole): boolean => {
  if (!userRole) return false;
  
  // Super admins can access everything
  if (userRole === "super_admin") return true;
  
  // Admins can access everything except super_admin routes
  // Fix: Ensure admins can access admin-specific routes
  if (userRole === "admin") {
    // Admin can access all routes except super_admin specific routes
    return requiredRole !== "super_admin";
  }
  
  // Regular users can only access their specific role pages
  return userRole === requiredRole;
};
