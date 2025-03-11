import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Clock,
  Flag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  flagged?: boolean;
  resumeUrl?: string;
  videoUrl?: string;
}

interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (direction: "next" | "prev") => void;
  onStatusChange: (id: string, status: string) => void;
  onFlagToggle: (id: string) => void;
  onCommunicate: () => void;
}

const ApplicationDetailsDialog = ({
  application,
  open,
  onOpenChange,
  onNavigate,
  onStatusChange,
  onFlagToggle,
  onCommunicate
}: ApplicationDetailsDialogProps) => {
  if (!application) return null;

  const fullName = application.firstName && application.lastName
    ? `${application.firstName} ${application.lastName}`
    : application.name;

  const keyboardShortcutsInfo = [
    { key: "←", action: "Previous application" },
    { key: "→", action: "Next application" },
    { key: "A", action: "Approve application" },
    { key: "R", action: "Reject application" },
    { key: "P", action: "Mark as pending" },
    { key: "F", action: "Flag/unflag application" },
    { key: "C", action: "Open communication dialog" },
    { key: "Esc", action: "Close dialog" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Application #{application.id}: {fullName}</span>
              {application.flagged && (
                <Flag className="ml-2 h-4 w-4 text-amber-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              {onNavigate && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-zinc-700 text-gray-300 hover:bg-zinc-700"
                    onClick={() => onNavigate('prev')}
                    title="Previous Application (←)"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-zinc-700 text-gray-300 hover:bg-zinc-700"
                    onClick={() => onNavigate('next')}
                    title="Next Application (→)"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </>
              )}
              <DialogClose className="h-8 w-8 rounded-md border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-700">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {(onStatusChange || onFlagToggle || onCommunicate) && (
            <div className="bg-zinc-900/60 rounded-md p-3 flex flex-wrap gap-2 justify-center border border-zinc-700">
              {onStatusChange && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-400"
                    onClick={() => onStatusChange(application.id, "approved")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve (A)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    onClick={() => onStatusChange(application.id, "rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject (R)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-400"
                    onClick={() => onStatusChange(application.id, "pending")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending (P)
                  </Button>
                </>
              )}
              {onFlagToggle && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    application.flagged 
                      ? "text-amber-400 border-amber-400/20 hover:bg-amber-400/10 hover:text-amber-300"
                      : "text-gray-400 border-gray-400/20 hover:bg-gray-400/10 hover:text-gray-300"
                  }`}
                  onClick={() => onFlagToggle(application.id)}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {application.flagged ? "Unflag (F)" : "Flag (F)"}
                </Button>
              )}
              {onCommunicate && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-500 border-purple-500/20 hover:bg-purple-500/10 hover:text-purple-400"
                  onClick={onCommunicate}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Email (C)
                </Button>
              )}
            </div>
          )}

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
                    <p className="text-white">{application.submissionDate}</p>
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

          <div className="mt-4 text-xs text-gray-500 border-t border-zinc-700 pt-4">
            <h4 className="mb-1 text-gray-400">Keyboard Shortcuts:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-1">
              {keyboardShortcutsInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-zinc-700 rounded-md text-gray-300">{item.key}</kbd>
                  <span>{item.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
