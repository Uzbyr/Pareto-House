import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageContainer from "./PageContainer";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="w-full bg-black flex flex-col justify-between min-h-[90vh]">
      {/* Top part - Pareto link */}
      <PageContainer>
        <div className="pt-24 md:pt-24"> {/* Increased padding to account for fixed navbar */}
          <a href="https://pareto20.com" target="_blank" rel="noopener noreferrer" className="text-[17px] text-[#828282] hover:text-white flex items-center transition-colors">
            PARETO20.COM <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </PageContainer>
      
      {/* Center content - 3D logo video */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          //className="relative w-96 h-96 md:w-[400px] md:h-[400px]"
          className="relative w-96 h-96 md:w-[28%] md:h-[28%]"
                  >
          {/* Video with loading state */}
          <div className="w-full h-full flex items-center justify-center">
            {!videoLoaded && (
              <Skeleton className="absolute inset-0 bg-zinc-800/50 w-full h-full rounded-xl" />
            )}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="/lovable-uploads/pareto-logo.mp4"
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Bottom part - Title and tagline in a flex container */}
      <PageContainer>
        {/* Mobile layout: title and tagline stacked vertically */}
        <div className="md:hidden flex flex-col pb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.7 }} 
            className="text-[55px] font-semibold text-white tracking-tight leading-[87%] font-figtree tracking-[-0.02em] mb-6"
          >
            Pareto<br />House
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.7 }} 
            className="font-figtree"
          >
            <div className="text-[19px] text-[#828282]">
              [ The hacker house<br />
              for grinders and hustlers ]
            </div>
          </motion.div>
        </div>
        
        {/* Desktop layout: title and tagline side by side */}
        <div className="hidden md:flex justify-between items-end pb-12">
          <div>
            {/* Left aligned title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.7 }} 
              className="text-[70px] font-semibold text-white tracking-tight leading-[83%] font-figtree tracking-[-0.02em]"
            >
              Pareto<br />House
            </motion.h1>
          </div>
          
          {/* Right aligned tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.7 }} 
            className="text-right font-figtree"
          >
            <div className="text-[19px] text-[#828282]">
            [ The hacker house<br />
              for grinders and hustlers ]
            </div>
          </motion.div>
        </div>
      </PageContainer>
      
      {/* Separator line */}
      <Separator className="bg-[#222222] h-[1px] w-full" />
    </section>
  );
};

export default HeroSection;
