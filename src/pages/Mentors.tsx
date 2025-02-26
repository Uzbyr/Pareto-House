
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Mentors = () => {
  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-pareto-pink hover:text-white mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Mentors</h1>
          <p className="text-xl text-white/80 mb-8">
            Meet our exceptional mentors who are dedicated to helping you succeed. Coming soon!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Mentors;
