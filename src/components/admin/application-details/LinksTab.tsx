
import React from "react";
import { Globe, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface LinksTabProps {
  application: Application;
}

const LinksTab = ({ application }: LinksTabProps) => {
  return (
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
      {application.githubUrl && (
        <div>
          <span className="text-sm text-gray-400">GitHub:</span>
          <div className="mt-1">
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
              onClick={() => window.open(application.githubUrl, '_blank')}
            >
              <Globe className="h-4 w-4 mr-2" />
              GitHub Profile
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      )}
      {!application.websiteUrl && !application.linkedinUrl && !application.xUrl && !application.githubUrl && (
        <p className="text-gray-400 italic">No external links provided</p>
      )}
    </div>
  );
};

export default LinksTab;
