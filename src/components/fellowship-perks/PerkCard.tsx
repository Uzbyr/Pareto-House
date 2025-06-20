
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
  onShowUniversities
}) => {
  const isPeerNetwork = title === "Elite Peer Network";
  
  return <motion.div 
    initial={{
      opacity: 0,
      y: 20
    }} 
    whileInView={{
      opacity: 1,
      y: 0
    }} 
    viewport={{
      once: true
    }} 
    transition={{
      duration: 0.6,
      delay: index * 0.1
    }} 
    className="bg-white p-6 h-[300px]"
  >
      <h3 className="text-[35px] font-medium mb-3 text-black font-figtree leading-[95%] min-h-[8px]">
        {title}
      </h3>
      <p className="text-black/70 font-figtree">{description}</p>
    </motion.div>;
};

export default PerkCard;
