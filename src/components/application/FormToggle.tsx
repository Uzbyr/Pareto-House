
import { Button } from "@/components/ui/button";

interface FormToggleProps {
  showCustomForm: boolean;
  setShowCustomForm: (show: boolean) => void;
}

const FormToggle = ({ showCustomForm, setShowCustomForm }: FormToggleProps) => {
  return (
    <div className="text-center mb-6">
      <Button 
        variant="outline" 
        onClick={() => setShowCustomForm(!showCustomForm)}
        className="text-sm"
      >
        {showCustomForm ? "Switch to Original Form" : "Switch to Fixed Form"}
      </Button>
      {showCustomForm && (
        <p className="mt-2 text-xs text-zinc-400">
          This form fixes the YouTube field submission issue and uses graduation years 2025-2030
        </p>
      )}
    </div>
  );
};

export default FormToggle;
