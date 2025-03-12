
import { motion } from "framer-motion";

const TopInvestors = () => {
  return (
    <div className="container mb-16">
      <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 tracking-tight">
        Backed by Top Investors
      </h3>
      <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto text-center">
        After completing the Pareto Fellowship, many of our fellows go on to raise funding from world-class investors
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mt-8">
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
              src="/lovable-uploads/z-fellows.svg" 
              alt="Z Fellows" 
              className="h-10 object-contain"
            />
          </div>
          <span className="text-sm font-medium">Z Fellows</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-white/10 rounded-lg p-4 h-20 w-full flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/1e75307d-54c1-42c6-af98-0bb9438273ae.png" 
              alt="Founders Fund" 
              className="h-12 object-contain"
            />
          </div>
          <span className="text-sm font-medium">Founders Fund</span>
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
  );
};

export default TopInvestors;
