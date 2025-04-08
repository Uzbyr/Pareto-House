
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { hasAdminPrivileges, canAccessRole } from "@/utils/authUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute = ({ children, requiredRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, allow access
  if (requiredRoles.length === 0) {
    return <>{children}</>;
  }

  // Super admins can access everything
  if (user?.role === "super_admin") {
    return <>{children}</>;
  }

  // Check if the user's role is in the list of required roles
  if (requiredRoles.includes(user?.role as UserRole)) {
    return <>{children}</>;
  }

  // Special case: Admins can access fellow routes
  if (user?.role === "admin" && requiredRoles.includes("fellow")) {
    return <>{children}</>;
  }

  // Admins can access everything except super_admin routes
  if (user?.role === "admin" && !requiredRoles.includes("super_admin")) {
    return <>{children}</>;
  }

  // Redirect to home if the user doesn't have the required role
  // Direct admin to admin dashboard and fellows to fellowship
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user?.role === "fellow") {
    return <Navigate to="/fellowship" replace />;
  } else if (user?.role === "alumni") {
    return <Navigate to="/alumni" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
