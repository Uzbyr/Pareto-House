
import { motion } from "framer-motion";
import { type Perk } from "./perksData";

interface PerkCardProps {
  perk: Perk;
  index: number;
  onUniversitiesClick?: () => void;
  showUniversityButton?: boolean;
}

const PerkCard = ({ perk, index, onUniversitiesClick, showUniversityButton }: PerkCardProps) => {
  return (
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
        delay: index * 0.1,
      }}
      className="bg-white dark:bg-pareto-black p-8 rounded-lg"
    >
      <div className="mb-6">{perk.icon}</div>
      <h3 className="text-xl font-semibold mb-3">{perk.title}</h3>
      {showUniversityButton ? (
        <div>
          <p className="text-black/70 dark:text-white/70">
            {perk.description}{" "}
            <button
              onClick={onUniversitiesClick}
              className="text-pareto-pink font-medium hover:underline"
            >
              university ecosystem
            </button>
          </p>
        </div>
      ) : (
        <p className="text-black/70 dark:text-white/70">
          {perk.description}
        </p>
      )}
    </motion.div>
  );
};

export default PerkCard;
