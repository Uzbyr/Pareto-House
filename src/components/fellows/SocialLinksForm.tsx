
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLinksFormProps {
  formData: {
    linkedin_url: string;
    github_url: string;
    x_url: string;
    website_url: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SocialLinksForm = ({
  formData,
  handleInputChange,
}: SocialLinksFormProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-white">Social Links</h3>

      <div>
        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
        <Input
          id="linkedin_url"
          name="linkedin_url"
          value={formData.linkedin_url}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>

      <div>
        <Label htmlFor="github_url">GitHub URL</Label>
        <Input
          id="github_url"
          name="github_url"
          value={formData.github_url}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div>
        <Label htmlFor="x_url">X (Twitter) URL</Label>
        <Input
          id="x_url"
          name="x_url"
          value={formData.x_url}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
          placeholder="https://x.com/yourusername"
        />
      </div>

      <div>
        <Label htmlFor="website_url">Website URL</Label>
        <Input
          id="website_url"
          name="website_url"
          value={formData.website_url}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
          placeholder="https://yourwebsite.com"
        />
      </div>
    </>
  );
};

export default SocialLinksForm;
