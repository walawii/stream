
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star } from 'lucide-react';
import { MovieItem } from '../types.ts';

interface HeroProps {
  item: MovieItem;
}

const Hero: React.FC<HeroProps> = ({ item }) => {
  if (!item) return null;

  return (
    <div className="relative h-[55vh] md:h-[80vh] w-full overflow-hidden bg-zinc-900">
      <div className="absolute inset-0">
        <img 
          src={item.poster} 
          alt={item.title}
          fetchPriority="high" // Critical for LCP speed
          className="w-full h-full object-cover brightness-[0.4]"
        />
        {/* Unified high-performance gradients for both mobile and desktop with no pointer events */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-12 md:pb-24">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/20">
              Top Trending
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold text-xs md:text-sm">
              <Star size={12} className="md:w-3.5 md:h-3.5" fill="currentColor" /> {item.rating}
            </span>
            <span className="text-zinc-400 text-xs md:text-sm">• {item.year}</span>
            <span className="text-zinc-400 text-xs md:text-sm capitalize">• {item.type}</span>
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight md:leading-none text-white drop-shadow-xl line-clamp-2">
            {item.title}
          </h1>

          <p className="text-zinc-300 text-sm md:text-lg line-clamp-2 md:line-clamp-3 font-medium max-w-xl">
            Watch {item.title} and other popular {item.genre} content in high definition. 
            Experience the best streaming quality only on Saena Stream.
          </p>

          <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
            <Link 
              to={`/detail/${encodeURIComponent(item.detailPath)}`}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 md:px-8 md:py-3.5 rounded-lg font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10 text-sm md:text-base"
            >
              <Play fill="currentColor" size={18} className="md:w-5 md:h-5" /> Watch Now
            </Link>
            <Link 
              to={`/detail/${encodeURIComponent(item.detailPath)}`}
              className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-md text-white px-5 py-2.5 md:px-8 md:py-3.5 rounded-lg font-bold border border-white/10 hover:bg-zinc-700/80 transition-all text-sm md:text-base"
            >
              <Info size={18} className="md:w-5 md:h-5" /> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
