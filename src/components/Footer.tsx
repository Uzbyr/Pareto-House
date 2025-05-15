
import { Link } from "react-router-dom";
import { Linkedin, ArrowRight } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
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
                src="/lovable-uploads/1d46541f-98d8-45eb-86ac-7c2f7227058a.png"
                alt="Pareto Logo" 
                className="w-48"
              />
            </Link>
            
            {/* Tagline */}
            <div className="text-xl font-medium text-white mb-10">
              Build brutally or don't
            </div>
            
            {/* Social links */}
            <div className="flex items-center justify-center space-x-6 mb-8">
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
                  src="/lovable-uploads/1d46541f-98d8-45eb-86ac-7c2f7227058a.png"
                  alt="Pareto Logo" 
                  className="w-48"
                />
              </Link>
            </div>
            
            {/* Middle section with tagline */}
            <div className="text-xl font-medium text-white">
              Build brutally or don't
            </div>
            
            {/* Right section with social links and login */}
            <div className="flex items-center space-x-7">
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
