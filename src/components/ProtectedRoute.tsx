
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
  const { profile, loading } = useProfile();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If still loading the profile, show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // Check if onboarding is required and not completed
  if (requireOnboarding && user?.role !== "admin" && (!profile || !profile.onboarding_completed)) {
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
    return <Navigate to="/fellowship" replace />;
  } else if (user?.role === "alumni") {
    return <Navigate to="/alumni" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
