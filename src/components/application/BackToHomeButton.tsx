import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BackToHomeButtonProps {
  isFormDirty?: boolean;
}

const BackToHomeButton = ({ isFormDirty = false }: BackToHomeButtonProps) => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClick = () => {
    if (isFormDirty) {
      setShowConfirmDialog(true);
    } else {
      navigate("/");
    }
  };

  const handleConfirmNavigation = () => {
    setShowConfirmDialog(false);
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors duration-300 rounded-sm text-sm flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Homepage
      </button>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-pareto-pink" />
              Unsaved Changes
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              You have unsaved changes in your application form. If you leave
              now, your current progress will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:justify-between sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-zinc-700 hover:bg-zinc-800 text-white"
            >
              Continue Editing
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmNavigation}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              Leave Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BackToHomeButton;
