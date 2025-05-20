
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import PageContainer from "./PageContainer";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <PageContainer>
        {isMobile ? (
          // Mobile footer layout (centered)
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Logo */}
            <Link to="/" className="mb-2">
              <img 
                src="/lovable-uploads/f814efb1-f197-4cb1-9aa9-4a4d5a56fd26.png"
                alt="Pareto Logo" 
                className="w-32"
              />
            </Link>
            
            {/* Tagline */}
            <div className="text-xl font-medium text-white">
              <a 
                href="https://www.youtube.com/watch?v=lc8ourcIe10" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                Build brutally or don't
              </a>
            </div>
            
            {/* Social links */}
            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://www.linkedin.com/company/pareto-fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/paretoholdings"
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
              >
                X
              </a>
            </div>
            
            {/* Login button */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 text-white"
            >
              LOG IN <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          // Desktop/medium screen layout (horizontal)
          <div className="flex items-center justify-between">
            {/* Left section with logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="mb-4">
                <img 
                  src="/lovable-uploads/f814efb1-f197-4cb1-9aa9-4a4d5a56fd26.png"
                  alt="Pareto Logo" 
                  className="w-32"
                />
              </Link>
            </div>
            
            {/* Middle section with tagline and social links */}
            <div className="flex flex-col items-center">
              <div className="text-xl font-medium text-white mb-4">
                <a 
                  href="https://www.youtube.com/watch?v=lc8ourcIe10" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors"
                >
                  Build brutally or don't
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.linkedin.com/company/pareto-fellowship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/paretoholdings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
                >
                  X
                </a>
              </div>
            </div>
            
            {/* Right section with login */}
            <div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 text-white"
              >
                LOG IN <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </PageContainer>
    </footer>
  );
};

export default Footer;
