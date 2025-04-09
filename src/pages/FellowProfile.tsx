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

const FellowProfile = () => {
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    refreshProfile,
  } = useProfile();
  const { user, session } = useAuth();
  const [editMode, setEditMode] = useState(false);
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
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      setEditMode(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage
                  src={profile?.profile_picture_url || ""}
                  alt={`${profile?.first_name} ${profile?.last_name}`}
                />
                <AvatarFallback className="bg-zinc-700 text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-white">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="text-gray-400 mb-2">{user?.email}</p>

              {profile?.building_company && (
                <div className="mt-2 flex items-center">
                  <Briefcase className="h-4 w-4 text-pareto-pink mr-2" />
                  <span className="text-gray-300">
                    {profile.building_company}
                  </span>
                </div>
              )}

              {profile?.university && (
                <div className="mt-2 flex items-center">
                  <Globe className="h-4 w-4 text-pareto-pink mr-2" />
                  <span className="text-gray-300">{profile.university}</span>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}

                {profile?.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}

                {profile?.x_url && (
                  <a
                    href={profile.x_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}

                {profile?.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700 p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">About Me</h2>

              <h3 className="text-lg font-medium text-white mt-6">Education</h3>
              <Separator className="my-2 bg-zinc-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-gray-400 text-sm">University</p>
                  <p className="text-gray-200">
                    {profile?.university || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Major</p>
                  <p className="text-gray-200">
                    {profile?.major || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Graduation Year</p>
                  <p className="text-gray-200">
                    {profile?.graduation_year || "Not specified"}
                  </p>
                </div>

                {profile?.preparatory_classes && (
                  <div>
                    <p className="text-gray-400 text-sm">Preparatory Classes</p>
                    <p className="text-gray-200">
                      {profile.preparatory_classes}
                    </p>
                  </div>
                )}

                {profile?.student_societies && (
                  <div>
                    <p className="text-gray-400 text-sm">Student Societies</p>
                    <p className="text-gray-200">{profile.student_societies}</p>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-medium text-white mt-6">Building</h3>
              <Separator className="my-2 bg-zinc-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-gray-400 text-sm">Building Company</p>
                  <p className="text-gray-200">
                    {profile?.building_company || "Not specified"}
                  </p>
                </div>

                {profile?.company_context && (
                  <div>
                    <p className="text-gray-400 text-sm">Company Context</p>
                    <p className="text-gray-200">{profile.company_context}</p>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-medium text-white mt-6">Location</h3>
              <Separator className="my-2 bg-zinc-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-gray-400 text-sm">Country</p>
                  <p className="text-gray-200">
                    {profile?.country || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Nationality</p>
                  <p className="text-gray-200">
                    {profile?.nationality || "Not specified"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
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
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-zinc-700 border-zinc-600 h-32"
                    placeholder="Tell us about yourself"
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
                      value={formData.nationality}
                      onChange={handleInputChange}
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
