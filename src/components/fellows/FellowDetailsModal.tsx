
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Briefcase, GraduationCap, School } from "lucide-react";
import { Fellow } from "@/types/fellow";

interface FellowDetailsModalProps {
  fellow: Fellow | null;
  isOpen: boolean;
  onClose: () => void;
}

const FellowDetailsModal = ({ fellow, isOpen, onClose }: FellowDetailsModalProps) => {
  if (!fellow) return null;

  const getInitials = (firstName: string | null, lastName: string | null): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  const getFullName = () => {
    return `${fellow.first_name || ""} ${fellow.last_name || ""}`;
  };

  const getEducationInfo = () => {
    if (fellow.university) {
      return (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-400" />
          <span>{fellow.university}</span>
          {fellow.graduation_year && <span className="text-gray-400">· Class of {fellow.graduation_year}</span>}
        </div>
      );
    } else if (fellow.high_school) {
      return (
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-gray-400" />
          <span>{fellow.high_school}</span>
          {fellow.graduation_year && <span className="text-gray-400">· Class of {fellow.graduation_year}</span>}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-zinc-800 text-white border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Fellow Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <Avatar className="h-24 w-24 mb-4 border-2 border-pareto-pink">
            {fellow.profile_picture_url ? (
              <AvatarImage
                src={fellow.profile_picture_url}
                alt={getFullName()}
              />
            ) : (
              <AvatarFallback className="bg-zinc-700 text-white text-2xl">
                {getInitials(fellow.first_name, fellow.last_name)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <h2 className="text-2xl font-bold text-white mb-1">{getFullName()}</h2>
          
          {fellow.major && (
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span>{fellow.major}</span>
            </div>
          )}
          
          {getEducationInfo()}
        </div>
        
        <Separator className="bg-zinc-700" />
        
        <div className="py-4 space-y-4">
          {(fellow.linkedin_url || fellow.github_url || fellow.website_url) && (
            <div>
              <h3 className="text-lg font-medium mb-2">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {fellow.linkedin_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                    asChild
                  >
                    <a href={fellow.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-linkedin mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                      LinkedIn
                    </a>
                  </Button>
                )}
                
                {fellow.github_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                    asChild
                  >
                    <a href={fellow.github_url} target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-github mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub
                    </a>
                  </Button>
                )}
                
                {fellow.website_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                    asChild
                  >
                    <a href={fellow.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FellowDetailsModal;
