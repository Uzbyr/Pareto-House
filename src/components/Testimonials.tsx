
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  image: string;
  name: string;
  university: string;
  position: string;
  testimonial: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "/lovable-uploads/carlos-eduardo.jpeg",
    name: "Carlos Eduardo",
    university: "Stanford University",
    position: "Founder at TechFlow",
    testimonial: "Joining this fellowship was the best decision of my academic career. The connections I've made and the mentorship I've received have been invaluable. I was able to take my startup idea from concept to seed funding in just a few months."
  },
  {
    image: "/lovable-uploads/herve-bredin.jpeg",
    name: "Hervé Bredin",
    university: "MIT",
    position: "CTO at AudioLabs",
    testimonial: "The fellowship provided me with exactly what I needed at a crucial time in my journey. The network of founders and investors opened doors I didn't even know existed. My company wouldn't be where it is today without this experience."
  },
  {
    image: "/lovable-uploads/tadas-burgaila.jpeg",
    name: "Tadas Burgaila",
    university: "Oxford University",
    position: "CEO at HealthTech",
    testimonial: "Being part of this community has transformed my approach to entrepreneurship. The tailored mentorship and access to resources accelerated our growth beyond what I thought possible for a student-founded startup."
  },
  {
    image: "/lovable-uploads/christian-reber.jpeg",
    name: "Christian Reber",
    university: "Berkeley",
    position: "Founder at ProductiveAI",
    testimonial: "The caliber of people I met through the fellowship is extraordinary. From fellow students building incredible things to industry veterans who became mentors and advisors, I found my tribe here. This experience shaped not just my company but my entire career trajectory."
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-black">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <Card className="bg-black border border-white/10 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="md:w-1/4 flex flex-col items-center md:items-start">
                      <Avatar className="h-32 w-32 rounded-full border-2 border-white/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="text-xl">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-6 text-center md:text-left">
                        <h3 className="text-xl font-medium text-white">{testimonial.name}</h3>
                        <p className="text-gray-400">{testimonial.university}</p>
                        <p className="text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-3/4 relative">
                      <Quote className="absolute -top-6 -left-2 text-white/10 h-12 w-12" />
                      <p className="text-lg md:text-xl leading-relaxed text-gray-200 italic mt-4">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static left-0 right-auto translate-y-0 bg-black hover:bg-gray-900 border border-white/20" />
            <CarouselNext className="relative static left-0 right-auto translate-y-0 bg-black hover:bg-gray-900 border border-white/20" />
          </div>
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Testimonials;
