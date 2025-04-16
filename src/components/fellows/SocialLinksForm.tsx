import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

interface SocialLinksFormData {
  email: string;
  linkedin_url: string;
  github_url: string;
  x_url: string;
  website_url: string;
}

const SocialLinksForm = () => {
  const { profile, updateProfile } = useProfile();
  const { control, handleSubmit } = useForm<SocialLinksFormData>({
    defaultValues: {
      email: profile?.email || "",
      linkedin_url: profile?.linkedin_url || "",
      github_url: profile?.github_url || "",
      x_url: profile?.x_url || "",
      website_url: profile?.website_url || "",
    },
  });

  const onSubmit = async (data: SocialLinksFormData) => {
    await updateProfile({
      linkedin_url: data.linkedin_url,
      github_url: data.github_url,
      x_url: data.x_url,
      website_url: data.website_url,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center space-x-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  type="email" 
                  placeholder="Enter your email" 
                  readOnly
                  className="flex-grow bg-zinc-800 border-zinc-700"
                />
              )}
            />
            {profile?.email && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                onClick={() => window.location.href = `mailto:${profile.email}`}
              >
                <Mail className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="linkedin_url">LinkedIn</Label>
          <Controller
            name="linkedin_url"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="LinkedIn profile URL" 
                className="bg-zinc-800 border-zinc-700"
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="github_url">GitHub</Label>
          <Controller
            name="github_url"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="GitHub profile URL" 
                className="bg-zinc-800 border-zinc-700"
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="x_url">X (Twitter)</Label>
          <Controller
            name="x_url"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="X profile URL" 
                className="bg-zinc-800 border-zinc-700"
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="website_url">Personal Website</Label>
          <Controller
            name="website_url"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Your personal website URL" 
                className="bg-zinc-800 border-zinc-700"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="pink">Save Changes</Button>
      </div>
    </form>
  );
};

export default SocialLinksForm;
