
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FellowProfileDetails from "@/components/fellows/FellowProfileDetails";
import { Fellow } from "@/types/fellow";
import ProfilePictureUpload from "@/components/fellows/ProfilePictureUpload";
import { useProfilePictureUpload } from "@/hooks/useProfilePictureUpload";

// Import reusable onboarding components
import AboutTextarea from "@/components/onboarding/about/AboutTextarea";
import UniversitySelect from "@/components/onboarding/education/UniversitySelect";
import MajorInput from "@/components/onboarding/education/MajorInput";
import GraduationYearSelect from "@/components/onboarding/education/GraduationYearSelect";
import HighSchoolInput from "@/components/onboarding/education/HighSchoolInput";
import StudentSocietiesTextarea from "@/components/onboarding/education/StudentSocietiesTextarea";
import PreparatoryClassesSelect from "@/components/onboarding/education/PreparatoryClassesSelect";
import CompetitionSection from "@/components/onboarding/education/CompetitionSection";
import LinkedInInput from "@/components/onboarding/online-presence/LinkedInInput";
import VideoUrlInput from "@/components/onboarding/online-presence/VideoUrlInput";
import SocialProfileInputs from "@/components/onboarding/online-presence/SocialProfileInputs";
import CompetitiveProfiles from "@/components/onboarding/online-presence/CompetitiveProfiles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FellowProfile = () => {
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    refreshProfile,
  } = useProfile();
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Using session?.user.id instead of user.id
  const { profilePicture, setProfilePicture, uploadProfilePicture } = 
    useProfilePictureUpload(session?.user?.id, profile?.profile_picture_url);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    university: "",
    otherUniversity: "",
    major: "",
    graduation_year: "",
    education_level: "university",
    high_school: "",
    preparatory_classes: "",
    student_societies: "",
    building_company: "",
    company_context: "",
    country: "",
    nationality: "",
    website_url: "",
    linkedin_url: "",
    github_url: "",
    x_url: "",
    about: "",
    competition_results: "",
    category_of_interest: "",
    has_competition_experience: "",
    competitive_profiles: [] as string[],
    video_url: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        university: profile.university || "",
        otherUniversity: "",
        major: profile.major || "",
        graduation_year: profile.graduation_year || "",
        education_level: profile.education_level || "university",
        high_school: profile.high_school || "",
        preparatory_classes: profile.preparatory_classes || "",
        student_societies: profile.student_societies || "",
        building_company: profile.building_company || "",
        company_context: profile.company_context || "",
        country: profile.country || "",
        nationality: profile.nationality || "",
        website_url: profile.website_url || "",
        linkedin_url: profile.linkedin_url || "",
        github_url: profile.github_url || "",
        x_url: profile.x_url || "",
        about: profile.about || "",
        competition_results: profile.competition_results || "",
        category_of_interest: profile.category_of_interest || "",
        has_competition_experience: profile.has_competition_experience || "",
        competitive_profiles: profile.competitive_profiles || [],
        video_url: profile.video_url || "",
      });
    }
  }, [profile]);

  const profileAsFellow = profile ? {
    id: profile.id || "",
    first_name: profile.first_name,
    last_name: profile.last_name,
    university: profile.university,
    high_school: profile.high_school,
    major: profile.major,
    graduation_year: profile.graduation_year,
    profile_picture_url: profilePicture 
      ? URL.createObjectURL(profilePicture) 
      : profile.profile_picture_url,
    linkedin_url: profile.linkedin_url,
    github_url: profile.github_url,
    website_url: profile.website_url,
    about: profile.about,
    competition_results: profile.competition_results,
    competitive_profiles: profile.competitive_profiles,
    video_url: profile.video_url,
    x_url: profile.x_url,
  } as Fellow : null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompetitiveProfileChange = (index: number, value: string) => {
    const updatedProfiles = [...formData.competitive_profiles];
    updatedProfiles[index] = value;
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: updatedProfiles,
    }));
  };

  const addCompetitiveProfile = () => {
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: [...prev.competitive_profiles, ""],
    }));
  };

  const removeCompetitiveProfile = (index: number) => {
    const updatedProfiles = [...formData.competitive_profiles];
    updatedProfiles.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: updatedProfiles,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let pictureUrl = profile?.profile_picture_url || null;
      if (profilePicture) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) {
          pictureUrl = uploadedUrl;
        }
      }

      const dataToUpdate = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        education_level: formData.education_level,
        major: formData.major,
        graduation_year: formData.graduation_year,
        country: formData.country,
        nationality: formData.nationality,
        video_url: formData.video_url,
        linkedin_url: formData.linkedin_url,
        github_url: formData.github_url,
        x_url: formData.x_url,
        website_url: formData.website_url,
        profile_picture_url: pictureUrl,
        high_school: formData.high_school,
        category_of_interest: formData.category_of_interest,
        has_competition_experience: formData.has_competition_experience,
        competition_results: formData.competition_results,
        student_societies: formData.student_societies,
        preparatory_classes: formData.preparatory_classes,
        competitive_profiles: formData.competitive_profiles,
        about: formData.about,
      };

      // Handle university field separately
      if (formData.university === "Other" && formData.otherUniversity) {
        dataToUpdate.university = formData.otherUniversity;
      } else {
        dataToUpdate.university = formData.university;
      }

      await updateProfile(dataToUpdate);
      setProfilePicture(null);
      toast.success("Profile updated successfully");
      await refreshProfile();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`;
    }
    return user?.email ? user.email[0].toUpperCase() : "P";
  };

  // Get list of universities for the select component
  const universities = [
    "MIT",
    "Harvard",
    "Stanford",
    "Berkeley",
    "Cambridge University",
    "Princeton University",
    "University of Pennsylvania",
    "Oxford University",
    "Yale University",
    "Other"
  ];

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
        <span className="ml-2 text-white">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellow Profile</h1>
        <p className="text-gray-400 mt-2">
          View and edit your profile information
        </p>
      </div>

      <Tabs defaultValue="view" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <Card className="bg-zinc-800 border-zinc-700 p-6">
            {profileAsFellow && <FellowProfileDetails fellow={profileAsFellow} />}
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card className="bg-zinc-800 border-zinc-700 p-6">
            <ProfilePictureUpload 
              profilePictureUrl={profile?.profile_picture_url || null}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              firstName={profile?.first_name}
              lastName={profile?.last_name}
              getInitials={getInitials}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-zinc-700 pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>

                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>

                <AboutTextarea value={formData.about} onChange={handleInputChange} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      onChange={handleInputChange}
                      value={formData.nationality}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>

                {/* Education Section */}
                <h3 className="text-lg font-medium text-white border-b border-zinc-700 pb-2 mt-8">Education</h3>
                
                <UniversitySelect 
                  university={formData.university}
                  otherUniversity={formData.otherUniversity}
                  onSelectUniversity={(value) => handleSelectChange("university", value)}
                  onOtherUniversityChange={handleInputChange}
                  universities={universities}
                />

                <div className="grid grid-cols-2 gap-4">
                  <MajorInput value={formData.major} onChange={handleInputChange} />
                  <GraduationYearSelect 
                    value={formData.graduation_year}
                    onValueChange={(value) => handleSelectChange("graduation_year", value)} 
                  />
                </div>

                <HighSchoolInput value={formData.high_school} onChange={handleInputChange} />
                
                <StudentSocietiesTextarea 
                  value={formData.student_societies} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Competition Section */}
                <h3 className="text-lg font-medium text-white border-b border-zinc-700 pb-2">Competition Experience</h3>
                
                <CompetitionSection 
                  categoryOfInterest={formData.category_of_interest}
                  hasCompetitionExperience={formData.has_competition_experience}
                  competitionResults={formData.competition_results}
                  onSelectChange={handleSelectChange}
                  onInputChange={handleInputChange}
                />

                <CompetitiveProfiles
                  profiles={formData.competitive_profiles}
                  onAdd={addCompetitiveProfile}
                  onChange={handleCompetitiveProfileChange}
                  onRemove={removeCompetitiveProfile}
                />

                {/* Online Presence Section */}
                <h3 className="text-lg font-medium text-white border-b border-zinc-700 pb-2 mt-8">Online Presence</h3>
                
                <VideoUrlInput value={formData.video_url} onChange={handleInputChange} />
                
                <SocialProfileInputs
                  xUrl={formData.x_url}
                  githubUrl={formData.github_url}
                  linkedinUrl={formData.linkedin_url}
                  websiteUrl={formData.website_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FellowProfile;
