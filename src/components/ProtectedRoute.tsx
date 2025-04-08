
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { canAccessRole } from "@/utils/authUtils";

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
    // Use the canAccessRole utility function to handle role-based access
    if (!canAccessRole(user.role, requiredRole)) {
      // Redirect to appropriate dashboard based on user role
      if (user.role === "fellow") {
        return <Navigate to="/fellowship" replace />;
      } else if (user.role === "alumni") {
        return <Navigate to="/alumni" replace />;
      } else {
        return <Navigate to="/admin/dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
