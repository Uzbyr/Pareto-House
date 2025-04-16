
import { Separator } from "@/components/ui/separator";
import { Award, Medal, ExternalLink } from "lucide-react";

interface CompetitionSectionProps {
  competitionResults: string | null;
  competitiveProfiles: string[] | null;
}

const CompetitionSection = ({ 
  competitionResults, 
  competitiveProfiles 
}: CompetitionSectionProps) => {
  if (!competitionResults && (!competitiveProfiles || competitiveProfiles.length === 0)) {
    return null;
  }
  
  return (
    <>
      {competitionResults && (
        <>
          <Separator className="bg-zinc-700 my-4" />
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-pareto-pink" />
              Competition Results
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap">{competitionResults}</p>
          </div>
        </>
      )}
      
      {competitiveProfiles && competitiveProfiles.length > 0 && (
        <>
          <Separator className="bg-zinc-700 my-4" />
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Medal className="h-5 w-5 text-pareto-pink" />
              Competitive Profiles
            </h3>
            <ul className="space-y-2">
              {competitiveProfiles.map((profile, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                  <a 
                    href={profile.startsWith('http') ? profile : `https://${profile}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {profile}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default CompetitionSection;
