
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

  // If no specific roles are required or the user is a super_admin, allow access
  if (requiredRoles.length === 0 || user?.role === "super_admin") {
    return <>{children}</>;
  }

  // Check if the user's role is in the list of required roles or if they have admin privileges
  if (requiredRoles.includes(user?.role as UserRole) || 
      (hasAdminPrivileges(user?.role) && !requiredRoles.includes("super_admin"))) {
    return <>{children}</>;
  }

  // Redirect to home if the user doesn't have the required role
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
