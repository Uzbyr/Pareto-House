
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for handling file uploads to Supabase storage
 */
const useFileUpload = () => {
  const uploadFile = async (
    file: File,
    path: string,
  ): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw new Error(uploadError.message);
      }

      return filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  
  return { uploadFile };
};

export default useFileUpload;
