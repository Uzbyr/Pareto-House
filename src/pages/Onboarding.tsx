
import React from "react";
import OnboardingFlow from "@/components/OnboardingFlow";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Onboarding = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <OnboardingFlow />
    </div>
  );
};

export default Onboarding;
