
import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-[2/3] bg-zinc-800/50" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-zinc-800/50 rounded w-3/4" />
      <div className="flex justify-between">
        <div className="h-3 bg-zinc-800/50 rounded w-1/4" />
        <div className="h-3 bg-zinc-800/50 rounded w-1/5" />
      </div>
    </div>
  </div>
);

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-[80vh] w-full bg-zinc-900 animate-pulse relative">
    <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-3xl space-y-6">
      <div className="h-6 w-32 bg-zinc-800 rounded-full" />
      <div className="h-16 w-3/4 bg-zinc-800 rounded-lg" />
      <div className="h-4 w-full bg-zinc-800 rounded" />
      <div className="h-4 w-2/3 bg-zinc-800 rounded" />
      <div className="flex gap-4 pt-4">
        <div className="h-12 w-32 bg-zinc-800 rounded-lg" />
        <div className="h-12 w-32 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  </div>
);
