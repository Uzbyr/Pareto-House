
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Save, Lock } from "lucide-react";
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
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const FellowProfile = () => {
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    refreshProfile,
  } = useProfile();
  const { user, session, changePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
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

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    isStrong: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
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

  // Check password strength
  useEffect(() => {
    const { newPassword } = passwordData;
    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    // Calculate score
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    // Password is strong if it meets at least 4 criteria
    const isStrong = score >= 4;

    setPasswordStrength({
      score,
      isStrong,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    });
  }, [passwordData.newPassword]);

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

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
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

      // Make sure university is included in the type definition
      const dataToUpdate: Partial<typeof profile & { university: string }> = {
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!passwordStrength.isStrong) {
      toast.error("Please create a stronger password");
      return;
    }

    setPasswordLoading(true);
    try {
      const success = await changePassword(passwordData.newPassword);
      
      if (success) {
        toast.success("Password changed successfully");
        // Reset the form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing your password");
      console.error("Password change error:", error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`;
    }
    return user?.email ? user.email[0].toUpperCase() : "P";
  };

  // Progress bar color based on strength
  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score === 3) return "bg-yellow-500";
    return "bg-green-500";
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
          <TabsTrigger value="security">Security</TabsTrigger>
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

        <TabsContent value="security">
          <Card className="bg-zinc-800 border-zinc-700 p-6">
            <h3 className="text-xl font-medium text-white mb-6">Change Password</h3>
            
            <form onSubmit={handleChangePassword} className="max-w-md space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="bg-zinc-800 border-zinc-700 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-zinc-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="bg-zinc-800 border-zinc-700 pr-10"
                    required
                  />
                </div>

                {/* Password strength meter */}
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Password strength</span>
                      <span
                        className={
                          passwordStrength.isStrong
                            ? "text-green-500"
                            : "text-yellow-500"
                        }
                      >
                        {passwordStrength.score > 0
                          ? `${passwordStrength.score}/5`
                          : "Very weak"}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-700 rounded">
                      <div
                        className={`h-full rounded ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>

                    <ul className="mt-3 space-y-1 text-xs">
                      <li
                        className={`flex items-center ${passwordStrength.hasMinLength ? "text-green-400" : "text-zinc-400"}`}
                      >
                        <div className="mr-1">
                          {passwordStrength.hasMinLength ? "✓" : "○"}
                        </div>
                        At least 8 characters
                      </li>
                      <li
                        className={`flex items-center ${passwordStrength.hasUppercase ? "text-green-400" : "text-zinc-400"}`}
                      >
                        <div className="mr-1">
                          {passwordStrength.hasUppercase ? "✓" : "○"}
                        </div>
                        Uppercase letter (A-Z)
                      </li>
                      <li
                        className={`flex items-center ${passwordStrength.hasLowercase ? "text-green-400" : "text-zinc-400"}`}
                      >
                        <div className="mr-1">
                          {passwordStrength.hasLowercase ? "✓" : "○"}
                        </div>
                        Lowercase letter (a-z)
                      </li>
                      <li
                        className={`flex items-center ${passwordStrength.hasNumber ? "text-green-400" : "text-zinc-400"}`}
                      >
                        <div className="mr-1">
                          {passwordStrength.hasNumber ? "✓" : "○"}
                        </div>
                        Number (0-9)
                      </li>
                      <li
                        className={`flex items-center ${passwordStrength.hasSpecial ? "text-green-400" : "text-zinc-400"}`}
                      >
                        <div className="mr-1">
                          {passwordStrength.hasSpecial ? "✓" : "○"}
                        </div>
                        Special character (!@#$%^&*...)
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
                {passwordData.newPassword &&
                  passwordData.confirmPassword &&
                  passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                disabled={
                  passwordLoading ||
                  !passwordStrength.isStrong ||
                  passwordData.newPassword !== passwordData.confirmPassword
                }
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing Password...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-sm text-zinc-500">
              <p className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-zinc-400" />
                Your password is securely stored and encrypted
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FellowProfile;
