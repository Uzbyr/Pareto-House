import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Gift,
  ExternalLink,
  Check,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import BackToHomeButton from "../components/application/BackToHomeButton";
import Navigation from "../components/Navigation";

const Perks = () => {
  const { toast } = useToast();
  const { isAuthenticated, login, logout } = useAuth();
  const [claimedPerks, setClaimedPerks] = useState<Set<number>>(new Set());

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const perks = [
    {
      title: "OpenAI API Credits",
      description:
        "Access state-of-the-art language models with $5,000 in API credits",
      icon: "🤖",
      claimUrl: "https://platform.openai.com/signup",
      claimCode: "PARETO-2024-AI",
    },
    {
      title: "AWS Cloud Credits",
      description:
        "Scale your projects with $10,000 in AWS cloud computing credits",
      icon: "☁️",
      claimUrl: "https://aws.amazon.com/activate/",
      claimCode: "PARETO-AWS-2024",
    },
    {
      title: "Perplexity AI Access",
      description: "Premium access to advanced research tools worth $2,000",
      icon: "🔍",
      claimUrl: "https://www.perplexity.ai/",
      claimCode: "PARETO-PERPLEXITY",
    },
    {
      title: "Exclusive Workshops & Webinars",
      description:
        "Weekly sessions with industry experts on cutting-edge technologies",
      icon: "📚",
      claimUrl: "https://calendly.com/pareto-events",
      claimCode: null,
    },
    {
      title: "Personalized Mentorship",
      description:
        "1:1 mentoring sessions with leaders from top tech companies",
      icon: "🎯",
      claimUrl: "https://calendly.com/jules-pareto",
      claimCode: null,
    },
    {
      title: "Networking Opportunities",
      description:
        "Access to exclusive events and a network of 500+ industry professionals",
      icon: "🤝",
      claimUrl: "https://www.meetup.com/pareto-fellows/",
      claimCode: null,
    },
    {
      title: "Beta Access & Special Discounts",
      description:
        "Early access to emerging tech products and up to 80% off on premium tools",
      icon: "🎁",
      claimUrl:
        "https://pareto.notion.site/Fellow-Discounts-bd67203e4c9b4a308a9583a8a8c5d309",
      claimCode: "PARETO-FELLOWS-2024",
    },
    {
      title: "Career Development Support",
      description:
        "Comprehensive career coaching and interview preparation resources",
      icon: "💼",
      claimUrl:
        "https://pareto.notion.site/Career-Resources-2c50e2d32c5642b0a2e85bfba5a0e265",
      claimCode: null,
    },
    {
      title: "Research Funding & Stipends",
      description:
        "Up to $25,000 in funding for innovative projects and research",
      icon: "💰",
      claimUrl: "https://airtable.com/appjPD3CKLwl2MiLT/shrD46xNfXgK3KkIT",
      claimCode: null,
    },
    {
      title: "Hackathons & Innovation Challenges",
      description: "Monthly hackathons with prizes totaling $50,000+",
      icon: "🏆",
      claimUrl:
        "https://pareto.notion.site/Upcoming-Hackathons-fb784a9fb5b14d9ba0a1b02d18d3a3b7",
      claimCode: null,
    },
  ];

  const handleClaimPerk = (index: number, perk: any) => {
    if (claimedPerks.has(index)) {
      toast({
        title: "Already claimed",
        description: "You've already claimed this perk.",
        duration: 3000,
      });
      return;
    }

    window.open(perk.claimUrl, "_blank");

    const newClaimedPerks = new Set(claimedPerks);
    newClaimedPerks.add(index);
    setClaimedPerks(newClaimedPerks);

    toast({
      title: `${perk.title} claimed!`,
      description: perk.claimCode
        ? `Use code ${perk.claimCode} to redeem your benefit.`
        : "Check your email for instructions on how to access this perk.",
      duration: 5000,
    });
  };

  const handleLoginClick = () => {
    login("admin@pareto20.com", "admin123").then((success) => {
      if (success) {
        toast({
          title: "Login successful",
          description: "You are now logged in as a Pareto Fellow.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <Navigation />

      <div className="container mx-auto px-4 py-12 pt-36">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-pareto-pink" />
            <h1 className="text-4xl font-bold">House Perks</h1>
          </div>

          <p className="text-xl text-black/60 dark:text-white/60 mb-6">
            As a Pareto Fellow, you'll get access to an extensive suite of
            resources and opportunities designed to accelerate your growth and
            impact.
          </p>

          {!isAuthenticated && (
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-pareto-pink/10 to-purple-600/10 rounded-lg p-6 mb-8 border border-pareto-pink/20"
            >
              <h2 className="text-xl font-semibold mb-2">
                Not a Pareto Fellow yet?
              </h2>
              <p className="mb-4">
                These exclusive perks are available only to accepted Pareto
                Fellows. Apply to join our community of exceptional builders and
                gain access to these valuable resources.
              </p>
              <Link to="/apply">
                <Button variant="pink">
                  Apply to the House
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}

          {isAuthenticated && (
            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <p className="font-medium">
                  Need a personalized recommendation?
                </p>
                <p className="text-black/60 dark:text-white/60 text-sm">
                  Book a 1:1 meeting with Jules to discuss which perks would be
                  most valuable for your specific goals.
                </p>
              </div>
              <Button
                variant="pink"
                className="mt-2 sm:mt-0 sm:ml-auto"
                onClick={() =>
                  window.open("https://calendly.com/jules-pareto", "_blank")
                }
              >
                Book Meeting
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}

          {!isAuthenticated ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-lg border border-black/10 dark:border-white/10"
                >
                  <div className="text-4xl mb-4">{perk.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                  <p className="text-black/60 dark:text-white/60 mb-4">
                    {perk.description}
                  </p>

                  <div className="filter grayscale opacity-50 cursor-not-allowed flex justify-between items-center">
                    {perk.claimCode && (
                      <div className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded text-xs font-mono">
                        {perk.claimCode}
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className={perk.claimCode ? "" : "ml-auto"}
                    >
                      Login to Claim
                      <LogIn className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-6 rounded-lg border transition-colors duration-300 ${
                    claimedPerks.has(index)
                      ? "border-pareto-pink bg-pareto-pink/5"
                      : "border-black/10 dark:border-white/10 hover:border-pareto-pink dark:hover:border-pareto-pink"
                  }`}
                >
                  <div className="text-4xl mb-4">{perk.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                  <p className="text-black/60 dark:text-white/60 mb-4">
                    {perk.description}
                  </p>

                  <div className="flex justify-between items-center">
                    {perk.claimCode && (
                      <div className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded text-xs font-mono">
                        {perk.claimCode}
                      </div>
                    )}

                    <Button
                      variant={claimedPerks.has(index) ? "outline" : "pink"}
                      size="sm"
                      className={
                        claimedPerks.has(index)
                          ? "ml-auto"
                          : perk.claimCode
                            ? ""
                            : "ml-auto"
                      }
                      onClick={() => handleClaimPerk(index, perk)}
                    >
                      {claimedPerks.has(index) ? (
                        <>
                          <Check className="h-4 w-4" />
                          Claimed
                        </>
                      ) : (
                        <>
                          Claim Perk
                          <ExternalLink className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Perks;
