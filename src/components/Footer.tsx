
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import PageContainer from "./PageContainer";

const Footer = () => {
  return (
    <footer className="bg-pareto-black py-12 border-t border-white/10">
      <PageContainer>
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="mb-6">
            <img src="/logo.png" alt="Pareto Logo" className="w-36 md:w-44" />
          </Link>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-8 mb-8 text-white/60">
            <Link to="/" className="hover:text-pareto-pink transition-colors duration-300">
              Home
            </Link>
            <Link to="/mentors" className="hover:text-pareto-pink transition-colors duration-300">
              Mentors
            </Link>
            <Link to="/perks" className="hover:text-pareto-pink transition-colors duration-300">
              Perks
            </Link>
            <Link to="/faq" className="hover:text-pareto-pink transition-colors duration-300">
              FAQ
            </Link>
            <Link to="/apply" className="hover:text-pareto-pink transition-colors duration-300">
              Apply
            </Link>
          </div>
          
          {/* Tagline */}
          <a
            href="https://www.youtube.com/watch?v=lc8ourcIe10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-pareto-pink transition-colors duration-300 mb-8"
          >
            Build brutally or don't
          </a>
          
          {/* Social Links */}
          <div className="flex gap-6 mb-8">
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
            {false && (
              <a
                href="https://www.instagram.com/pareto_fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Pareto Fellowship. All rights reserved.
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
