import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import PerkCard from "./fellowship-perks/PerkCard";
import UniversitiesDialog from "./fellowship-perks/UniversitiesDialog";
import SectionHeader from "./fellowship-perks/SectionHeader";
import { perksData } from "./fellowship-perks/perksData";

const FellowshipPerks = () => {
  const [showUniversities, setShowUniversities] = useState(false);

  return (
    <div className="bg-black/5 dark:bg-white/5 py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Fellowship Perks"
          description="As a Pareto Fellow, you get access to exclusive benefits and opportunities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {perksData.map((perk, index) => (
            <PerkCard
              key={perk.title}
              title={perk.title}
              description={perk.description}
              iconType={perk.iconType}
              index={index}
              onShowUniversities={
                perk.title === "Elite Peer Network"
                  ? () => setShowUniversities(true)
                  : undefined
              }
            />
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >
        </motion.div>
      </div>

      <UniversitiesDialog
        open={showUniversities}
        onOpenChange={setShowUniversities}
      />
    </div>
  );
};

export default FellowshipPerks;
