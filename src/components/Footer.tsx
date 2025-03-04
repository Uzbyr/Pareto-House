
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/5 dark:bg-white/5 py-12 border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <img
              src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
              alt="Pareto Logo"
              className="w-36 md:w-44"
            />
          </div>
          
          <div className="mb-6 md:mb-0">
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300"
            >
              Build brutally or don't
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/ParetoCommunity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/pareto-fellowship" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/pareto_fellowship" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex gap-4">
              <Link to="/terms" className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
