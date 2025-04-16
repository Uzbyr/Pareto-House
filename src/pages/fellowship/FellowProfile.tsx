
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
import PersonalInfoForm from "@/components/fellows/PersonalInfoForm";
import EducationForm from "@/components/fellows/EducationForm";
import CompetitionForm from "@/components/fellows/CompetitionForm";
import AdditionalInfoForm from "@/components/fellows/AdditionalInfoForm";
import SocialLinksForm from "@/components/fellows/SocialLinksForm";
import { useProfilePictureUpload } from "@/hooks/useProfilePictureUpload";

const FellowProfile = () => {
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    refreshProfile,
  } = useProfile();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { profilePicture, setProfilePicture, uploadProfilePicture } = 
    useProfilePictureUpload(user?.id, profile?.profile_picture_url);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    university: "",
    major: "",
    graduation_year: "",
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
    competitive_profiles: [] as string[],
    video_url: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        university: profile.university || "",
        major: profile.major || "",
        graduation_year: profile.graduation_year || "",
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

      await updateProfile({
        ...formData,
        profile_picture_url: pictureUrl,
      });

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <PersonalInfoForm 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                />

                <EducationForm 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="space-y-6">
                <CompetitionForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCompetitiveProfileChange={handleCompetitiveProfileChange}
                  addCompetitiveProfile={addCompetitiveProfile}
                  removeCompetitiveProfile={removeCompetitiveProfile}
                />

                <AdditionalInfoForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                <SocialLinksForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
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
