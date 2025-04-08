import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute = ({
  children,
  requiredRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length === 0) {
    return <>{children}</>;
  }

  if (requiredRoles.includes(user?.role as UserRole)) {
    return <>{children}</>;
  }

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
