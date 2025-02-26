
import { motion } from "framer-motion";

const universities = [
  {
    name: "Stanford",
    logo: "/lovable-uploads/stanford.png"
  },
  {
    name: "Berkeley",
    logo: "/lovable-uploads/berkeley.png"
  },
  {
    name: "Harvard",
    logo: "/lovable-uploads/harvard.png"
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
  return (
    <div className="relative overflow-hidden py-10">
      <div className="flex animate-[scroll_20s_linear_infinite] space-x-8">
        {universities.concat(universities).map((uni, index) => (
          <div
            key={`${uni.name}-${index}`}
            className="flex flex-col items-center justify-center w-32 h-32"
          >
            <div className="bg-white/10 p-4 rounded-lg w-full h-full flex items-center justify-center">
              <img
                src={uni.logo}
                alt={`${uni.name} logo`}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingUniversities;
