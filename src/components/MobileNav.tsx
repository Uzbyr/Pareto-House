import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center md:hidden">
      <button 
        className="p-2 text-white" 
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-black/30 backdrop-blur-[47px] z-50 flex flex-col p-6">
          <div className="flex flex-col gap-8 items-center mt-12">
            <Link
              to="/"
              className={`text-[17px] font-figtree font-medium ${
                isActive("/") ? "text-white" : "text-white/80"
              }`}
              onClick={toggleMenu}
            >
              ABOUT
            </Link>
            <Link
              to="/mentors"
              className={`text-[17px] font-figtree font-medium ${
                isActive("/mentors") ? "text-white" : "text-white/80"
              }`}
              onClick={toggleMenu}
            >
              MENTORS
            </Link>
            <Link
              to="/faq"
              className={`text-[17px] font-figtree font-medium ${
                isActive("/faq") ? "text-white" : "text-white/80"
              }`}
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            
            {/* Mobile Apply Now Button */}
            <Link
              to="/apply"
              className="mt-6 whitespace-nowrap inline-flex items-center gap-2 px-6 py-2 text-white border border-white hover:bg-white/10 transition-colors text-[17px] font-figtree font-medium"
              onClick={toggleMenu}
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
