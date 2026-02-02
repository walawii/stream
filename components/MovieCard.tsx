
import React from 'react';
import { Link } from 'react-router-dom';
import { MovieItem } from '../types';

interface MovieCardProps {
  movie: MovieItem;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/detail/${encodeURIComponent(movie.detailPath)}`}
      className="group relative block rounded-xl overflow-hidden bg-zinc-900 transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg hover:shadow-red-900/20"
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-500 border border-zinc-800 flex items-center gap-1">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {movie.rating || 'N/A'}
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-zinc-400 text-xs font-medium uppercase mb-1">{movie.year} • {movie.type}</p>
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{movie.title}</h3>
          <p className="text-zinc-500 text-[10px] mt-2 line-clamp-1">{movie.genre}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
