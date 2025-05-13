
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const PageContainer = ({ 
  children, 
  className = "",
  fullWidth = false
}: PageContainerProps) => {
  return (
    <div 
      className={`${fullWidth ? 'w-full px-4' : 'max-w-7xl px-6 sm:px-8 lg:px-6'} mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
