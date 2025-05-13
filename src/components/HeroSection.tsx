
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] bg-black flex flex-col justify-between overflow-hidden mt-16">
      {/* Top part - Pareto link */}
      <PageContainer>
        <div className="pt-8">
          <a href="https://pareto20.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white flex items-center transition-colors">
            PARETO.COM <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </PageContainer>
      
      {/* Center content - 3D logo placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          {/* This is a placeholder for the 3D logo/video */}
          <div className="w-full h-full flex items-center justify-center">
            <img 
              alt="Pareto Fellowship 3D Logo" 
              className="max-w-full max-h-full object-contain" 
              src="/lovable-uploads/5907cdd5-ce88-499f-8e60-cd4184dfb58f.png" 
            />
          </div>
        </motion.div>
      </div>
      
      {/* Bottom part - Title and tagline in a flex container */}
      <PageContainer>
        <div className="flex justify-between items-end pb-8 md:pb-12">
          <div>
            {/* Left aligned title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.7 }} 
              className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[75%] font-figtree tracking-[-0.02em]"
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
      </PageContainer>
    </section>
  );
};

export default HeroSection;
