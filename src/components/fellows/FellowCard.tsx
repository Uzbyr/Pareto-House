
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fellow } from "@/types/fellow";
import { SiGithub} from "@icons-pack/react-simple-icons";
import { Linkedin } from 'lucide-react';

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
      className="overflow-hidden transition-all duration-300 hover:border-pareto-pink border-zinc-700 bg-zinc-800 cursor-pointer rounded-lg" // Reduced roundness
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
              </svg>
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FellowCard;
