
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface Profile {
  building_company: string;
  category_of_interest?: string | null;
  company_context?: string | null;
  competition_results?: string | null;
  competitive_profiles?: string[] | null;
  country: string;
  deck_file?: string | null;
  education_level?: string;
  email: string;
  first_name: string;
  flagged?: boolean | null;
  github_url?: string | null;
  graduation_year: string;
  has_competition_experience?: string | null;
  high_school?: string | null;
  id?: string;
  last_name: string;
  linkedin_url?: string | null;
  major?: string | null;
  memo_file?: string | null;
  nationality: string;
  preparatory_classes?: string | null;
  resume_file?: string | null;
  status?: string;
  student_societies?: string | null;
  submission_date?: string;
  university?: string | null;
  video_url?: string | null;
  website_url?: string | null;
  x_url?: string | null;
  bio?: string | null;
  profile_picture_url?: string | null;
  profile_url?: string | null;
  onboarding_completed?: boolean;
}

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthenticated, session } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    if (!isAuthenticated || !user || !session) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fix: remove the type assertion that was causing the infinite type instantiation
      const { data, error: queryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (queryError) {
        console.error("Error fetching profile:", queryError);
        setError(new Error(queryError.message));
        return;
      }

      setProfile(data as Profile);
    } catch (err) {
      console.error("Exception fetching profile:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !session) return;

    try {
      setLoading(true);

      // Only update fields that are provided in the updates object
      // This way we avoid the TypeScript error with required fields
      const { error: updateError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", session.user.id);

      if (updateError) {
        toast.error("Failed to update profile");
        console.error("Error updating profile:", updateError);
        setError(new Error(updateError.message));
        return;
      }

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("An error occurred while updating profile");
      console.error("Exception updating profile:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    await updateProfile({ onboarding_completed: true });
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, [isAuthenticated, user]);

  const value = {
    profile,
    loading,
    error,
    updateProfile,
    completeOnboarding,
    refreshProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
