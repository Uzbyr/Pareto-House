
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageContainer from "./PageContainer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SuccessStory {
  id: number;
  name: string;
  university: string;
  title: string;
  description: string;
  image: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Kian Sadeghi",
    university: "University of Pennsylvania",
    title: "Founder & CEO at Nucleus",
    description: "Building Nucleus, the consumer health platform that's ushering in a new era of preventive healthcare based on whole-genome sequencing. Through Pareto's network, Kian connected with key biotech investors and mentors who helped him secure funding from Founders Fund, 776, and other top investors, while providing strategic guidance for scaling his innovative healthcare platform.",
    image: "/lovable-uploads/09d73cf6-8832-42ee-af69-d8a5c34c8dc5.png",
  },
  {
    id: 2,
    name: "Elena Tompkins",
    university: "Stanford University",
    title: "Co-founder at Quantum Edge",
    description: "Developing breakthrough quantum computing applications at Quantum Edge. Pareto's fellowship provided Elena with direct access to technical advisors and industry leaders who helped refine her approach to quantum algorithms, resulting in a successful seed round from Sequoia Capital and Y Combinator.",
    image: "/lovable-uploads/c1b420b7-10c1-4607-b040-e8e1c5735d01.png",
  },
  {
    id: 3,
    name: "Marcus Chen",
    university: "MIT",
    title: "Founder at Carbonet",
    description: "Creating Carbonet, a revolutionary carbon capture technology that's being deployed globally. The Pareto fellowship connected Marcus with climate tech investors and manufacturing partners, accelerating his timeline from prototype to production and helping secure a $12M Series A to scale operations across three continents.",
    image: "/lovable-uploads/carlos-eduardo.jpeg",
  },
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStory = successStories[currentIndex];

  return (
    <div className="py-16 bg-black">
      <PageContainer>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[17px] text-[#828282] uppercase tracking-widest mb-4 font-figtree"
          >
            SUCCESS STORIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl mx-auto leading-tight"
          >
            From fellow to founder
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <AspectRatio ratio={1/1} className="rounded-full overflow-hidden border-4 border-zinc-800">
                <img 
                  src={currentStory.image} 
                  alt={currentStory.name} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>

          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-3xl font-bold">{currentStory.name}</h3>
            <p className="text-xl text-gray-400">{currentStory.university}</p>
            <div className="bg-zinc-800 text-white inline-block py-2 px-4 rounded-full mb-4 w-fit">
              {currentStory.title}
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentStory.description}
            </p>
          </motion.div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? "bg-pareto-pink" : "bg-zinc-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </PageContainer>
    </div>
  );
};

export default SuccessStories;
