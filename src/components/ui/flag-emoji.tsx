
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { getCountryCodeFromNationality } from "@/utils/flagUtils";

interface FlagEmojiProps {
  nationality: string | null;
  className?: string;
  size?: string | number;
  showName?: boolean;
}

const FlagEmoji: React.FC<FlagEmojiProps> = ({ 
  nationality, 
  className = "", 
  size = "1em",
  showName = true
}) => {
  if (!nationality) return null;
  
  const countryCode = getCountryCodeFromNationality(nationality);
  
  if (!countryCode) return <span>{nationality}</span>;
  
  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <ReactCountryFlag 
        countryCode={countryCode} 
        svg 
        style={{ 
          width: size, 
          height: size,
          borderRadius: '2px'
        }}
        title={nationality}
      />
      {showName && <span>{nationality}</span>}
    </span>
  );
};

export default FlagEmoji;
