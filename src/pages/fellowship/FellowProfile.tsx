
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FellowProfileDetails from "@/components/fellows/FellowProfileDetails";
import { Fellow } from "@/types/fellow";
import EditProfileForm from "@/components/fellows/EditProfileForm";
import SecurityTab from "@/components/fellows/SecurityTab";

const FellowProfile = () => {
  const {
    profile,
    loading: profileLoading,
  } = useProfile();
  const { user } = useAuth();

  const profileAsFellow = profile ? {
    id: profile.id || "",
    first_name: profile.first_name,
    last_name: profile.last_name,
    university: profile.university,
    high_school: profile.high_school,
    major: profile.major,
    graduation_year: profile.graduation_year,
    profile_picture_url: profile.profile_picture_url,
    linkedin_url: profile.linkedin_url,
    github_url: profile.github_url,
    website_url: profile.website_url,
    about: profile.about,
    competition_results: profile.competition_results,
    competitive_profiles: profile.competitive_profiles,
    video_url: profile.video_url,
    x_url: profile.x_url,
    nationality: profile.nationality
  } : null;

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
            <EditProfileForm />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FellowProfile;
