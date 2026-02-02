
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-zinc-800" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
        <div className="h-4 bg-zinc-800 rounded w-full" />
      </div>
    </div>
  );
};

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    {Array.from({ length: count }).map((_, i) => <Skeleton key={i} />)}
  </div>
);

export default Skeleton;
