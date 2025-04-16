
import { useState } from "react";
import { uploadProfilePicture as uploadPicture } from "@/utils/fileUpload";

interface UseProfilePictureUploadReturn {
  profilePicture: File | null;
  setProfilePicture: (file: File | null) => void;
  uploadProfilePicture: () => Promise<string | null>;
}

export const useProfilePictureUpload = (
  userId?: string,
  existingPictureUrl?: string | null
): UseProfilePictureUploadReturn => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture || !userId) {
      return existingPictureUrl || null;
    }

    try {
      const uploadedUrl = await uploadPicture(profilePicture, userId);
      return uploadedUrl || null;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return existingPictureUrl || null;
    }
  };

  return {
    profilePicture,
    setProfilePicture,
    uploadProfilePicture,
  };
};
