import React from "react";
import { FileText, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface DocumentsTabProps {
  application: Application;
  secureUrls: Record<string, string>;
}

const DocumentsTab = ({ application, secureUrls }: DocumentsTabProps) => {
  return (
    <div className="bg-zinc-900 rounded-md p-4 space-y-3">
      {application.resumeFile && (
        <div>
          <span className="text-sm text-gray-400">Resume:</span>
          <div className="mt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
              onClick={() => window.open(secureUrls["resume"], "_blank")}
              disabled={!secureUrls["resume"]}
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
              onClick={() => window.open(secureUrls["deck"], "_blank")}
              disabled={!secureUrls["deck"]}
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
              onClick={() => window.open(secureUrls["memo"], "_blank")}
              disabled={!secureUrls["memo"]}
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
              onClick={() => window.open(application.videoUrl, "_blank")}
            >
              <Video className="h-4 w-4 mr-2" />
              Watch Video
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      )}
      {!application.resumeFile &&
        !application.deckFile &&
        !application.memoFile &&
        !application.videoUrl && (
          <p className="text-gray-400 italic">No documents uploaded</p>
        )}
    </div>
  );
};

export default DocumentsTab;
