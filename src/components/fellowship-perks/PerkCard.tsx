
import React from "react";
import { motion } from "framer-motion";

interface PerkCardProps {
  title: string;
  description: string;
  index: number;
  onShowUniversities?: () => void;
}

const PerkCard: React.FC<PerkCardProps> = ({
  title,
  description,
  index,
  onShowUniversities,
}) => {
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
      className="bg-white p-6 h-[300px]"
    >
      <h3 className="text-xl font-semibold mb-3 text-black font-figtree">
        {title}
      </h3>
      {isPeerNetwork ? (
        <div>
          <p className="text-black/70 font-figtree">
            {description}{" "}
            <button
              onClick={onShowUniversities}
              className="text-black font-medium hover:underline"
            >
              university ecosystem
            </button>
          </p>
        </div>
      ) : (
        <p className="text-black/70 font-figtree">{description}</p>
      )}
    </motion.div>
  );
};

export default PerkCard;
