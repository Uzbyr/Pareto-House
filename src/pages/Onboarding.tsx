
import React from "react";
import OnboardingFlow from "@/components/OnboardingFlow";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Onboarding = () => {
  const { isAuthenticated } = useAuth();
  const { profile, loading } = useProfile();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
        <span className="ml-2 text-white">Loading profile...</span>
      </div>
    );
  }

  // If the profile has onboarding_completed flag set to true, redirect to dashboard
  if (profile?.onboarding_completed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <OnboardingFlow />
    </div>
  );
};

export default Onboarding;
