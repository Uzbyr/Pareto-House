
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    name: "Oxford",
    logo: "/lovable-uploads/06213398-3d3d-4ec2-a70f-62f3daa88e87.png"
  },
  {
    name: "Polytechnique",
    logo: "/lovable-uploads/f7ee5c26-25b3-4372-986c-7491cbabc323.png"
  },
  {
    name: "Caltech",
    logo: "/lovable-uploads/4862da00-6b20-4aef-be8d-545282be5203.png"
  },
  {
    name: "CentraleSupelec",
    logo: "/lovable-uploads/00898750-1228-442b-a5e9-602fcbc9e19c.png"
  },
  {
    name: "Columbia",
    logo: "/lovable-uploads/1a47ecb9-067b-488b-bb66-f81cdf1508b2.png"
  },
  {
    name: "MIT",
    logo: "/lovable-uploads/69c9668d-654a-47ff-a45a-f9257955aab3.png"
  },
  {
    name: "Princeton",
    logo: "/lovable-uploads/36e958d6-20f5-4981-ab4f-23e535ca6dc9.png"
  }
];

const ScrollingUniversities = () => {
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (uniName: string) => {
    console.error(`Failed to load image for ${uniName}`);
    setImageLoadErrors(prev => ({
      ...prev,
      [uniName]: true
    }));
  };

  const handleImageLoad = (uniName: string) => {
    console.log(`Successfully loaded image for ${uniName}`);
    setLoadedImages(prev => ({
      ...prev,
      [uniName]: true
    }));
    // When an image loads successfully, make sure to remove any error state
    setImageLoadErrors(prev => ({
      ...prev,
      [uniName]: false
    }));
  };

  return (
    <div className="relative overflow-hidden py-10">
      <div className="flex animate-[scroll_20s_linear_infinite] space-x-16">
        {universities.concat(universities).map((uni, index) => {
          console.log(`Rendering ${uni.name} logo from path: ${uni.logo}`);
          return (
            <div
              key={`${uni.name}-${index}`}
              className="flex items-center justify-center h-28 min-w-[128px]"
            >
              <img
                src={uni.logo}
                alt={`${uni.name} logo`}
                onError={() => handleImageError(uni.name)}
                onLoad={() => handleImageLoad(uni.name)}
                className={`h-[85%] w-auto object-contain hover:opacity-80 transition-opacity ${
                  imageLoadErrors[uni.name] ? 'hidden' : ''
                }`}
              />
              {imageLoadErrors[uni.name] && (
                <div className="text-xs text-white/50">{uni.name}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingUniversities;
