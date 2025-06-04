import React from "react";

const companyLogos = [
  { name: "Ramp", logo: "/lovable-uploads/Ramp.png", url: "https://ramp.com/" },
  { name: "Truebill", logo: "/lovable-uploads/Truebill.png", url: "https://truebill.com/" },
  { name: "Mercury", logo: "/lovable-uploads/Mercury.png", url: "https://mercury.com/" },
  { name: "Modern Treasury", logo: "/lovable-uploads/Modern Treasury.png", url: "https://www.moderntreasury.com/" },
  { name: "Misfits Market", logo: "/lovable-uploads/Misfits Market.png", url: "https://www.misfitsmarket.com/" },
];

const ScrollingCompanies = () => {
  return (
    <div className="relative overflow-x-auto py-6" style={{ scrollbarWidth: 'none' }}>
      <div className="flex space-x-1 px-4 min-w-full justify-center" style={{ msOverflowStyle: 'none' }}>
        {companyLogos.map((company, idx) => (
          <div
            key={company.name + idx}
            className="flex items-center justify-center h-60 min-w-[240px]"
          >
            <a href={company.url} target="_blank" rel="noopener noreferrer">
              <img
                src={company.logo}
                alt={company.name + ' logo'}
                className="h-[90%] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 bg-white rounded shadow"
                style={{ maxHeight: 192, maxWidth: 360 }}
              />
            </a>
          </div>
        ))}
      </div>
      <style>{`
        .relative.overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ScrollingCompanies; 