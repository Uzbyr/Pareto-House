
import { motion } from "framer-motion";
import { useState } from "react";

const universities = [
  {
    name: "Stanford",
    logo: "/lovable-uploads/3297876c-3e72-4a19-b170-1e3257661239.png"
  },
  {
    name: "Berkeley",
    logo: "/lovable-uploads/2e0c0a8e-2b00-41ce-9b18-8cc17cd0d6c6.png"
  },
  {
    name: "Harvard",
    logo: "/lovable-uploads/af8f7d52-4e24-48ee-a709-b2505ca9dba9.png"
  },
  {
    name: "MIT",
    logo: "/lovable-uploads/mit.png"
  },
  {
    name: "Oxford",
    logo: "/lovable-uploads/oxford.png"
  },
  {
    name: "Cambridge",
    logo: "/lovable-uploads/cambridge.png"
  },
  {
    name: "Polytechnique",
    logo: "/lovable-uploads/polytechnique.png"
  },
  {
    name: "ETH Zurich",
    logo: "/lovable-uploads/eth.png"
  }
];

const ScrollingUniversities = () => {
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (uniName: string) => {
    console.error(`Failed to load image for ${uniName}`);
    setImageLoadErrors(prev => ({
      ...prev,
      [uniName]: true
    }));
  };

  return (
    <div className="relative overflow-hidden py-10">
      <div className="flex animate-[scroll_20s_linear_infinite] space-x-16">
        {universities.concat(universities).map((uni, index) => (
          <div
            key={`${uni.name}-${index}`}
            className="flex items-center justify-center h-16"
          >
            <img
              src={uni.logo}
              alt={`${uni.name} logo`}
              onError={() => handleImageError(uni.name)}
              className={`h-full w-auto object-contain opacity-50 hover:opacity-100 transition-opacity ${
                imageLoadErrors[uni.name] ? 'hidden' : ''
              }`}
            />
            {imageLoadErrors[uni.name] && (
              <div className="text-xs text-white/50">{uni.name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingUniversities;
