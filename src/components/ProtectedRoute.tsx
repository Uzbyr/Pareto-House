
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "super_admin" | "analyst" | "fellow" | "alumni";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role requirements if specified
  if (requiredRole && user?.role !== requiredRole) {
    // Super admins can access any route
    if (user?.role === "super_admin") {
      return <>{children}</>;
    }
    
    // Admins can access admin routes
    if (user?.role === "admin" && (requiredRole === "admin" || requiredRole === "analyst")) {
      return <>{children}</>;
    }

    // Route specifically for fellows
    if (requiredRole === "fellow" && user?.role !== "fellow") {
      // Redirect fellows to their dashboard
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Route specifically for alumni
    if (requiredRole === "alumni" && user?.role !== "alumni") {
      // Redirect alumni to their dashboard
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Redirect to appropriate dashboard based on role
    if (user?.role === "fellow") {
      return <Navigate to="/fellowship" replace />;
    }

    if (user?.role === "alumni") {
      return <Navigate to="/alumni" replace />;
    }

    // Default redirect to admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
