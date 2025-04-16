
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfilePictureUpload = (userId: string | undefined, currentPictureUrl: string | null) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture || !userId)
      return currentPictureUrl;

    try {
      const fileExtension = profilePicture.name.split(".").pop() || "";
      const filePath = `users/${userId}/${Date.now()}.${fileExtension}`;

      const { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, profilePicture);

      if (uploadError) {
        toast.error("Failed to upload profile picture");
        console.error("Error uploading file:", uploadError);
        return currentPictureUrl;
      }

      const { data: urlData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in profile picture upload:", error);
      return currentPictureUrl;
    }
  };

  return {
    profilePicture,
    setProfilePicture,
    uploadProfilePicture,
  };
};
