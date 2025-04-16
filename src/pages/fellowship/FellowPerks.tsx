
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FellowshipPerks from "@/components/FellowshipPerks";
import { useAuth } from "@/contexts/AuthContext";

const FellowPerks = () => {
  const { user } = useAuth();
  const [claimedPerks, setClaimedPerks] = useState<Set<number>>(new Set());

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
      toast.info("Already claimed", {
        description: "You've already claimed this perk."
      });
      return;
    }

    window.open(perk.claimUrl, "_blank");

    const newClaimedPerks = new Set(claimedPerks);
    newClaimedPerks.add(index);
    setClaimedPerks(newClaimedPerks);

    toast.success(`${perk.title} claimed!`, {
      description: perk.claimCode
        ? `Use code ${perk.claimCode} to redeem your benefit.`
        : "Check your email for instructions on how to access this perk.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellowship Perks</h1>
        <p className="text-gray-400 mt-2">
          Exclusive benefits and resources available to Pareto Fellows
        </p>
      </div>

      {/* Perks Overview Section */}
      <div className="mb-12">
        <FellowshipPerks />
      </div>

      {/* Claim Perks Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Claim Your Perks</h2>
        
        <div className="bg-zinc-800/50 p-4 rounded-lg mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-3xl">🎯</div>
          <div>
            <p className="font-medium text-white">
              Need a personalized recommendation?
            </p>
            <p className="text-gray-400 text-sm">
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
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-6 rounded-lg border transition-colors duration-300 ${
                claimedPerks.has(index)
                  ? "border-pareto-pink bg-pareto-pink/5"
                  : "border-zinc-700 hover:border-pareto-pink"
              }`}
            >
              <div className="text-4xl mb-4">{perk.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{perk.title}</h3>
              <p className="text-gray-400 mb-4">
                {perk.description}
              </p>

              <div className="flex justify-between items-center">
                {perk.claimCode && (
                  <div className="bg-zinc-700 px-3 py-1 rounded text-xs font-mono text-gray-300">
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
                      <Check className="h-4 w-4 mr-1" />
                      Claimed
                    </>
                  ) : (
                    <>
                      Claim Perk
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FellowPerks;
