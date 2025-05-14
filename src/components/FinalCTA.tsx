
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "./PageContainer";

const FinalCTA = () => {
  return (
    <div className="py-32 bg-black">
      <PageContainer className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Ready to Join the Elite?
          </h2>
          <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 mb-12">
            Applications for the next cohort close soon
          </p>

          <div className="space-y-12">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-all duration-300 text-lg font-semibold rounded-sm transform hover:-translate-y-1"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </PageContainer>
    </div>
  );
};

export default FinalCTA;
