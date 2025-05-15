
import { Link } from "react-router-dom";
import { Linkedin, Lock } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import PageContainer from "./PageContainer";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <footer className="bg-pareto-black py-12 border-t border-white/10">
      <PageContainer>
        {/* Main footer content with three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and tagline */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-4">
              <img src="/logo.png" alt="Pareto Logo" className="w-36" />
            </Link>
            <a
              href="https://www.youtube.com/watch?v=lc8ourcIe10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-pareto-pink transition-colors duration-300"
            >
              Build brutally or don't
            </a>
          </div>
          
          {/* Column 2: Navigation links */}
          <div className="grid grid-cols-2 gap-2">
            <Link to="/" className="text-white/60 hover:text-pareto-pink transition-colors duration-300">
              Home
            </Link>
            <Link to="/mentors" className="text-white/60 hover:text-pareto-pink transition-colors duration-300">
              Mentors
            </Link>
            <Link to="/perks" className="text-white/60 hover:text-pareto-pink transition-colors duration-300">
              Perks
            </Link>
            <Link to="/faq" className="text-white/60 hover:text-pareto-pink transition-colors duration-300">
              FAQ
            </Link>
            <Link to="/apply" className="text-white/60 hover:text-pareto-pink transition-colors duration-300">
              Apply
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-pareto-pink justify-start p-0 h-auto"
              onClick={handleLogin}
            >
              <Lock className="w-3.5 h-3.5 mr-1.5" />
              Login
            </Button>
          </div>
          
          {/* Column 3: Social links */}
          <div className="flex flex-col items-start md:items-end">
            <div className="text-sm text-white/60 mb-3">Connect with us</div>
            <div className="flex gap-4">
              <a
                href="https://x.com/paretoholdings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/pareto-fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white/40 mb-4 md:mb-0">
            © {new Date().getFullYear()} Pareto Fellowship. All rights reserved.
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
