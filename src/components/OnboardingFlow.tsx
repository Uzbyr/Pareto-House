
import React from "react";
import { Card } from "@/components/ui/card";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import EducationStep from "@/components/onboarding/EducationStep";
import OnlinePresenceStep from "@/components/onboarding/OnlinePresenceStep";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";

const OnboardingSteps = () => {
  const { step } = useOnboarding();

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <OnlinePresenceStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 bg-zinc-800 border-zinc-700">
        <OnboardingProgress step={step} totalSteps={3} />
        {renderCurrentStep()}
      </Card>
    </div>
  );
};

const OnboardingFlow = () => {
  return (
    <OnboardingProvider>
      <OnboardingSteps />
    </OnboardingProvider>
  );
};

export default OnboardingFlow;
