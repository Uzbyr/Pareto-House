
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdminDashboard } from "@/utils/authUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "super_admin" | "analyst" | "fellow" | "alumni";
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, requiredRole, adminOnly }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if the route is admin-only and the user doesn't have admin access
  if (adminOnly && user && !canAccessAdminDashboard(user.role)) {
    // Redirect non-admin users to a more appropriate page
    return <Navigate to="/profile" replace />;
  }

  // Check role requirements if specified
  if (
    requiredRole &&
    user?.role !== requiredRole &&
    user?.role !== "super_admin"
  ) {
    // Super admins can access any route, otherwise check specific role
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
