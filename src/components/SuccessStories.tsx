
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// Success story data
const successStories = [
  {
    id: 1,
    name: "James (Yuxi) Qian",
    university: "Stanford University",
    title: "Founder of Stealth AI Startup",
    description: "Developing cutting-edge AI technology with applications in computer vision and natural language processing. With Pareto's support, James secured seed funding from top Silicon Valley investors and gained access to a network of technical advisors who helped refine the product architecture and go-to-market strategy for his revolutionary AI platform.",
    image: "/lovable-uploads/a9e0bf2f-c832-4b9d-b7cf-84ff06989b78.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    university: "MIT",
    title: "CTO of Climate Tech Venture",
    description: "Building carbon capture technologies that address the urgent climate crisis. Pareto connected Sarah with industry experts and potential customers, accelerating her startup's development cycle and helping secure a strategic partnership with a major energy company.",
    image: "/lovable-uploads/tadas-burgaila.jpeg",
  },
  {
    id: 3,
    name: "Michael Roberts",
    university: "Harvard University",
    title: "Founder of EdTech Platform",
    description: "Revolutionizing education accessibility through an AI-powered learning platform. The Pareto Fellowship provided Michael with mentorship from successful founders and introduced him to his technical co-founder, transforming his idea into a venture-backed startup that now serves thousands of students.",
    image: "/lovable-uploads/herve-bredin.jpeg",
  },
];

const SuccessStories = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentStory = successStories[currentStoryIndex];
  
  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  });
  
  const handlePrevStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800"
      >
        {isLoading ? (
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <Skeleton className="h-64 w-64 rounded-full bg-gray-800" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-10 w-3/4 bg-gray-800" />
              <Skeleton className="h-6 w-1/2 bg-gray-800" />
              <Skeleton className="h-8 w-56 rounded-full bg-gray-800" />
              <Skeleton className="h-28 w-full bg-gray-800" />
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative">
            <div className="relative">
              <Avatar className="h-64 w-64 border-4 border-violet-500/20 rounded-full overflow-hidden">
                <AvatarImage 
                  src={currentStory.image} 
                  alt={currentStory.name}
                  className="object-cover w-full h-full" 
                />
                <AvatarFallback className="text-4xl">
                  {currentStory.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-4 right-0 left-0 flex justify-center space-x-4">
                <Button 
                  onClick={handlePrevStory}
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-black border-zinc-700 hover:bg-zinc-800 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleNextStory}
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-black border-zinc-700 hover:bg-zinc-800 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-left">
              <h3 className="text-3xl font-bold text-white">{currentStory.name}</h3>
              <p className="text-xl text-zinc-400">{currentStory.university}</p>
              <div className="inline-block px-4 py-2 bg-zinc-800/80 text-violet-400 font-medium rounded-full text-sm">
                {currentStory.title}
              </div>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {currentStory.description}
              </p>
            </div>
            
            <div className="absolute bottom-6 right-8 flex space-x-1.5">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStoryIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentStoryIndex ? "bg-violet-500 scale-125" : "bg-gray-600"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SuccessStories;
