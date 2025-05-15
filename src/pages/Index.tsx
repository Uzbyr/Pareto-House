
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import FellowshipPerks from "../components/FellowshipPerks";
import ScrollingMentors from "../components/ScrollingMentors";
import FinalCTA from "../components/FinalCTA";
// import TopInvestors from "../components/TopInvestors";
import Navigation from "../components/Navigation";
import BackedUndergrads from "../components/BackedUndergrads";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import MentorSection from "../components/MentorSection";
import PageContainer from "../components/PageContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-black dark:text-white font-figtree">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Content that will scroll over the hero section */}
      <div className="relative z-20 mt-[70vh] md:mt-[80vh] lg:mt-[100vh]"> {/* Adjusted margin based on hero height */}
        {/* About Section */}
        <div className="bg-black">
          <AboutSection />
        </div>
        
        {/* Fellowship Perks Section */}
        <div className="bg-black">
          <FellowshipPerks />
        </div>

        {/* Mentor Section */}
        <div className="bg-black">
          <MentorSection />
        </div>

        {/* Backed Undergrads Section */}
        <div className="bg-black">
          <BackedUndergrads />
        </div>

        {/* Final CTA Section */}
        <div className="bg-black">
          <FinalCTA />
        </div>

        {/* Footer */}
        <div className="bg-black">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
