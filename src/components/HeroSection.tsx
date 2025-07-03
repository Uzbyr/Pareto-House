import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PageContainer from "./PageContainer";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

// Add CSS styles for responsive positioning
const styles = `
  .laptop-video-container {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    transform: translateY(-8rem) !important;
  }
  
  .desktop-video-container {
    padding-top: 6rem !important;
    padding-bottom: 6rem !important;
    transform: translateY(0) !important;
  }
  
  .laptop-text-container {
    transform: translateY(-6rem) !important;
  }
  
  .desktop-text-container {
    transform: translateY(0) !important;
  }
`;

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inject CSS styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Calculate responsive values based on viewport
  const getVideoSize = () => {
    const vw = windowWidth;
    const vh = window.innerHeight;
    const minDimension = Math.min(vw, vh);
    if (vw < 640) {
      return Math.min(400, Math.max(250, minDimension * 0.7));
    } else if (vw < 1024) {
      // Smaller video on laptop
      return Math.min(420, Math.max(300, minDimension * 0.45));
    } else {
      return Math.min(700, Math.max(400, minDimension * 0.5));
    }
  };

  const getTitleSize = (isMobile: boolean) => {
    const vw = windowWidth;
    if (isMobile) {
      // Slightly smaller for mobile
      return vw < 480 ? 26 : 30;
    } else {
      // Slightly smaller for desktop
      return vw < 1024 ? 60 : 70;
    }
  };

  const getLocationSize = (isMobile: boolean) => {
    const vw = windowWidth;
    
    if (isMobile) {
      // Mobile: fixed sizes
      return vw < 480 ? 16 : 18;
    } else {
      // Desktop: larger on bigger screens
      return vw < 1024 ? 20 : 28;
    }
  };

  const getTaglineSize = (isMobile: boolean) => {
    const vw = windowWidth;
    
    if (isMobile) {
      // Mobile: fixed sizes
      return vw < 480 ? 14 : 16;
    } else {
      // Desktop: larger on bigger screens
      return vw < 1024 ? 18 : 24;
    }
  };

  return (
    <section className="w-full bg-black h-screen flex flex-col relative mb-20">
      {/* Top part - Pareto link */}
      <PageContainer>
        <div className="pt-24 md:pt-24">
          <a href="https://pareto20.com" target="_blank" rel="noopener noreferrer" className="text-[17px] text-[#828282] hover:text-white flex items-center transition-colors">
            PARETO20.COM <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </PageContainer>

      {/* Centered video */}
      <div
        className={
          windowWidth >= 640 && windowWidth < 1024
            ? 'flex items-center justify-center h-[320px]' // fixed height on laptop
            : 'flex-1 flex items-center justify-center' // flex-1 elsewhere
        }
        style={
          windowWidth >= 640 && windowWidth < 1024
            ? { marginBottom: '2rem' }
            : {}
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            width: `${getVideoSize()}px`,
            height: `${getVideoSize()}px`,
          }}
          className="relative"
        >
          <div className="w-full h-full flex items-center justify-center">
            {!videoLoaded && (
              <Skeleton className="absolute inset-0 bg-zinc-800/50 w-full h-full rounded-xl" />
            )}
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-contain transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="/lovable-uploads/pareto-logo.mp4"
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
        </motion.div>
      </div>

      {/* Paris, FRANCE absolutely centered horizontally */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{ fontSize: `${getLocationSize(false)}px` }}
          className="font-medium text-white/70 text-center"
        >
          Paris, FRANCE
        </motion.div>
      </div>

      {/* Bottom text block */}
      <div
        className={
          windowWidth >= 640 && windowWidth < 1024
            ? 'absolute bottom-0 left-0 w-full pb-2 px-4'
            : 'relative w-full pb-6 px-4'
        }
      >
        <PageContainer>
          {/* Mobile layout: title and tagline stacked vertically */}
          <div className="sm:hidden flex flex-col items-center gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ fontSize: `${getTitleSize(true)}px` }}
              className="font-semibold text-white tracking-tight leading-[87%] font-figtree tracking-[-0.02em] mb-1"
            >
              Pareto<br />House
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="font-figtree"
            >
              <div
                style={{ fontSize: '14px' }}
                className="text-[#828282] text-center"
              >
                [ The hacker house<br />for grinders and hustlers ]
              </div>
            </motion.div>
          </div>

          {/* Desktop layout: title and tagline side by side */}
          <div className="hidden sm:flex w-full justify-between items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontSize: `${getTitleSize(false)}px` }}
                className="font-semibold text-white tracking-tight leading-[83%] font-figtree tracking-[-0.02em]"
              >
                Pareto<br />House
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-right font-figtree"
            >
              <div
                style={{ fontSize: '20px' }}
                className="text-[#828282]"
              >
                [ The hacker house<br />for grinders and hustlers ]
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </div>

      {/* Separator line */}
      <Separator className="bg-[#222222] h-[1px] w-full absolute bottom-0 left-0" />
    </section>
  );
};

export default HeroSection;
