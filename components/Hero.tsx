
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
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={item.poster} 
          alt={item.title}
          className="w-full h-full object-cover blur-sm brightness-[0.4] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-2xl space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-red-600/20">
              Top Trending
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
              <Star size={14} fill="currentColor" /> {item.rating}
            </span>
            <span className="text-zinc-400 text-sm">• {item.year}</span>
            <span className="text-zinc-400 text-sm capitalize">• {item.type}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-xl">
            {item.title}
          </h1>

          <p className="text-zinc-300 text-lg line-clamp-2 md:line-clamp-3 font-medium max-w-xl">
            Watch {item.title} and other popular {item.genre} content in high definition. 
            Experience the best streaming quality only on IrwanStream.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link 
              to={`/detail/${encodeURIComponent(item.detailPath)}`}
              className="flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-lg font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
            >
              <Play fill="currentColor" size={20} /> Watch Now
            </Link>
            <Link 
              to={`/detail/${encodeURIComponent(item.detailPath)}`}
              className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-md text-white px-8 py-3.5 rounded-lg font-bold border border-white/10 hover:bg-zinc-700/80 transition-all"
            >
              <Info size={20} /> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
