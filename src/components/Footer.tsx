import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pareto-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <Link to="/">
              <img
                src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
                alt="Pareto Logo"
                className="w-36 md:w-44"
              />
            </Link>
          </div>

          <div className="mb-6 md:mb-0">
            <a
              href="https://www.youtube.com/watch?v=lc8ourcIe10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-pareto-pink transition-colors duration-300"
            >
              Build brutally or don't
            </a>
          </div>

          <div className="flex gap-6">
            <div className="flex gap-4">
              <a
                href="https://twitter.com/ParetoCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/pareto-fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/pareto_fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pareto-pink transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
