
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  X,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface Application {
  id: number;
  name: string;
  email: string;
  status: string;
  firstName?: string;
  lastName?: string;
}

interface CommunicationDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emailTemplates = {
  interview: {
    subject: "Pareto Fellowship Interview Request",
    body: `Dear {firstName},

We're excited to inform you that your Pareto Fellowship application has advanced to the interview stage. We were impressed by your background and would like to schedule a 30-minute video interview.

Please use the following link to select a time that works for you: [CALENDLY_LINK]

If you have any questions, feel free to reply to this email.

Best regards,
The Pareto Team`
  },
  additional_info: {
    subject: "Additional Information Needed - Pareto Fellowship Application",
    body: `Dear {firstName},

Thank you for your application to the Pareto Fellowship. We're reviewing your submission and would like some additional information to help us better evaluate your candidacy.

Could you please provide the following:
1. More details about your project {projectName}
2. A brief explanation of why you're interested in the Pareto Fellowship
3. Any additional context that might be relevant to your application

Please reply to this email with the requested information at your earliest convenience.

Best regards,
The Pareto Team`
  },
  acceptance: {
    subject: "Congratulations! You've Been Accepted to the Pareto Fellowship",
    body: `Dear {firstName},

We are delighted to inform you that your application to the Pareto Fellowship has been accepted. Congratulations!

Our selection committee was impressed by your achievements, potential, and vision. We believe you will make a valuable contribution to our community of exceptional builders and thinkers.

Next Steps:
1. Please confirm your acceptance by [DEADLINE]
2. Complete the onboarding form: [LINK]
3. Join our Slack community: [INVITE_LINK]
4. Mark your calendar for our orientation on [DATE]

We're excited to welcome you to the Pareto Fellowship and can't wait to see what you'll build.

Best regards,
The Pareto Team`
  },
  rejection: {
    subject: "Pareto Fellowship Application Update",
    body: `Dear {firstName},

Thank you for your interest in the Pareto Fellowship and for taking the time to apply.

After careful consideration of all applications, we regret to inform you that we are unable to offer you a place in this cohort. We received an exceptional number of strong applications this year, making the selection process extremely competitive.

We encourage you to continue developing your projects and skills. Many of our current fellows applied multiple times before being accepted.

We wish you all the best in your future endeavors.

Sincerely,
The Pareto Team`
  },
  custom: {
    subject: "",
    body: ""
  }
};

const CommunicationDialog = ({
  application,
  open,
  onOpenChange,
}: CommunicationDialogProps) => {
  const [templateType, setTemplateType] = useState("interview");
  const [emailSubject, setEmailSubject] = useState(emailTemplates.interview.subject);
  const [emailBody, setEmailBody] = useState(emailTemplates.interview.body);
  const [emailHistory, setEmailHistory] = useState<{date: string; type: string; subject: string}[]>([]);

  if (!application) return null;

  // Format name from firstName and lastName if available, otherwise use name
  const firstName = application.firstName || application.name.split(" ")[0];
  const fullName = application.firstName && application.lastName
    ? `${application.firstName} ${application.lastName}`
    : application.name;

  const handleTemplateChange = (value: string) => {
    setTemplateType(value);
    const template = emailTemplates[value as keyof typeof emailTemplates];
    
    // Replace placeholders with actual values
    let processedSubject = template.subject;
    let processedBody = template.body;
    
    processedBody = processedBody.replace(/\{firstName\}/g, firstName);
    
    setEmailSubject(processedSubject);
    setEmailBody(processedBody);
  };

  const handleSendEmail = () => {
    // In a real app, this would send an actual email
    // For this demo, we'll just simulate it and add to history
    
    const now = new Date();
    setEmailHistory(prev => [
      {
        date: now.toISOString(),
        type: templateType,
        subject: emailSubject
      },
      ...prev
    ]);
    
    toast.success(`Email sent to ${application.email}`);
    // Optional: close dialog after sending
    // onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Email Communication: {fullName}</span>
            <DialogClose className="h-6 w-6 rounded-md border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-700">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email composition section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-400 w-20">Template:</label>
                  <Select value={templateType} onValueChange={handleTemplateChange}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="interview">Interview Request</SelectItem>
                      <SelectItem value="additional_info">Request Additional Info</SelectItem>
                      <SelectItem value="acceptance">Acceptance</SelectItem>
                      <SelectItem value="rejection">Rejection</SelectItem>
                      <SelectItem value="custom">Custom Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-400 w-20">To:</label>
                  <div className="flex-1 bg-zinc-900 rounded-md px-3 py-2 border border-zinc-700">
                    {application.email}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-400 w-20">Subject:</label>
                  <Textarea 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="flex-1 bg-zinc-900 border-zinc-700 text-white resize-none h-8 py-1"
                  />
                </div>
              </div>
              
              <Textarea 
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[300px] bg-zinc-900 border-zinc-700 text-white"
                placeholder="Email body..."
              />
            </div>
            
            {/* Email history section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Communication History</h3>
              <div className="bg-zinc-900 rounded-md border border-zinc-700 p-2 h-[350px] overflow-y-auto">
                {emailHistory.length > 0 ? (
                  <div className="space-y-2">
                    {emailHistory.map((email, idx) => (
                      <div key={idx} className="p-2 border-b border-zinc-700 last:border-none">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Send className="h-3 w-3 text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-gray-300 line-clamp-1">
                              {email.subject}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(email.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-400 capitalize ml-5">
                            {email.type.replace('_', ' ')} template
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    No previous communications
                  </div>
                )}
              </div>

              <div className="bg-zinc-900 rounded-md border border-zinc-700 p-3">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Candidate Status</h4>
                <div className="flex items-center gap-2">
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === "approved" 
                        ? "bg-green-400/10 text-green-400" 
                        : application.status === "rejected"
                        ? "bg-red-400/10 text-red-400" 
                        : "bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    {application.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {application.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                    {application.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-zinc-700 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-zinc-700 text-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="pink"
            onClick={handleSendEmail}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationDialog;
