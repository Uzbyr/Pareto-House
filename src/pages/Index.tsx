
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
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

const Index = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-figtree">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Fellowship Perks Section */}
      <FellowshipPerks />

      {/* Scrolling Mentors Banner */}
      <div className="py-20 bg-white dark:bg-pareto-black border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4">
          <ScrollingMentors />
        </div>
      </div>

      {/* Backed Undergrads Section */}
      <BackedUndergrads />

      {/*
      <div className="container mx-auto px-4">
        <TopInvestors />
      </div>
      */}

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

      {/* Login Button */}
      <div className="border-t border-black/10 dark:border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink"
              onClick={handleLogin}
            >
              <Lock className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
