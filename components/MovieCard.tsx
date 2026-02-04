
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { MovieItem } from '../types.ts';

const MovieCard: React.FC<{ movie: MovieItem }> = memo(({ movie }) => {
  return (
    <Link 
      to={`/detail/${encodeURIComponent(movie.detailPath)}`}
      className="group relative block bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/10 active:scale-95"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-zinc-800">
        <img 
          src={movie.poster} 
          alt={movie.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-red-600 rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
            <Play fill="white" className="text-white ml-1" size={24} />
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] md:text-xs font-bold text-yellow-500 border border-white/10 flex items-center gap-1 shadow-lg">
          <Star size={10} fill="currentColor" />
          {movie.rating || 'N/A'}
        </div>
      </div>

      <div className="p-2 md:p-3">
        <h3 className="text-white font-bold text-xs md:text-sm truncate group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-[10px] md:text-xs text-zinc-500">
          <span>{movie.year}</span>
          <span className="uppercase border border-zinc-800 px-1 rounded bg-zinc-900">{movie.type}</span>
        </div>
      </div>
    </Link>
  );
});

export default MovieCard;
