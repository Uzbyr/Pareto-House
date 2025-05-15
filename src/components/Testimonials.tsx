
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  position: string;
  testimonial: string;
  image: string;
  companyLogo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Chen",
    university: "Stanford University",
    position: "Founder at Quantum AI",
    testimonial: "Joining the fellowship has been a transformative experience. The collaboration, innovative spirit, and support I've found here are unmatched. Every day, I feel empowered to bring my best ideas to life while growing as an entrepreneur.",
    image: "/lovable-uploads/carlos-eduardo.jpeg",
    companyLogo: "/lovable-uploads/a7d520fd-8be4-462b-994d-3253cbb0ac3d.png"
  },
  {
    id: 2,
    name: "Sophia Williams",
    university: "MIT",
    position: "CTO at BlockSync",
    testimonial: "The mentorship and network I gained through this program accelerated my startup's growth beyond what I thought possible. The connections I made have been invaluable for fundraising and product development.",
    image: "/lovable-uploads/herve-bredin.jpeg",
    companyLogo: "/lovable-uploads/6975cc3f-f721-4a96-bed2-39e5a9130d01.png"
  },
  {
    id: 3,
    name: "Michael Johnson",
    university: "Harvard University",
    position: "Co-founder at NexGen Health",
    testimonial: "Being part of this fellowship gave me access to resources and mentors that completely changed my entrepreneurial journey. I was able to validate my ideas faster and connect with investors who truly believed in our vision.",
    image: "/lovable-uploads/christian-reber.jpeg",
    companyLogo: "/lovable-uploads/5907cdd5-ce88-499f-8e60-cd4184dfb58f.png"
  }
];

const Testimonials = () => {
  return (
    <div className="py-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-5xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="sm:basis-4/5 md:basis-3/4 lg:basis-2/3">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#121212] border border-[#222222] rounded-xl overflow-hidden shadow-lg">
                  <div className="p-8">
                    <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
                      {testimonial.testimonial}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-zinc-800">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -inset-1 rounded-full bg-zinc-800/20 blur-md -z-10"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-zinc-400 text-sm">{testimonial.university}</p>
                        <p className="text-zinc-500 text-sm">{testimonial.position}</p>
                      </div>
                      {testimonial.companyLogo && (
                        <div className="ml-auto">
                          <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center">
                            <img 
                              src={testimonial.companyLogo} 
                              alt="Company logo" 
                              className="w-6 h-6 object-contain opacity-70"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white" />
          <CarouselNext className="relative inset-0 translate-y-0 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
