
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <div className="py-32 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Backed by Top Investors Section */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Backed by Top Investors
            </h3>
            <p className="text-lg text-black/70 dark:text-white/70 mb-8">
              After completing the Pareto Fellowship, many of our fellows go on to raise funding from world-class investors, including:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/e1a7ca51-19ab-4cf0-8c3e-22a0eeef0554.png" 
                    alt="a16z" 
                    className="h-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">Andreessen Horowitz (a16z)</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/253181bb-ed4d-4ccf-bba5-d02e998dbb85.png" 
                    alt="Sequoia" 
                    className="h-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">Sequoia Capital</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/1e75307d-54c1-42c6-af98-0bb9438273ae.png" 
                    alt="ZF Capital" 
                    className="h-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">Founders Fund</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/1ac598ab-2b9e-45b2-a5c3-69088f7cff56.png" 
                    alt="BoxGroup" 
                    className="h-14 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">BoxGroup</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/eefde1fe-abbb-4412-ad16-d59e6b39cecb.png" 
                    alt="Accel" 
                    className="h-10 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">Accel</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
                  <img 
                    src="/lovable-uploads/d17b7464-777f-4649-b13a-8139a0cec2e8.png" 
                    alt="Khosla Ventures" 
                    className="h-10 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">Khosla Ventures</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
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
      </div>
    </div>
  );
};

export default FinalCTA;
