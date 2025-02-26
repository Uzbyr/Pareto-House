
import { motion } from "framer-motion";

const universities = [
  "Stanford",
  "Berkeley",
  "Harvard",
  "MIT",
  "Oxford",
  "Cambridge",
  "Polytechnique",
  "ETH Zurich",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
            alt="Pareto Logo"
            className="w-48 md:w-64 mb-12"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            PARETO FELLOWSHIP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-pareto-pink text-xl md:text-2xl mb-12 max-w-2xl"
          >
            Building the world's most ambitious undergraduate community
          </motion.p>
        </div>

        {/* Universities Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="py-16 text-center"
        >
          <h2 className="text-sm uppercase tracking-widest mb-8 text-pareto-pink">
            TARGET UNIVERSITIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {universities.map((uni, index) => (
              <motion.div
                key={uni}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-4 border border-pareto-pink/20 rounded"
              >
                <p className="font-medium">{uni}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="py-16 text-center"
        >
          <a
            href="https://www.pareto20.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold bg-pareto-pink text-black 
                     hover:bg-white transition-colors duration-300 tracking-wide"
          >
            LEARN MORE
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
