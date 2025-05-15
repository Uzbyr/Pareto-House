
import { motion } from "framer-motion";
import PageContainer from "./PageContainer";
import ScrollingUniversities from "./ScrollingUniversities";

const BackedUndergrads = () => {
  return (
    <div className="py-20 bg-black">
      <PageContainer>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[17px] text-[#828282] uppercase tracking-widest mb-4 font-figtree"
          >
            BACKED UNDERGRADS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl mx-auto leading-tight"
          >
            We've backed undergrads from the world's best universities
          </motion.p>
        </div>
      </PageContainer>
      
      {/* Universities logos */}
      <ScrollingUniversities />
    </div>
  );
};

export default BackedUndergrads;
