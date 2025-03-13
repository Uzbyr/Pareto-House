import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  FileText,
} from "lucide-react";
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
  resumeFile?: string;
  deckFile?: string;
  memoFile?: string;
}

interface BatchComparisonDialogProps {
  applications: Application[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BatchComparisonDialog = ({
  applications,
  open,
  onOpenChange,
}: BatchComparisonDialogProps) => {
  const [secureUrls, setSecureUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const getSecureUrls = async () => {
      const urlMap: Record<string, string> = {};

      for (const app of applications) {
        if (app.resumeFile) {
          const { data } = await supabase.storage
            .from("applications")
            .createSignedUrl(app.resumeFile, 3600);

          if (data?.signedUrl) {
            urlMap[`resume-${app.id}`] = data.signedUrl;
          }
        }

        if (app.deckFile) {
          const { data } = await supabase.storage
            .from("applications")
            .createSignedUrl(app.deckFile, 3600);

          if (data?.signedUrl) {
            urlMap[`deck-${app.id}`] = data.signedUrl;
          }
        }

        if (app.memoFile) {
          const { data } = await supabase.storage
            .from("applications")
            .createSignedUrl(app.memoFile, 3600);

          if (data?.signedUrl) {
            urlMap[`memo-${app.id}`] = data.signedUrl;
          }
        }
      }

      setSecureUrls(urlMap);
    };

    if (open && applications.length > 0) {
      getSecureUrls();
    }
  }, [applications, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Batch Comparison</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="app1" className="space-y-4">
          <TabsList>
            {applications.map((app, index) => (
              <TabsTrigger key={index} value={`app${index + 1}`}>
                {app.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {applications.map((app, index) => (
              <TabsContent
                key={index}
                value={`app${index + 1}`}
                className="space-y-4"
              >
                <div className="grid gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Name
                    </h4>
                    <p className="text-base font-bold">{app.name}</p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Email
                    </h4>
                    <p className="text-base">{app.email}</p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      School
                    </h4>
                    <p className="text-base">{app.school}</p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Major
                    </h4>
                    <p className="text-base">{app.major || "N/A"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Submission Date
                    </h4>
                    <p className="text-base">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Status
                    </h4>
                    <Badge
                      className={
                        app.status === "approved"
                          ? "bg-green-500 text-white"
                          : app.status === "rejected"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                      }
                    >
                      {app.status === "approved" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {app.status === "rejected" && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {app.status === "pending" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {app.status}
                    </Badge>
                  </div>

                  {/* Documents section */}
                  {(app.resumeFile || app.deckFile || app.memoFile) && (
                    <div className="space-y-2 mt-2 pt-2 border-t">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Documents
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {app.resumeFile && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                            onClick={() =>
                              window.open(
                                secureUrls[`resume-${app.id}`],
                                "_blank",
                              )
                            }
                            disabled={!secureUrls[`resume-${app.id}`]}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Resume
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        )}

                        {app.deckFile && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                            onClick={() =>
                              window.open(
                                secureUrls[`deck-${app.id}`],
                                "_blank",
                              )
                            }
                            disabled={!secureUrls[`deck-${app.id}`]}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Deck
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        )}

                        {app.memoFile && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                            onClick={() =>
                              window.open(
                                secureUrls[`memo-${app.id}`],
                                "_blank",
                              )
                            }
                            disabled={!secureUrls[`memo-${app.id}`]}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Memo
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BatchComparisonDialog;
