
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Fellow } from "@/types/fellow";
import FellowProfileDetails from "./FellowProfileDetails";

interface FellowDetailsModalProps {
  fellow: Fellow | null;
  isOpen: boolean;
  onClose: () => void;
}

const FellowDetailsModal = ({ fellow, isOpen, onClose }: FellowDetailsModalProps) => {
  if (!fellow) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-zinc-800 text-white border-zinc-700 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Fellow Profile</DialogTitle>
        </DialogHeader>
        
        <FellowProfileDetails fellow={fellow} />
      </DialogContent>
    </Dialog>
  );
};

export default FellowDetailsModal;
