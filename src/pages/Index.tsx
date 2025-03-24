
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import ScrollingUniversities from "../components/ScrollingUniversities";
import FellowshipPerks from "../components/FellowshipPerks";
import ScrollingMentors from "../components/ScrollingMentors";
import FinalCTA from "../components/FinalCTA";
import TopInvestors from "../components/TopInvestors";
import Navigation from "../components/Navigation";
import BackedUndergrads from "../components/BackedUndergrads";
import { Hero } from "../components/ui/hero";
import { BackgroundPaths } from "../components/ui/background-paths";

const Index = () => {
  const navigate = useNavigate();
  const handleAdminLogin = () => {
    navigate("/admin/login");
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <Navigation />

      {/* Hero Section with Background Paths */}
      <div className="relative min-h-[80vh]">
        <BackgroundPaths 
          title="Pareto Fellowship" 
          buttonText="Discover Excellence"
          buttonLink="/apply"
          showButton={false}
        />
        
        <Hero
          title={
            <div>
              <div className="text-pareto-pink mb-8 tracking-tight relative inline-block">
                The Pareto Fellowship
                <span className="hover-underline-animation"></span>
              </div>
              <div className="mb-6 tracking-tight leading-tight inline-block">
                The Most Ambitious{" "}
                <span className="title-hover text-pareto-pink relative inline-block">
                  Undergraduate
                  <span className="hover-underline-animation"></span>
                </span>{" "}
                Community
              </div>
            </div>
          }
          subtitle="Join a community of the top 0.1% of STEM undergrads worldwide, access unparalleled opportunities, and accelerate your path to the top of the tech ecosystem."
          actions={[
            {
              label: "Apply Now",
              href: "/apply",
              variant: "pink",
            },
            {
              label: "About Pareto",
              href: "https://pareto20.com?ref=pareto-fellowship",
              variant: "outline",
            },
          ]}
          actionsClassName="mt-8 mb-20"
        />
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20">
          {[
            {
              number: "50",
              label: "Fellows Per Batch",
            },
            {
              number: "30+",
              label: "Universities",
            },
            {
              number: "$100K",
              label: "Potential Check",
            },
            {
              number: "50+",
              label: "Tech Partners",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pareto-pink mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-black/60 dark:text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Universities Section */}
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden py-10 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 rounded-lg mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-pareto-black dark:via-transparent dark:to-pareto-black z-10 pointer-events-none" />
          <h2 className="text-sm uppercase tracking-widest mb-6 text-pareto-pink text-center relative z-20">
            UNIVERSITY ECOSYSTEM
          </h2>
          <ScrollingUniversities />
        </div>
      </div>

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

      {/* Top Investors Section */}
      <div className="container mx-auto px-4">
        <TopInvestors />
      </div>

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

      {/* Admin Login Button */}
      <div className="border-t border-black/10 dark:border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink"
              onClick={handleAdminLogin}
            >
              <Lock className="w-4 h-4 mr-2" />
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
