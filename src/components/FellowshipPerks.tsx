
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import { perks } from "./fellowship-perks/perksData";
import PerkCard from "./fellowship-perks/PerkCard";
import SectionHeader from "./fellowship-perks/SectionHeader";
import UniversitiesDialog from "./fellowship-perks/UniversitiesDialog";

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
          {perks.map((perk, index) => (
            <PerkCard 
              key={perk.title}
              perk={perk}
              index={index}
              onUniversitiesClick={() => setShowUniversities(true)}
              showUniversityButton={index === 1}
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
          <Link
            to="/perks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-medium rounded-sm"
          >
            View All Perks
            <ArrowRight className="w-5 h-5" />
          </Link>
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
