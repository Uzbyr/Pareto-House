import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { useProfile } from "@/contexts/ProfileContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requireOnboarding?: boolean;
}

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  requireOnboarding = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();

  // No need to check isAuthenticated since AuthContext already wraps this component
  // and would redirect to login if not authenticated

  // Check if onboarding is required and not completed
  if (
    requireOnboarding &&
    user?.role !== "admin" &&
    (!profile || !profile.onboarding_completed)
  ) {
    return <Navigate to="/onboarding" replace />;
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
    return <Navigate to="/house" replace />;
  } else if (user?.role === "alumni") {
    return <Navigate to="/alumni" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
