import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import PageContainer from "./PageContainer";
import { Skeleton } from "./ui/skeleton";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [logoLoaded, setLogoLoaded] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSmoothScroll = (elementId: string) => {
    // Only perform smooth scroll if we're on the homepage
    if (location.pathname === "/") {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-[47px] min-h-16">
      <PageContainer className="py-3">
        <div className="flex justify-between items-center">
          {/* PH Logo Text */}
          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <span className="text-white font-black text-4xl md:text-5xl tracking-tight italic" style={{ fontFamily: 'Futura, "Futura Extra Black", Arial, sans-serif' }}>
                PH
              </span>
            </Link>
          </div>

          {/* Navigation Links - centered on all screen sizes */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-9">
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => handleSmoothScroll("about-section")}
                  className={`text-[17px] font-figtree font-medium transition-colors text-[#828282] hover:text-white`}
                >
                  ABOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`text-[17px] font-figtree font-medium transition-colors ${
                    isActive("/") ? "text-white" : "text-[#828282] hover:text-white"
                  }`}
                >
                  ABOUT
                </Link>
              </>
            )}
            <Link
              to="/faq"
              className={`text-[17px] font-figtree font-medium transition-colors ${
                isActive("/faq") ? "text-white" : "text-[#828282] hover:text-white"
              }`}
            >
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Navigation */}
            <MobileNav />

            {/* Apply Now Button */}
            <div className="hidden md:block">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 px-6 py-2 whitespace-nowrap text-white border border-white hover:bg-white/10 transition-colors duration-300 text-[17px] font-figtree font-medium"
              >
                APPLY NOW
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </nav>
  );
};

export default Navigation;
