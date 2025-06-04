import { useState } from "react";
import { motion } from "framer-motion";
import PerkCard from "./fellowship-perks/PerkCard";
import UniversitiesDialog from "./fellowship-perks/UniversitiesDialog";
import PageContainer from "./PageContainer";

const FellowshipPerks = () => {
  const [showUniversities, setShowUniversities] = useState(false);

  const perksData = [
    {
      title: "World Class Mentors",
      description:
        "Connect with top founders, operators, investors, researchers, public figures who've built successful companies",
    },
    {
      title: "Elite Founders Network",
      description:
        "The world's most elite group of young generational founders",
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
        "Access to a network of the most competitive startups in Silicon Valley and connections with people who can transform your startup trajectory",
    },
  ];

  return (
    <div className="bg-black py-20">
      <PageContainer>
        <div className="mb-4">
          <h2 className="text-[17px] text-[#828282] font-figtree uppercase tracking-widest text-left">
            HOUSE PERKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-1">
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
      </PageContainer>

      <UniversitiesDialog
        open={showUniversities}
        onOpenChange={setShowUniversities}
      />
    </div>
  );
};

export default FellowshipPerks;
