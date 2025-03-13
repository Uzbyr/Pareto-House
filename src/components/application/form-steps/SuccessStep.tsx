import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessStepProps {
  onReturnHome: () => void;
}

const SuccessStep = memo(({ onReturnHome }: SuccessStepProps) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
      <Check className="h-8 w-8 text-white" />
    </div>
    <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
    <p className="text-gray-400 mb-8">
      Thank you for applying to the Pareto Fellowship. We will review your
      application and get back to you soon.
    </p>
    <Button
      onClick={onReturnHome}
      className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
    >
      Return to Homepage
    </Button>
  </div>
));

export default SuccessStep;
