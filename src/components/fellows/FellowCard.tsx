
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fellow } from "@/types/fellow";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Linkedin, Globe } from 'lucide-react';

interface FellowCardProps {
  fellow: Fellow;
  onClick: (fellow: Fellow) => void;
}

const FellowCard = ({ fellow, onClick }: FellowCardProps) => {
  const getInitials = (
    firstName: string | null,
    lastName: string | null,
  ): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };
  
  const getFullName = () => {
    const firstName = fellow.first_name || "";
    const lastInitial = fellow.last_name ? `${fellow.last_name.charAt(0)}.` : "";
    return `${firstName} ${lastInitial}`;
  };
  
  const getEducationInfo = () => {
    if (!fellow.university && !fellow.high_school) return null;
    
    const schoolName = fellow.university || fellow.high_school;
    const shortSchoolName = schoolName ? shortenSchoolName(schoolName) : "";
    const gradYear = fellow.graduation_year ? `'${fellow.graduation_year.slice(-2)}` : "";
    
    return `${shortSchoolName} ${gradYear}`;
  };
  
  const shortenSchoolName = (name: string | null) => {
    if (!name) return "";
    
    const abbreviations: {[key: string]: string} = {
      "Massachusetts Institute of Technology": "MIT",
      "Cambridge University": "Camb",
      "Princeton University": "Prince",
      "Harvard University": "Harvard",
      "Stanford University": "Stanford",
      "University of Oxford": "Oxford",
      "Yale University": "Yale",
      "Columbia University": "Columbia",
      "University of California": "UC",
      "University of Pennsylvania": "UPenn",
      "University of Chicago": "UChicago",
      "University of Tokyo": "UTokyo",
      "University of Jagiellonian": "UJ",
    };
    
    for (const [fullName, abbrev] of Object.entries(abbreviations)) {
      if (name.includes(fullName)) {
        return abbrev;
      }
    }
    
    const parts = name.split(' ');
    if (parts[0] === "University" && parts.length > 1) {
      return `U${parts[1].charAt(0)}`;
    }
    return name.length > 5 ? name.substring(0, 5) : name;
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:border-pareto-pink border-zinc-700 bg-zinc-800 cursor-pointer rounded-lg"
      onClick={() => onClick(fellow)}
    >
      <div className="flex flex-col items-center p-4">
        <Avatar className="h-20 w-20 mb-3 border-2 border-pareto-pink">
          {fellow.profile_picture_url ? (
            <AvatarImage
              src={fellow.profile_picture_url}
              alt={`${fellow.first_name || ''} ${fellow.last_name || ''}`}
            />
          ) : (
            <AvatarFallback className="bg-zinc-700 text-white text-xl">
              {getInitials(fellow.first_name, fellow.last_name)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-0.5">
            {getFullName()}
          </h3>
          {getEducationInfo() && (
            <p className="text-sm text-gray-300 mb-0.5">
              {getEducationInfo()}
            </p>
          )}
          {fellow.major && (
            <p className="text-sm text-gray-400">
              {fellow.major}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 p-3 pt-0 mb-1">
        {fellow.linkedin_url && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-zinc-700 hover:bg-zinc-600"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={fellow.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </Button>
        )}
        {fellow.github_url && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-zinc-700 hover:bg-zinc-600"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={fellow.github_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="w-5 h-5 text-white" />
            </a>
          </Button>
        )}
        {fellow.x_url && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-zinc-700 hover:bg-zinc-600"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={fellow.x_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiX className="h-5 w-5 text-white" />
            </a>
          </Button>
        )}
        {fellow.website_url && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-zinc-700 hover:bg-zinc-600"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={fellow.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-5 w-5 text-white" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FellowCard;
