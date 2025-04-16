
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Mail } from "lucide-react";
import { Linkedin } from 'lucide-react';
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";

interface SocialLinksProps {
  linkedinUrl: string | null;
  githubUrl: string | null;
  xUrl: string | null;
  websiteUrl: string | null;
  email: string | null;
}

const SocialLinks = ({
  linkedinUrl,
  githubUrl,
  xUrl,
  websiteUrl,
  email,
}: SocialLinksProps) => {
  if (!linkedinUrl && !githubUrl && !xUrl && !websiteUrl && !email) {
    return null;
  }

  return (
    <>
      <Separator className="bg-zinc-700 my-4" />
      <div>
        <h3 className="text-lg font-medium mb-2">Connect</h3>
        <div className="flex flex-wrap gap-3">
          {email && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
              asChild
            >
              <a href={`mailto:${email}`} rel="noopener noreferrer">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          )}
          
          {linkedinUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
              asChild
            >
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          )}
          
          {githubUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <SiGithub className="w-5 h-5" />
              </a>
            </Button>
          )}
          
          {xUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
              asChild
            >
              <a href={xUrl} target="_blank" rel="noopener noreferrer">
                <SiX className="w-5 h-5" />
              </a>
            </Button>
          )}
          
          {websiteUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-700 hover:bg-zinc-600 border-zinc-600 p-2"
              asChild
            >
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SocialLinks;
