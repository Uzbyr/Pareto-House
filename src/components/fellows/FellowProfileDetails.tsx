
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Briefcase, GraduationCap, School, MapPin, Globe, Award, Medal, Video } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Twitter } from 'lucide-react';
import { Fellow } from "@/types/fellow";

interface FellowProfileDetailsProps {
  fellow: Fellow;
  isCompact?: boolean;
}

const FellowProfileDetails = ({ fellow, isCompact = false }: FellowProfileDetailsProps) => {
  const getInitials = (firstName: string | null, lastName: string | null): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  const getFullName = () => {
    return `${fellow.first_name || ""} ${fellow.last_name || ""}`;
  };

  const getEducationInfo = () => {
    if (fellow.university) {
      return (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-400" />
          <span>{fellow.university}</span>
          {fellow.graduation_year && <span className="text-gray-400">· Class of {fellow.graduation_year}</span>}
        </div>
      );
    } else if (fellow.high_school) {
      return (
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-gray-400" />
          <span>{fellow.high_school}</span>
          {fellow.graduation_year && <span className="text-gray-400">· Class of {fellow.graduation_year}</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center py-4">
        <Avatar className="h-32 w-32 mb-4 border-2 border-pareto-pink rounded-full overflow-hidden">
          {fellow.profile_picture_url ? (
            <AvatarImage
              src={fellow.profile_picture_url}
              alt={getFullName()}
              className="object-cover w-full h-full"
            />
          ) : (
            <AvatarFallback className="bg-zinc-700 text-white text-3xl">
              {getInitials(fellow.first_name, fellow.last_name)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <h2 className="text-2xl font-bold text-white mb-2">{getFullName()}</h2>
        
        {fellow.major && (
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span>{fellow.major}</span>
          </div>
        )}
        
        {getEducationInfo()}

        {fellow.video_url && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4 bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
            asChild
          >
            <a href={fellow.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Presentation Video
            </a>
          </Button>
        )}
      </div>
      
      <div className="md:col-span-2 space-y-4">
        {fellow.about && (
          <div>
            <h3 className="text-lg font-medium mb-2">About</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{fellow.about}</p>
          </div>
        )}
        
        {/* Competition Results Section */}
        {fellow.competition_results && (
          <>
            <Separator className="bg-zinc-700 my-4" />
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-pareto-pink" />
                Competition Results
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap">{fellow.competition_results}</p>
            </div>
          </>
        )}
        
        {/* Competitive Profiles Section */}
        {fellow.competitive_profiles && fellow.competitive_profiles.length > 0 && (
          <>
            <Separator className="bg-zinc-700 my-4" />
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Medal className="h-5 w-5 text-pareto-pink" />
                Competitive Profiles
              </h3>
              <ul className="space-y-2">
                {fellow.competitive_profiles.map((profile, index) => (
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
        
        <Separator className="bg-zinc-700 my-4" />
        
        {(fellow.linkedin_url || fellow.github_url || fellow.website_url || fellow.x_url) && (
          <div>
            <h3 className="text-lg font-medium mb-2">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {fellow.linkedin_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
                  asChild
                >
                  <a href={fellow.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
              )}
              
              {fellow.github_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
                  asChild
                >
                  <a href={fellow.github_url} target="_blank" rel="noopener noreferrer">
                    <SiGithub className="w-5 h-5" />
                  </a>
                </Button>
              )}
              
              {fellow.x_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
                  asChild
                >
                  <a href={fellow.x_url} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5" />
                  </a>
                </Button>
              )}
              
              {fellow.website_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
                  asChild
                >
                  <a href={fellow.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FellowProfileDetails;
