
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ProfilePictureUploadProps {
  profilePictureUrl: string | null;
  profilePicture: File | null;
  setProfilePicture: (file: File | null) => void;
  firstName?: string | null;
  lastName?: string | null;
  getInitials: () => string;
}

const ProfilePictureUpload = ({
  profilePictureUrl,
  profilePicture,
  setProfilePicture,
  firstName,
  lastName,
  getInitials,
}: ProfilePictureUploadProps) => {
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <Avatar className="w-32 h-32 mb-4">
        <AvatarImage
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : profilePictureUrl || ""
          }
          alt={`${firstName} ${lastName}`}
        />
        <AvatarFallback className="bg-zinc-700 text-2xl">
          {getInitials()}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center">
        <Label
          htmlFor="picture"
          className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Upload size={16} />
          Change Profile Picture
        </Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
