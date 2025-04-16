
import { Separator } from "@/components/ui/separator";

interface AboutSectionProps {
  about: string | null;
}

const AboutSection = ({ about }: AboutSectionProps) => {
  if (!about) return null;
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">About</h3>
      <p className="text-gray-300 whitespace-pre-wrap">{about}</p>
    </div>
  );
};

export default AboutSection;
