
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  companyLogoUrl?: string;
}

const LogoUpload = ({ logoFile, setLogoFile, companyLogoUrl }: LogoUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setLogoFile(file);
    }
  };

  const removeSelectedFile = () => {
    setLogoFile(null);
  };

  return (
    <div className="space-y-2">
      <FormLabel>Company Logo</FormLabel>
      <div className="space-y-3">
        {logoFile ? (
          <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{logoFile.name}</p>
                <p className="text-xs text-gray-400">
                  {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeSelectedFile}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-2">
              Upload company logo (optional)
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-zinc-800 border border-zinc-600 rounded-md hover:bg-zinc-700"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
        
        <Input 
          placeholder="Or enter logo URL directly" 
          value={companyLogoUrl || ""} 
          readOnly 
        />
      </div>
    </div>
  );
};

export default LogoUpload;
