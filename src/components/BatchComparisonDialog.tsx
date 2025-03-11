import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Application {
  id: string; // Updated to string type for UUID
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  flagged?: boolean;
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
              <TabsContent key={index} value={`app${index + 1}`} className="space-y-4">
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
