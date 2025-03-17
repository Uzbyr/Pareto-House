
import React from "react";
import { motion } from "framer-motion";
import { 
  UserRoundCog, 
  Users, 
  PiggyBank, 
  Cloud, 
  TrendingUp 
} from "lucide-react";

interface PerkCardProps {
  title: string;
  description: string;
  iconType: string;
  index: number;
  onShowUniversities?: () => void;
}

const PerkCard: React.FC<PerkCardProps> = ({ 
  title, 
  description, 
  iconType, 
  index, 
  onShowUniversities 
}) => {
  // Map icon type to the appropriate Lucide icon component
  const renderIcon = () => {
    switch (iconType) {
      case "UserRoundCog":
        return <UserRoundCog className="w-12 h-12 text-pareto-pink" />;
      case "Users":
        return <Users className="w-12 h-12 text-pareto-pink" />;
      case "PiggyBank":
        return <PiggyBank className="w-12 h-12 text-pareto-pink" />;
      case "Cloud":
        return <Cloud className="w-12 h-12 text-pareto-pink" />;
      case "TrendingUp":
        return <TrendingUp className="w-12 h-12 text-pareto-pink" />;
      default:
        return null;
    }
  };

  const isPeerNetwork = title === "Elite Peer Network";

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
      <div className="mb-6">{renderIcon()}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {isPeerNetwork ? (
        <div>
          <p className="text-black/70 dark:text-white/70">
            {description}{" "}
            <button
              onClick={onShowUniversities}
              className="text-pareto-pink font-medium hover:underline"
            >
              university ecosystem
            </button>
          </p>
        </div>
      ) : (
        <p className="text-black/70 dark:text-white/70">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default PerkCard;
