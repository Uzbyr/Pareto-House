
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const uploadProfilePicture = async (
  profilePicture: File, 
  sessionUserId: string
): Promise<string | null> => {
  if (!profilePicture) return null;

  try {
    const fileExtension = profilePicture.name.split(".").pop() || "";
    const filePath = `users/${sessionUserId}/${Date.now()}.${fileExtension}`;

    const { error: uploadError, data } = await supabase.storage
      .from("profiles")
      .upload(filePath, profilePicture);

    if (uploadError) {
      toast.error("Failed to upload profile picture");
      console.error("Error uploading file:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in profile picture upload:", error);
    return null;
  }
};
