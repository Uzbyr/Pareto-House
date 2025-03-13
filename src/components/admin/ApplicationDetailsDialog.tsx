import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { supabase } from "@/integrations/supabase/client";

import PersonalInfoTab from "./application-details/PersonalInfoTab";
import EducationTab from "./application-details/EducationTab";
import ProjectTab from "./application-details/ProjectTab";
import CompetitionTab from "./application-details/CompetitionTab";
import DocumentsTab from "./application-details/DocumentsTab";
import LinksTab from "./application-details/LinksTab";
import StatusActions from "./application-details/StatusActions";

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
          .from("documents")
          .createSignedUrl(application.resumeFile, 3600);

        if (data?.signedUrl) {
          urlMap["resume"] = data.signedUrl;
        }
      }

      if (application.deckFile) {
        const { data } = await supabase.storage
          .from("documents")
          .createSignedUrl(application.deckFile, 3600);

        if (data?.signedUrl) {
          urlMap["deck"] = data.signedUrl;
        }
      }

      if (application.memoFile) {
        const { data } = await supabase.storage
          .from("documents")
          .createSignedUrl(application.memoFile, 3600);

        if (data?.signedUrl) {
          urlMap["memo"] = data.signedUrl;
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
              <span>
                Application #{application.id}: {application.name}
              </span>
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
                    onClick={() => onNavigate("prev")}
                    title="Previous Application (←)"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-zinc-700 text-gray-300 hover:bg-zinc-700"
                    onClick={() => onNavigate("next")}
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
            <StatusActions
              application={application}
              onStatusChange={onStatusChange}
              onFlagToggle={onFlagToggle}
            />
          )}

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4 bg-zinc-900">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="competition">Competition</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoTab application={application} />
            </TabsContent>

            <TabsContent value="education">
              <EducationTab application={application} />
            </TabsContent>

            <TabsContent value="project">
              <ProjectTab application={application} />
            </TabsContent>

            <TabsContent value="competition">
              <CompetitionTab application={application} />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsTab application={application} secureUrls={secureUrls} />
            </TabsContent>

            <TabsContent value="links">
              <LinksTab application={application} />
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-xs text-gray-500 border-t border-zinc-700 pt-4">
            <h4 className="mb-1 text-gray-400">Keyboard Shortcuts:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-1">
              {keyboardShortcutsInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-zinc-700 rounded-md text-gray-300">
                    {item.key}
                  </kbd>
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
