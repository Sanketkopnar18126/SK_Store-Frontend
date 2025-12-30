import React from "react";

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    />
  );
};

export default Skeleton;
