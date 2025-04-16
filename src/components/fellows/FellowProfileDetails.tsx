
import { Fellow } from "@/types/fellow";
import ProfileHeader from "./profile/ProfileHeader";
import AboutSection from "./profile/AboutSection";
import CompetitionSection from "./profile/CompetitionSection";
import SocialLinks from "./profile/SocialLinks";

interface FellowProfileDetailsProps {
  fellow: Fellow;
  isCompact?: boolean;
}

const FellowProfileDetails = ({ fellow, isCompact = false }: FellowProfileDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProfileHeader
        firstName={fellow.first_name}
        lastName={fellow.last_name}
        profilePictureUrl={fellow.profile_picture_url}
        major={fellow.major}
        university={fellow.university}
        highSchool={fellow.high_school}
        graduationYear={fellow.graduation_year}
        nationality={fellow.nationality}
        videoUrl={fellow.video_url}
      />
      
      <div className="md:col-span-2 space-y-4">
        <AboutSection about={fellow.about} />
        
        <CompetitionSection
          competitionResults={fellow.competition_results}
          competitiveProfiles={fellow.competitive_profiles}
        />
        
        <SocialLinks
          linkedinUrl={fellow.linkedin_url}
          githubUrl={fellow.github_url}
          xUrl={fellow.x_url}
          websiteUrl={fellow.website_url}
        />
      </div>
    </div>
  );
};

export default FellowProfileDetails;
