
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  // Additional properties that might be in the application
  firstName?: string;
  lastName?: string;
  graduationYear?: string;
  interests?: string;
  preparatoryClasses?: string;
  referral?: string;
  videoUrl?: string;
  resumeUrl?: string;
}

interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationDetailsDialog = ({
  application,
  open,
  onOpenChange,
}: ApplicationDetailsDialogProps) => {
  if (!application) return null;

  // Format name from firstName and lastName if available, otherwise use name
  const fullName = application.firstName && application.lastName
    ? `${application.firstName} ${application.lastName}`
    : application.name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Application #{application.id}: {fullName}</span>
            <DialogClose className="h-6 w-6 rounded-md border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-700">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Personal Information</h3>
                <div className="mt-2 bg-zinc-900 rounded-md p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-400">Name:</span>
                    <p className="text-white">{fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Email:</span>
                    <p className="text-white">{application.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">Education</h3>
                <div className="mt-2 bg-zinc-900 rounded-md p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-400">School:</span>
                    <p className="text-white">{application.school}</p>
                  </div>
                  {application.major && (
                    <div>
                      <span className="text-sm text-gray-400">Major:</span>
                      <p className="text-white">{application.major}</p>
                    </div>
                  )}
                  {application.graduationYear && (
                    <div>
                      <span className="text-sm text-gray-400">Expected Graduation:</span>
                      <p className="text-white">{application.graduationYear}</p>
                    </div>
                  )}
                  {application.preparatoryClasses && (
                    <div>
                      <span className="text-sm text-gray-400">Preparatory Classes:</span>
                      <p className="text-white">{application.preparatoryClasses === "yes" ? "Yes" : "No"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Application Details</h3>
                <div className="mt-2 bg-zinc-900 rounded-md p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-400">Submission Date:</span>
                    <p className="text-white">{formatDate(application.submissionDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Status:</span>
                    <p className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === "approved" 
                        ? "bg-green-400/10 text-green-400" 
                        : application.status === "rejected"
                        ? "bg-red-400/10 text-red-400" 
                        : "bg-yellow-400/10 text-yellow-400"
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </p>
                  </div>
                  {application.referral && (
                    <div>
                      <span className="text-sm text-gray-400">Referral Source:</span>
                      <p className="text-white">{application.referral}</p>
                    </div>
                  )}
                </div>
              </div>

              {application.interests && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Areas of Interest</h3>
                  <div className="mt-2 bg-zinc-900 rounded-md p-4">
                    <p className="text-white whitespace-pre-wrap">{application.interests}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {(application.videoUrl || application.resumeUrl) && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Uploaded Documents</h3>
              <div className="bg-zinc-900 rounded-md p-4 space-y-2">
                {application.videoUrl && (
                  <div>
                    <span className="text-sm text-gray-400">Video Presentation:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(application.videoUrl, '_blank')}
                      >
                        View Video
                      </Button>
                    </div>
                  </div>
                )}
                {application.resumeUrl && (
                  <div>
                    <span className="text-sm text-gray-400">Resume:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(application.resumeUrl, '_blank')}
                      >
                        View Resume
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
