
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-[47px] min-h-16">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* PF Logo */}
          <div className="w-[120px] flex items-center">
            <Link to="/" className="shrink-0">
              <img 
                src="/lovable-uploads/1d46541f-98d8-45eb-86ac-7c2f7227058a.png" 
                alt="Pareto Fellowship" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow flex justify-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <Link
                to="/"
                className={`text-[17px] font-figtree font-medium transition-colors ${
                  isActive("/") ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                ABOUT
              </Link>
              <Link
                to="/mentors"
                className={`text-[17px] font-figtree font-medium transition-colors ${
                  isActive("/mentors") ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                MENTORS
              </Link>
              <Link
                to="/faq"
                className={`text-[17px] font-figtree font-medium transition-colors ${
                  isActive("/faq") ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Apply Now Button */}
            <div className="w-[140px] flex justify-end">
              <Link
                to="/apply"
                className="group hidden md:inline-flex items-center gap-2 px-6 py-2 whitespace-nowrap text-white border border-white hover:bg-white/10 transition-colors duration-300 text-[15px] font-figtree font-medium"
              >
                APPLY NOW
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
