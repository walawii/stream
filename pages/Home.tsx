
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../services/api';
import { MovieItem, Category, CATEGORY_LABELS } from '../types';
import MovieCard from '../components/MovieCard';
import { GridSkeleton } from '../components/Skeleton';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<MovieItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.TRENDING);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    const trendData = await fetchMovies(Category.TRENDING);
    setTrending(trendData.items.slice(0, 5));
    
    const catData = await fetchMovies(selectedCategory, 1);
    setMovies(catData.items);
    setHasMore(catData.hasMore);
    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setLoading(true);
    const data = await fetchMovies(selectedCategory, nextPage);
    setMovies(prev => [...prev, ...data.items]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setLoading(false);
  };

  const heroMovie = trending[0];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroMovie.poster} 
              alt={heroMovie.title}
              className="w-full h-full object-cover blur-sm brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-24 md:pb-32">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-4 text-sm font-bold text-red-600 uppercase tracking-widest">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px]">NEW</span>
                Trending Now
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                {heroMovie.title}
              </h1>
              <div className="flex items-center gap-4 text-zinc-300">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {heroMovie.rating}
                </span>
                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>{heroMovie.year}</span>
                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span className="capitalize">{heroMovie.type}</span>
              </div>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl line-clamp-3">
                Experience the latest and most popular {heroMovie.type} on ZelStream. 
                Full HD quality with smooth streaming for the best viewing experience.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to={`/detail/${encodeURIComponent(heroMovie.detailPath)}`}
                  className="bg-white text-black hover:bg-zinc-200 px-8 py-3.5 rounded-full font-bold transition-all flex items-center gap-2 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Now
                </Link>
                <Link 
                  to={`/detail/${encodeURIComponent(heroMovie.detailPath)}`}
                  className="bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-bold transition-all border border-zinc-700/50"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {/* Categories Bar */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {Object.entries(Category).map(([key, value]) => (
            <button
              key={value}
              onClick={() => {
                setSelectedCategory(value);
                setPage(1);
                setMovies([]);
              }}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                selectedCategory === value 
                ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {CATEGORY_LABELS[value]}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-red-600 rounded-full" />
          {CATEGORY_LABELS[selectedCategory]}
        </h2>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie, idx) => (
              <MovieCard key={`${movie.id}-${idx}`} movie={movie} />
            ))}
          </div>
        ) : loading && (
          <GridSkeleton count={12} />
        )}

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-10 py-3 rounded-full font-bold border border-zinc-800 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : 'Load More Content'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
