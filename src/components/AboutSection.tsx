
import { Award, Briefcase, University, Users } from "lucide-react";
import { motion } from "framer-motion";
import PageContainer from "./PageContainer";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const Stat = ({ value, label, icon }: StatProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl md:text-7xl font-semibold mb-2">{value}</div>
      <div className="flex items-center text-sm text-white/60 uppercase tracking-wider">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <PageContainer>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-pareto-pink uppercase tracking-widest mb-4">
            ABOUT
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight">
            Join a community of the top 0.1% of STEM undergrads worldwide, access unparalleled opportunities, and accelerate your path to the top of the tech ecosystem.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-16">
          <Stat 
            value="50" 
            label="FELLOWS PER BATCH" 
            icon={<Users className="w-4 h-4" />} 
          />
          <Stat 
            value="30+" 
            label="UNIVERSITIES" 
            icon={<University className="w-4 h-4" />} 
          />
          <Stat 
            value="100k" 
            label="POTENTIAL CHECK" 
            icon={<Award className="w-4 h-4" />} 
          />
          <Stat 
            value="50+" 
            label="TECH PARTNERS" 
            icon={<Briefcase className="w-4 h-4" />} 
          />
        </motion.div>
      </PageContainer>
    </section>
  );
};

export default AboutSection;
