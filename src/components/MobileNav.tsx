
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
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    } else if (sectionId === "faq") {
      // If on homepage, navigate to FAQ page
      window.location.href = "/faq";
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="md:hidden">
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
        <div className="fixed inset-0 top-16 bg-black/90 backdrop-blur-[47px] z-50 flex flex-col p-6">
          <div className="flex flex-col gap-8 items-center mt-12">
            <button
              onClick={() => isHomePage ? scrollToSection("about-section") : window.location.href = "/"}
              className={`text-[17px] font-figtree font-medium ${
                isActive("/") ? "text-white" : "text-[#828282]"
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => isHomePage ? scrollToSection("mentor-section") : window.location.href = "/mentors"}
              className={`text-[17px] font-figtree font-medium ${
                isActive("/mentors") ? "text-white" : "text-[#828282]"
              }`}
            >
              MENTORS
            </button>
            <Link
              to="/faq"
              className={`text-[17px] font-figtree font-medium ${
                isActive("/faq") ? "text-white" : "text-[#828282]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            
            {/* Mobile Apply Now Button */}
            <Link
              to="/apply"
              className="mt-6 whitespace-nowrap inline-flex items-center gap-2 px-6 py-2 text-white border border-white hover:bg-white/10 transition-colors text-[17px] font-figtree font-medium"
              onClick={() => setIsOpen(false)}
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
