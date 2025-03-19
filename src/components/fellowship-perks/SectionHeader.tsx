import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{
        y: 20,
      }}
      whileInView={{
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mb-16 text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
