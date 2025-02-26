import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    name: "Cambridge",
    logo: "/lovable-uploads/ee78082f-9f7f-4f89-b847-a6ca23730af6.png"
  },
  {
    name: "Polytechnique",
    logo: "/lovable-uploads/23696d54-df61-4849-b11d-672c211d8645.png"
  },
  {
    name: "TUT",
    logo: "/lovable-uploads/1e82e7c3-b0d7-46c2-9617-e71656983faf.png"
  },
  {
    name: "HEC Paris",
    logo: "/lovable-uploads/d6f46fa9-133c-482c-9601-30f374bbda05.png"
  },
  {
    name: "McGill",
    logo: "/lovable-uploads/b2dd29a3-1b1c-49fe-ad5f-45516ea2329d.png"
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
  },
  {
    name: "ETH Zurich",
    logo: "/lovable-uploads/87b0149e-15e2-4871-ba97-bbf9c6f06da9.png"
  },
  {
    name: "ENS",
    logo: "/lovable-uploads/a73516a2-47d3-4690-b3a0-53742c3d4fe2.png"
  },
  {
    name: "LSE",
    logo: "/lovable-uploads/55b7a62f-2ce9-4125-9193-e07f7d4dd935.png"
  },
  {
    name: "UCL",
    logo: "/lovable-uploads/2e41b636-d255-447a-b501-8233d5c5ed39.png"
  },
  {
    name: "ESSEC",
    logo: "/lovable-uploads/d632a680-9cfd-42ca-977b-de196318580c.png"
  }
];

const ScrollingUniversities = () => {
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    setImageLoadErrors(prev => ({
      ...prev,
      [uniName]: false
    }));
  };

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
  };

  return (
    <div className="relative overflow-hidden py-10">
      <ScrollArea 
        className="w-full"
        onMouseEnter={handleInteraction}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteraction}
        onTouchEnd={handleInteractionEnd}
      >
        <div 
          ref={scrollContainerRef}
          className={`flex space-x-16 ${isAutoScrolling ? 'animate-[scroll_40s_linear_infinite]' : ''}`}
        >
          {universities.concat(universities).map((uni, index) => (
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
                } ${uni.name === 'Polytechnique' ? 'brightness-[175%] contrast-125' : ''}
                  ${uni.name === 'Stanford' ? 'brightness-125' : ''}`}
              />
              {imageLoadErrors[uni.name] && (
                <div className="text-xs text-white/50">{uni.name}</div>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-black/10 dark:bg-white/10" />
      </ScrollArea>
    </div>
  );
};

export default ScrollingUniversities;
