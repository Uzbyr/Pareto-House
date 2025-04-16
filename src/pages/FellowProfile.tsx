
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/contexts/ProfileContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Edit,
  Save,
  User,
  Globe,
  Briefcase,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import FellowProfileDetails from "@/components/fellows/FellowProfileDetails";
import { Fellow } from "@/types/fellow";

const FellowProfile = () => {
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    refreshProfile,
  } = useProfile();
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

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
      });
    }
  }, [profile]);

  // Convert profile to Fellow type for the shared component
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture || !session)
      return profile?.profile_picture_url || null;

    try {
      const fileExtension = profilePicture.name.split(".").pop() || "";
      const filePath = `users/${session.user.id}/${Date.now()}.${fileExtension}`;

      const { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, profilePicture);

      if (uploadError) {
        toast.error("Failed to upload profile picture");
        console.error("Error uploading file:", uploadError);
        return profile?.profile_picture_url || null;
      }

      const { data: urlData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in profile picture upload:", error);
      return profile?.profile_picture_url || null;
    }
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
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : profile?.profile_picture_url || ""
                  }
                  alt={`${profile?.first_name} ${profile?.last_name}`}
                />
                <AvatarFallback className="bg-zinc-700 text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center">
                <Label
                  htmlFor="picture"
                  className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Upload size={16} />
                  Change Profile Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">
                  Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600 min-h-[120px]"
                    placeholder="Tell others a bit about yourself"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      onChange={handleInputChange}
                      value={formData.nationality}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium text-white">Education</h3>

                <div>
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="graduation_year">Graduation Year</Label>
                    <Input
                      id="graduation_year"
                      name="graduation_year"
                      value={formData.graduation_year}
                      onChange={handleInputChange}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">
                  Competition Experience
                </h3>
                
                <div>
                  <Label htmlFor="competition_results">Competition Results</Label>
                  <Textarea
                    id="competition_results"
                    name="competition_results"
                    value={formData.competition_results}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600 min-h-[120px]"
                    placeholder="Share your competition achievements"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Competitive Profiles</Label>
                  {formData.competitive_profiles.map((profile, index) => (
                    <div key={index} className="flex mb-2">
                      <Input
                        value={profile}
                        onChange={(e) => handleCompetitiveProfileChange(index, e.target.value)}
                        className="bg-zinc-700 border-zinc-600 flex-1"
                        placeholder="https://codeforces.com/profile/username"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeCompetitiveProfile(index)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addCompetitiveProfile}
                    className="mt-2"
                  >
                    Add Profile
                  </Button>
                </div>

                <h3 className="text-lg font-medium text-white">
                  Additional Information
                </h3>

                <div>
                  <Label htmlFor="preparatory_classes">
                    Preparatory Classes
                  </Label>
                  <Input
                    id="preparatory_classes"
                    name="preparatory_classes"
                    value={formData.preparatory_classes}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div>
                  <Label htmlFor="student_societies">Student Societies</Label>
                  <Input
                    id="student_societies"
                    name="student_societies"
                    value={formData.student_societies}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div>
                  <Label htmlFor="building_company">Building Company</Label>
                  <Input
                    id="building_company"
                    name="building_company"
                    value={formData.building_company}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div>
                  <Label htmlFor="company_context">Company Context</Label>
                  <Input
                    id="company_context"
                    name="company_context"
                    value={formData.company_context}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <h3 className="text-lg font-medium text-white">Social Links</h3>

                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>

                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <Label htmlFor="x_url">X (Twitter) URL</Label>
                  <Input
                    id="x_url"
                    name="x_url"
                    value={formData.x_url}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                    placeholder="https://x.com/yourusername"
                  />
                </div>

                <div>
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
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
