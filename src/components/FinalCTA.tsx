
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
          <h2 className="text-5xl md:text-[70px] font-semibold text-white tracking-tight leading-[87%] md:leading-[83%] font-figtree tracking-[-0.02em]">
            Ready to join<br className="hidden sm:block" /> the elite?
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-12">
            Applications for next cohort close soon
          </p>

          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-pareto-pink transition-colors duration-300 font-medium rounded-sm"
          >
            APPLY NOW
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </PageContainer>
    </div>
  );
};

export default FinalCTA;
