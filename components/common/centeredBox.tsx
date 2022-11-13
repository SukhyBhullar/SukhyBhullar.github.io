import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

const CenteredBox: React.FC<Props> = ({children, className = ''}) => {
  return (
    <div className={`mx-auto my-auto h-screen flex flex-col justify-center ${className}`}>
      <div className="flex flex-col rounded boxborder p-7 gap-6">
        {children}
      </div>
    </div>
  );
};

export default CenteredBox;
