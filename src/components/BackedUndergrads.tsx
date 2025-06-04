import { motion } from "framer-motion";
import PageContainer from "./PageContainer";
import ScrollingCompanies from "./ScrollingCompanies";

const houseImages = [
  { src: "/1.png", alt: "House 1" },
  { src: "/2.png", alt: "House 2" },
  { src: "/3.png", alt: "House 3" },
  { src: "/4.png", alt: "House 4" },
];

const BackedUndergrads = () => {
  return (
    <div className="pt-20 pb-4 bg-black">
      <PageContainer>
        {/* The House Section */}
        <div className="mb-16">
          <h2 className="text-[17px] text-[#828282] uppercase tracking-widest mb-4 font-figtree text-center">THE HOUSE</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {houseImages.map((img, idx) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="shadow-lg object-cover w-120 h-120 md:w-[32rem] md:h-[32rem] bg-zinc-800"
                style={{ objectPosition: "center" }}
              />
            ))}
          </div>
        </div>
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[17px] text-[#828282] uppercase tracking-widest mb-4 font-figtree"
          >
            BACKED FOUNDERS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl mx-auto leading-tight"
          >
            We've backed world class founders
          </motion.p>
        </div>
        
        {/* Company Logos Scroller */}
        <div className="mb-0">
          <ScrollingCompanies />
        </div>
      </PageContainer>
    </div>
  );
};

export default BackedUndergrads;
