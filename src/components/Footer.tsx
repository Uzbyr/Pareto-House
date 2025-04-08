
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Lock } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className="bg-pareto-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <Link to="/">
              <img src="/logo.png" alt="Pareto Logo" className="w-36 md:w-44" />
            </Link>
          </div>

          <div className="mb-6 md:mb-0">
            <Link
              to="/login"
              className="flex items-center text-sm text-white/60 hover:text-pareto-pink transition-colors duration-300"
            >
              <Lock className="h-3.5 w-3.5 mr-1.5" />
              Login
            </Link>
          </div>

          <div className="flex gap-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
