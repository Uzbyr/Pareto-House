
import React from "react";

interface OnboardingProgressProps {
  step: number;
  totalSteps: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ step, totalSteps }) => {
  const getStepName = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Personal Information";
      case 2:
        return "Education";
      case 3:
        return "Online Presence";
      default:
        return `Step ${stepNumber}`;
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">Step {step} of {totalSteps}</span>
        <span className="text-sm text-gray-400">
          {getStepName(step)}
        </span>
      </div>
      <div className="w-full bg-zinc-700 h-2 rounded-full">
        <div
          className="bg-pareto-pink h-2 rounded-full transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
