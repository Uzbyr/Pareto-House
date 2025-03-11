
import { Check } from "lucide-react";

interface ApplicationProgressProps {
  currentStep: number;
}

const ApplicationProgress = ({ currentStep }: ApplicationProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? "bg-pareto-pink text-black"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {currentStep > step ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <span className="text-xs mt-1 text-zinc-400">
              {step === 1 ? "Personal" : step === 2 ? "Education" : "Additional"}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-1 bg-zinc-800 mt-2">
        <div
          className="absolute top-0 left-0 h-1 bg-pareto-pink"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ApplicationProgress;
