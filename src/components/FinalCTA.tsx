
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
          <h2 className="text-5xl md:text-[70px] font-semibold text-white tracking-tight leading-[87%] md:leading-[90%] font-figtree tracking-[-0.02em] mb-6">
            Ready to join<br className="hidden sm:block" /> the elite?
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-12">
            Applications for next cohort close soon
          </p>

          <Link
            to="/apply"
            className="group inline-flex items-center gap-2 px-6 py-2 whitespace-nowrap text-white border border-white hover:bg-white/10 transition-colors duration-300 text-[17px] font-figtree font-medium"
          >
            APPLY NOW
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </PageContainer>
    </div>
  );
};

export default FinalCTA;
