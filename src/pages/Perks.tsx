
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, ExternalLink, Check } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import Footer from "../components/Footer";

const Perks = () => {
  const { toast } = useToast();
  const [claimedPerks, setClaimedPerks] = useState<Set<number>>(new Set());

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const perks = [
    {
      title: "OpenAI API Credits",
      description: "Access state-of-the-art language models with $5,000 in API credits",
      icon: "🤖",
      claimUrl: "https://platform.openai.com/signup",
      claimCode: "PARETO-2024-AI"
    },
    {
      title: "AWS Cloud Credits",
      description: "Scale your projects with $10,000 in AWS cloud computing credits",
      icon: "☁️",
      claimUrl: "https://aws.amazon.com/activate/",
      claimCode: "PARETO-AWS-2024"
    },
    {
      title: "Perplexity AI Access",
      description: "Premium access to advanced research tools worth $2,000",
      icon: "🔍",
      claimUrl: "https://www.perplexity.ai/",
      claimCode: "PARETO-PERPLEXITY"
    },
    {
      title: "Exclusive Workshops & Webinars",
      description: "Weekly sessions with industry experts on cutting-edge technologies",
      icon: "📚",
      claimUrl: "https://calendly.com/pareto-events",
      claimCode: null
    },
    {
      title: "Personalized Mentorship",
      description: "1:1 mentoring sessions with leaders from top tech companies",
      icon: "🎯",
      claimUrl: "https://calendly.com/jules-pareto",
      claimCode: null
    },
    {
      title: "Networking Opportunities",
      description: "Access to exclusive events and a network of 500+ industry professionals",
      icon: "🤝",
      claimUrl: "https://www.meetup.com/pareto-fellows/",
      claimCode: null
    },
    {
      title: "Beta Access & Special Discounts",
      description: "Early access to emerging tech products and up to 80% off on premium tools",
      icon: "🎁",
      claimUrl: "https://pareto.notion.site/Fellow-Discounts-bd67203e4c9b4a308a9583a8a8c5d309",
      claimCode: "PARETO-FELLOWS-2024"
    },
    {
      title: "Career Development Support",
      description: "Comprehensive career coaching and interview preparation resources",
      icon: "💼",
      claimUrl: "https://pareto.notion.site/Career-Resources-2c50e2d32c5642b0a2e85bfba5a0e265",
      claimCode: null
    },
    {
      title: "Research Funding & Stipends",
      description: "Up to $25,000 in funding for innovative projects and research",
      icon: "💰",
      claimUrl: "https://airtable.com/appjPD3CKLwl2MiLT/shrD46xNfXgK3KkIT",
      claimCode: null
    },
    {
      title: "Hackathons & Innovation Challenges",
      description: "Monthly hackathons with prizes totaling $50,000+",
      icon: "🏆",
      claimUrl: "https://pareto.notion.site/Upcoming-Hackathons-fb784a9fb5b14d9ba0a1b02d18d3a3b7",
      claimCode: null
    }
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

    // Open claim URL in a new tab
    window.open(perk.claimUrl, "_blank");
    
    // Add to claimed perks
    const newClaimedPerks = new Set(claimedPerks);
    newClaimedPerks.add(index);
    setClaimedPerks(newClaimedPerks);
    
    // Show toast notification
    toast({
      title: `${perk.title} claimed!`,
      description: perk.claimCode 
        ? `Use code ${perk.claimCode} to redeem your benefit.`
        : "Check your email for instructions on how to access this perk.",
      duration: 5000,
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-pareto-pink" />
            <h1 className="text-4xl font-bold">Fellowship Perks</h1>
          </div>
          
          <p className="text-xl text-black/60 dark:text-white/60 mb-6">
            As a Pareto Fellow, you'll get access to an extensive suite of resources and opportunities 
            designed to accelerate your growth and impact.
          </p>
          
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🎯</div>
            <div>
              <p className="font-medium">Need a personalized recommendation?</p>
              <p className="text-black/60 dark:text-white/60 text-sm">
                Book a 1:1 meeting with Jules to discuss which perks would be most valuable for your specific goals.
              </p>
            </div>
            <Button 
              variant="pink" 
              className="mt-2 sm:mt-0 sm:ml-auto"
              onClick={() => window.open("https://calendly.com/jules-pareto", "_blank")}
            >
              Book Meeting
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

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
                <p className="text-black/60 dark:text-white/60 mb-4">{perk.description}</p>
                
                <div className="flex justify-between items-center">
                  {perk.claimCode && (
                    <div className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded text-xs font-mono">
                      {perk.claimCode}
                    </div>
                  )}
                  
                  <Button 
                    variant={claimedPerks.has(index) ? "outline" : "pink"} 
                    size="sm"
                    className={claimedPerks.has(index) ? "ml-auto" : perk.claimCode ? "" : "ml-auto"}
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
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Perks;
