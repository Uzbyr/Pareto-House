import React, { useEffect, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Video,
  X,
  Globe,
  Linkedin,
  Twitter,
  GraduationCap,
  Building,
  Users,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  country?: string;
  nationality?: string;
  graduationYear?: string;
  preparatoryClasses?: string;
  studentSocieties?: string;
  buildingCompany?: string;
  companyContext?: string;
  websiteUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  resumeFile?: string;
  deckFile?: string;
  memoFile?: string;
}

interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (direction: "next" | "prev") => void;
  onStatusChange: (id: string, status: string) => void;
  onFlagToggle: (id: string) => void;
}

const ApplicationDetailsDialog = ({
  application,
  open,
  onOpenChange,
  onNavigate,
  onStatusChange,
  onFlagToggle,
}: ApplicationDetailsDialogProps) => {
  const [secureUrls, setSecureUrls] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const getSecureUrls = async () => {
      if (!application) return;
      
      const urlMap: Record<string, string> = {};
      
      if (application.resumeFile) {
        const { data } = await supabase.storage
          .from('documents')
          .createSignedUrl(application.resumeFile, 3600);
          
        if (data?.signedUrl) {
          urlMap['resume'] = data.signedUrl;
        }
      }
      
      if (application.deckFile) {
        const { data } = await supabase.storage
          .from('documents')
          .createSignedUrl(application.deckFile, 3600);
          
        if (data?.signedUrl) {
          urlMap['deck'] = data.signedUrl;
        }
      }
      
      if (application.memoFile) {
        const { data } = await supabase.storage
          .from('documents')
          .createSignedUrl(application.memoFile, 3600);
          
        if (data?.signedUrl) {
          urlMap['memo'] = data.signedUrl;
        }
      }
      
      setSecureUrls(urlMap);
    };
    
    if (open && application) {
      getSecureUrls();
    }
  }, [application, open]);

  if (!application) return null;

  const keyboardShortcutsInfo = [
    { key: "←", action: "Previous application" },
    { key: "→", action: "Next application" },
    { key: "A", action: "Approve application" },
    { key: "R", action: "Reject application" },
    { key: "P", action: "Mark as pending" },
    { key: "F", action: "Flag/unflag application" },
    { key: "Esc", action: "Close dialog" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Application #{application.id}: {application.name}</span>
              {application.flagged && (
                <Flag className="ml-2 h-4 w-4 text-amber-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mr-4">
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
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {(onStatusChange || onFlagToggle) && (
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
            </div>
          )}

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4 bg-zinc-900">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="bg-zinc-900 rounded-md p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-400">Name:</span>
                  <p className="text-white">{application.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Email:</span>
                  <p className="text-white">{application.email}</p>
                </div>
                {application.country && (
                  <div>
                    <span className="text-sm text-gray-400">Country:</span>
                    <p className="text-white flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {application.country}
                    </p>
                  </div>
                )}
                {application.nationality && (
                  <div>
                    <span className="text-sm text-gray-400">Nationality:</span>
                    <p className="text-white">{application.nationality}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="bg-zinc-900 rounded-md p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-400">School:</span>
                  <p className="text-white flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1 text-gray-400" />
                    {application.school}
                  </p>
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
                {application.studentSocieties && (
                  <div>
                    <span className="text-sm text-gray-400">Student Societies:</span>
                    <p className="text-white">
                      <Users className="h-4 w-4 inline mr-1 text-gray-400" />
                      {application.studentSocieties}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="project" className="space-y-4">
              <div className="bg-zinc-900 rounded-md p-4 space-y-3">
                {application.buildingCompany && (
                  <div>
                    <span className="text-sm text-gray-400">Building Company:</span>
                    <p className="text-white flex items-center">
                      <Building className="h-4 w-4 mr-1 text-gray-400" />
                      {application.buildingCompany}
                    </p>
                  </div>
                )}
                {application.companyContext && (
                  <div>
                    <span className="text-sm text-gray-400">Company Context:</span>
                    <p className="text-white whitespace-pre-wrap">{application.companyContext}</p>
                  </div>
                )}
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
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="bg-zinc-900 rounded-md p-4 space-y-3">
                {application.resumeFile && (
                  <div>
                    <span className="text-sm text-gray-400">Resume:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(secureUrls['resume'], '_blank')}
                        disabled={!secureUrls['resume']}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {application.deckFile && (
                  <div>
                    <span className="text-sm text-gray-400">Deck Presentation:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(secureUrls['deck'], '_blank')}
                        disabled={!secureUrls['deck']}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Deck
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {application.memoFile && (
                  <div>
                    <span className="text-sm text-gray-400">Memo:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(secureUrls['memo'], '_blank')}
                        disabled={!secureUrls['memo']}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Memo
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
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
                        <Video className="h-4 w-4 mr-2" />
                        Watch Video
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {!application.resumeFile && !application.deckFile && !application.memoFile && !application.videoUrl && (
                  <p className="text-gray-400 italic">No documents uploaded</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="links" className="space-y-4">
              <div className="bg-zinc-900 rounded-md p-4 space-y-3">
                {application.websiteUrl && (
                  <div>
                    <span className="text-sm text-gray-400">Website:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(application.websiteUrl, '_blank')}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        {application.websiteUrl}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {application.linkedinUrl && (
                  <div>
                    <span className="text-sm text-gray-400">LinkedIn:</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(application.linkedinUrl, '_blank')}
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn Profile
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {application.xUrl && (
                  <div>
                    <span className="text-sm text-gray-400">X (Twitter):</span>
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => window.open(application.xUrl, '_blank')}
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        X Profile
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                {!application.websiteUrl && !application.linkedinUrl && !application.xUrl && (
                  <p className="text-gray-400 italic">No external links provided</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

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
