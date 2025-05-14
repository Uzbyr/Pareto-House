
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`container mx-auto px-[2px] ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
