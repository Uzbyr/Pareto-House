
import { useState } from "react";
import { motion } from "framer-motion";
import PerkCard from "./fellowship-perks/PerkCard";
import UniversitiesDialog from "./fellowship-perks/UniversitiesDialog";

const FellowshipPerks = () => {
  const [showUniversities, setShowUniversities] = useState(false);

  const perksData = [
    {
      title: "World Class Mentors",
      description:
        "Connect with top founders, operators, investors, researchers, public figures who've built successful companies",
    },
    {
      title: "Elite Peer Network",
      description:
        "The world's most elite group of young generational talents in Maths Physics, and Computer Science",
      showUniversitiesDialog: true,
    },
    {
      title: "Startup Resources",
      description:
        "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more",
    },
    {
      title: "Oppurtunity Accelerator",
      description:
        "Access to internships at the most competitive startups in Silicon Valley and connections with people who can transform your career trajectory",
    },
  ];

  return (
    <div className="bg-black py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-[17px] text-[#828282] font-figtree uppercase tracking-widest text-left">
            FELLOWSHIP PERKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {perksData.map((perk, index) => (
            <PerkCard
              key={perk.title}
              title={perk.title}
              description={perk.description}
              index={index}
              onShowUniversities={
                perk.showUniversitiesDialog
                  ? () => setShowUniversities(true)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <UniversitiesDialog
        open={showUniversities}
        onOpenChange={setShowUniversities}
      />
    </div>
  );
};

export default FellowshipPerks;
