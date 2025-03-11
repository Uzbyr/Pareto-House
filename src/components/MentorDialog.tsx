
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface Mentor {
  name: string;
  linkedIn: string;
  description?: string;
  imageUrl?: string;
  country: string;
}

interface MentorDialogProps {
  mentor: Mentor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MentorDialog = ({ mentor, open, onOpenChange }: MentorDialogProps) => {
  if (!mentor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{mentor.name}</DialogTitle>
          <DialogDescription>{mentor.country}</DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 py-4">
          {mentor.imageUrl && (
            <div className="w-32 h-32 rounded-full overflow-hidden shrink-0">
              <img
                src={mentor.imageUrl}
                alt={mentor.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            {mentor.description && (
              <p className="text-black/80 dark:text-white/80">{mentor.description}</p>
            )}
            
            <div className="flex gap-3 mt-2">
              <Button asChild variant="outline" size="sm">
                <a 
                  href={mentor.linkedIn} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              
              <Button asChild size="sm">
                <Link to="/mentors" className="flex items-center gap-2">
                  View All Mentors
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorDialog;
