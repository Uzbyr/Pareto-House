
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageContainer from "./PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Pareto Fellowship was a game-changer for my career. The network and mentorship helped me validate my startup idea and secure initial funding.",
    author: "Alex Chen",
    role: "Founder & CEO, TechFlow",
    image: "/lovable-uploads/carlos-eduardo.jpeg",
  },
  {
    id: 2,
    quote: "Being part of Pareto connected me with brilliant minds across industries. The friendships and collaborations formed here have been invaluable.",
    author: "Sarah Johnson",
    role: "AI Research Lead, Stanford",
    image: "/lovable-uploads/tadas-burgaila.jpeg",
  },
  {
    id: 3,
    quote: "The mentorship I received through Pareto helped me navigate critical decisions in my startup journey. It's been transformative.",
    author: "Michael Roberts",
    role: "Co-founder, Quantum Computing Solutions",
    image: "/lovable-uploads/herve-bredin.jpeg",
  },
  {
    id: 4,
    quote: "The Pareto community is unlike any other - a blend of ambition, intelligence, and genuine support that pushes you to achieve more.",
    author: "Emma Williams",
    role: "Rhodes Scholar, Oxford",
    image: "/lovable-uploads/khaled-helioui.png",
  },
  {
    id: 5,
    quote: "From day one, Pareto challenged me to think bigger. The peer group keeps me accountable and inspired every day.",
    author: "James Lee",
    role: "Founder, ClimateAction Tech",
    image: "/lovable-uploads/christian-reber.jpeg",
  },
];

const TestimonialSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentTestimonial = testimonials[currentTestimonialIndex];
  
  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="py-16 bg-black">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-6 w-16 mx-auto bg-gray-800" />
              <Skeleton className="h-36 w-full bg-gray-800" />
              <div className="flex items-center justify-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full bg-gray-800" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 bg-gray-800" />
                  <Skeleton className="h-4 w-40 bg-gray-800" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="inline-block p-2 bg-black/20 border border-gray-800 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.11 13.65L13.69 10.06" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-medium mb-8 leading-tight">
                {currentTestimonial.quote}
              </h3>
              
              <div className="flex items-center justify-center">
                <Avatar className="h-16 w-16 border-2 border-violet-500/20">
                  <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.author} />
                  <AvatarFallback>{currentTestimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="ml-4 text-left">
                  <p className="font-medium text-lg">{currentTestimonial.author}</p>
                  <p className="text-gray-400">{currentTestimonial.role}</p>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentTestimonialIndex ? "bg-violet-500 scale-125" : "bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </PageContainer>
    </div>
  );
};

export default TestimonialSection;
