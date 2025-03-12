
import React from "react";
import { Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface CompetitionTabProps {
  application: Application;
}

const CompetitionTab = ({ application }: CompetitionTabProps) => {
  return (
    <div className="bg-zinc-900 rounded-md p-4 space-y-3">
      {application.hasCompetitionExperience && (
        <div>
          <span className="text-sm text-gray-400">Competition Experience:</span>
          <p className="text-white">{application.hasCompetitionExperience}</p>
        </div>
      )}
      {application.competitionResults && application.competitionResults.length > 0 && (
        <div>
          <span className="text-sm text-gray-400">Competition Results:</span>
          <ul className="mt-1 space-y-1">
            {application.competitionResults.map((result, index) => (
              <li key={index} className="text-white">• {result}</li>
            ))}
          </ul>
        </div>
      )}
      {application.competitiveProfiles && application.competitiveProfiles.length > 0 && (
        <div>
          <span className="text-sm text-gray-400">Competitive Profiles:</span>
          <ul className="mt-1 space-y-1">
            {application.competitiveProfiles.map((profile, index) => (
              <li key={index}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                  onClick={() => window.open(profile, '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  View Profile {index + 1}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompetitionTab;
