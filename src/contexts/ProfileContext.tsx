
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  university: string | null;
  major: string | null;
  graduation_year: string | null;
  preparatory_classes: string | null;
  student_societies: string | null;
  building_company: string | null;
  company_context: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  github_url: string | null;
  profile_picture_url: string | null;
  country: string | null;
  nationality: string | null;
  bio: string | null;
  onboarding_completed: boolean;
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

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
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
      // Use a generic query approach that doesn't rely on type checking
      const { data, error: queryError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
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
      
      // Use a generic query approach that doesn't rely on type checking
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session.user.id);

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
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
