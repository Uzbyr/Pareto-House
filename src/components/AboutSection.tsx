
import { motion } from "framer-motion";
import PageContainer from "./PageContainer";

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({
  value,
  label
}: StatProps) => {
  return <div className="flex flex-col items-center w-36">
      <div className="text-4xl md:text-6xl font-semibold mb-2">{value}</div>
      <div className="text-[15px] text-[#828282] uppercase tracking-wider whitespace-nowrap">
        <span className="text-center">{label}</span>
      </div>
    </div>;
};

const AboutSection = () => {
  return <section id="about-section" className="py-20 bg-black border-t border-white/5 font-figtree">
      <PageContainer>
        <div className="text-center mb-16">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }} className="text-[17px] text-[#828282] uppercase tracking-widest mb-4 tracking-[-0.02em]">
            ABOUT
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl mx-auto leading-tight tracking-[-0.02em]">
            Join a hacker house with the best of the best - build 24/7 and launch something big.
          </motion.p>
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16 max-w-2xl mx-auto">
          <Stat value="9" label="HACKERS" />
          <Stat value="3+" label="MONTHS, RENEWABLE" />
          <Stat value="30+" label="MENTORS" />
        </motion.div>
      </PageContainer>
    </section>;
};

export default AboutSection;
