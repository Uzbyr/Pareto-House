
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface VideoUrlInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoUrlInput: React.FC<VideoUrlInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="video_url">Video Presentation URL</Label>
      <Input
        id="video_url"
        name="video_url"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700"
        placeholder="https://youtube.com/... or https://vimeo.com/..."
      />
    </div>
  );
};

export default VideoUrlInput;
