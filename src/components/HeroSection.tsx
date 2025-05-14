
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { useState } from "react";

const HeroSection = () => {
  const [videoSize, setVideoSize] = useState(0.75); // Default size ratio (0.75 = 75% of container)
  
  // Increase video size (max 1.0 = 100%)
  const increaseSize = () => setVideoSize(prev => Math.min(prev + 0.05, 1));
  
  // Decrease video size (min 0.5 = 50%)
  const decreaseSize = () => setVideoSize(prev => Math.max(prev - 0.05, 0.5));

  return <section className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-between overflow-hidden z-10">
      {/* Top part - Pareto link */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="pt-24 md:pt-24"> {/* Increased padding to account for fixed navbar */}
          <a href="https://pareto20.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white flex items-center transition-colors">
            PARETO.COM <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
      
      {/* Center content - 3D logo video */}
      <div className="flex-1 flex items-center justify-center flex-col">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`relative w-full max-w-[${Math.round(videoSize * 100)}%] aspect-square`}
          style={{ maxWidth: `${Math.round(videoSize * 100)}%` }}
        >
          {/* Video container with aspect ratio */}
          <AspectRatio ratio={1} className="w-full">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
              src="/lovable-uploads/pareto.mp4"
            />
          </AspectRatio>
        </motion.div>
        
        {/* Size controls */}
        <div className="mt-4 flex items-center space-x-3">
          <button 
            onClick={decreaseSize}
            className="text-white/70 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/50 transition-colors text-xl"
            aria-label="Decrease video size"
          >
            -
          </button>
          <button 
            onClick={increaseSize}
            className="text-white/70 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/50 transition-colors text-xl"
            aria-label="Increase video size"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Bottom part - Title and tagline in a flex container */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end pb-8 md:pb-12">
          <div>
            {/* Left aligned title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[90%] font-figtree tracking-[-0.02em]"
            >
              Pareto<br />Fellowship
            </motion.h1>
          </div>
          
          {/* Right aligned tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-right font-figtree"
          >
            <div className="text-white/80 text-lg md:text-xl">
              [ The most ambitious<br />
              undergraduate community ]
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
