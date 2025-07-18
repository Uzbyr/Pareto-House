
import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onSubmit: (e?: React.FormEvent) => void; // Updated type definition to accept an optional event parameter
  loading: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onSubmit,
  loading,
}) => {
  return (
    <div className="pt-4">
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-zinc-700 hover:bg-zinc-800"
        >
          Previous
        </Button>
        <Button
          onClick={(e) => onSubmit(e)} // Forward the event to the onSubmit function
          disabled={loading}
          className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
        >
          {loading ? "Completing..." : "Complete Onboarding"}
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
