
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  flagged?: boolean;
  firstName?: string;
  lastName?: string;
  graduationYear?: string;
  interests?: string;
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
  const [comparisonFields, setComparisonFields] = useState<string[]>([
    "school", "major", "graduationYear", "interests"
  ]);

  // No applications to compare
  if (!applications.length) return null;

  const toggleField = (field: string) => {
    setComparisonFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Compare Applications ({applications.length})</span>
            <DialogClose className="h-6 w-6 rounded-md border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-700">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Field toggle buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-400 mr-2 self-center">Compare:</span>
            <Button
              variant={comparisonFields.includes("school") ? "pink" : "outline"}
              size="sm"
              onClick={() => toggleField("school")}
              className={comparisonFields.includes("school") ? "" : "border-zinc-700 text-gray-300"}
            >
              School
            </Button>
            <Button
              variant={comparisonFields.includes("major") ? "pink" : "outline"}
              size="sm"
              onClick={() => toggleField("major")}
              className={comparisonFields.includes("major") ? "" : "border-zinc-700 text-gray-300"}
            >
              Major
            </Button>
            <Button
              variant={comparisonFields.includes("graduationYear") ? "pink" : "outline"}
              size="sm"
              onClick={() => toggleField("graduationYear")}
              className={comparisonFields.includes("graduationYear") ? "" : "border-zinc-700 text-gray-300"}
            >
              Graduation
            </Button>
            <Button
              variant={comparisonFields.includes("interests") ? "pink" : "outline"}
              size="sm"
              onClick={() => toggleField("interests")}
              className={comparisonFields.includes("interests") ? "" : "border-zinc-700 text-gray-300"}
            >
              Interests
            </Button>
          </div>

          {/* Comparison table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((app) => {
              // Format name from firstName and lastName if available, otherwise use name
              const fullName = app.firstName && app.lastName
                ? `${app.firstName} ${app.lastName}`
                : app.name;

              return (
                <div key={app.id} className="bg-zinc-900 rounded-md p-4 flex flex-col h-full">
                  <div className="border-b border-zinc-700 pb-3 mb-3">
                    <h3 className="font-bold text-lg">{fullName}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-400">#{app.id}</span>
                      <span 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === "approved" 
                            ? "bg-green-400/10 text-green-400" 
                            : app.status === "rejected"
                            ? "bg-red-400/10 text-red-400" 
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {app.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {app.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                        {app.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 flex-grow">
                    {comparisonFields.includes("school") && (
                      <div>
                        <span className="text-sm text-gray-400 block">School:</span>
                        <p className="text-white">{app.school}</p>
                      </div>
                    )}
                    
                    {comparisonFields.includes("major") && app.major && (
                      <div>
                        <span className="text-sm text-gray-400 block">Major:</span>
                        <p className="text-white">{app.major}</p>
                      </div>
                    )}
                    
                    {comparisonFields.includes("graduationYear") && app.graduationYear && (
                      <div>
                        <span className="text-sm text-gray-400 block">Graduation:</span>
                        <p className="text-white">{app.graduationYear}</p>
                      </div>
                    )}
                    
                    {comparisonFields.includes("interests") && app.interests && (
                      <div>
                        <span className="text-sm text-gray-400 block">Interests:</span>
                        <p className="text-white text-sm line-clamp-6">{app.interests}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-700">
                    <span className="text-sm text-gray-400 block">Submitted:</span>
                    <p className="text-white">{formatDate(app.submissionDate)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchComparisonDialog;
