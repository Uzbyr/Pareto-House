
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, requirePasswordChange } = useAuth();
  const location = useLocation();
  const isChangePasswordPage = location.pathname === "/change-password";

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user needs to change password and is not already on the change password page
  if (requirePasswordChange && !isChangePasswordPage) {
    return <Navigate to="/change-password" replace />;
  }

  // If on change password page but doesn't need to change password
  if (isChangePasswordPage && !requirePasswordChange) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === "fellow" || user?.role === "alumni") {
      return <Navigate to="/fellowship" replace />;
    } else {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // Check role requirements if specified
  if (requiredRole && user) {
    // Super admins can access any route
    if (user.role === "super_admin") {
      return <>{children}</>;
    }
    
    // Admins can access admin routes, fellow routes, and alumni routes
    if (user.role === "admin") {
      // Admin can access all routes except super_admin specific routes
      if (requiredRole !== "super_admin") {
        return <>{children}</>;
      } else {
        return <Navigate to="/admin/dashboard" replace />;
      }
    }

    // For routes specifically for fellows or alumni
    if (requiredRole === "fellow" || requiredRole === "alumni") {
      // Variable to track if user has access
      let hasAccess = false;
      
      if (user) {
        // Check each role separately to avoid TypeScript errors
        if (user.role === requiredRole) {
          hasAccess = true;
        }
        // These are separate string literal type checks to avoid TypeScript comparison errors
        if (user.role === "admin") {
          hasAccess = true;
        }
        if (user.role === "super_admin") {
          hasAccess = true;
        }
      }
        
      if (!hasAccess) {
        // Redirect to appropriate dashboard based on user role
        if (user?.role === "fellow") {
          return <Navigate to="/fellowship" replace />;
        } else if (user?.role === "alumni") {
          return <Navigate to="/alumni" replace />;
        } else {
          return <Navigate to="/admin/dashboard" replace />;
        }
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
