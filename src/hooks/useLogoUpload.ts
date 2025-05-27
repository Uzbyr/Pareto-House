
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseLogoUploadReturn {
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  uploadLogo: () => Promise<string | null>;
  isUploading: boolean;
}

export const useLogoUpload = (): UseLogoUploadReturn => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    setIsUploading(true);
    try {
      const fileExt = logoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `company-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, logoFile);

      if (uploadError) {
        console.error("Error uploading logo:", uploadError);
        toast.error("Failed to upload logo");
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("logos")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in logo upload:", error);
      toast.error("Failed to upload logo");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    logoFile,
    setLogoFile,
    uploadLogo,
    isUploading,
  };
};
