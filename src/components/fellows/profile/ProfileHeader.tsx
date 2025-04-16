
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, School, Video, Flag } from "lucide-react";
import FlagEmoji from "@/components/ui/flag-emoji";

interface ProfileHeaderProps {
  firstName: string | null;
  lastName: string | null;
  profilePictureUrl: string | null;
  major: string | null;
  university: string | null;
  highSchool: string | null;
  graduationYear: string | null;
  nationality: string | null;
  videoUrl: string | null;
}

const ProfileHeader = ({
  firstName,
  lastName,
  profilePictureUrl,
  major,
  university,
  highSchool,
  graduationYear,
  nationality,
  videoUrl,
}: ProfileHeaderProps) => {
  const getInitials = (firstName: string | null, lastName: string | null): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  const getFullName = () => {
    return `${firstName || ""} ${lastName || ""}`;
  };

  const getEducationInfo = () => {
    if (university) {
      return (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-400" />
          <span>{university}</span>
          {graduationYear && <span className="text-gray-400">· Class of {graduationYear}</span>}
        </div>
      );
    } else if (highSchool) {
      return (
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-gray-400" />
          <span>{highSchool}</span>
          {graduationYear && <span className="text-gray-400">· Class of {graduationYear}</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center py-4">
      <Avatar className="h-32 w-32 mb-4 border-2 border-pareto-pink rounded-full overflow-hidden">
        {profilePictureUrl ? (
          <AvatarImage
            src={profilePictureUrl}
            alt={getFullName()}
            className="object-cover w-full h-full"
          />
        ) : (
          <AvatarFallback className="bg-zinc-700 text-white text-3xl">
            {getInitials(firstName, lastName)}
          </AvatarFallback>
        )}
      </Avatar>
      
      <h2 className="text-2xl font-bold text-white mb-2">{getFullName()}</h2>
      
      {major && (
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{major}</span>
        </div>
      )}
      
      {getEducationInfo()}

      {/* Add nationality with flag */}
      {nationality && (
        <div className="flex items-center gap-2 mt-1">
          <Flag className="h-4 w-4 text-gray-400" />
          <FlagEmoji 
            nationality={nationality} 
            size="1.2em" 
          />
        </div>
      )}

      {videoUrl && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
          asChild
        >
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Presentation Video
          </a>
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
