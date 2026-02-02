
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { MovieItem } from '../types';
import MovieCard from '../components/MovieCard';
import { GridSkeleton } from '../components/Skeleton';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchMovies(query);
      setResults(data.items);
      setLoading(false);
    };

    performSearch();
  }, [query]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-zinc-500">Showing matches for: <span className="text-zinc-200 italic">"{query}"</span></p>
      </div>

      {loading ? (
        <GridSkeleton count={12} />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="bg-zinc-900/50 p-8 rounded-full mb-6">
            <svg className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-300 mb-2">No results found</h2>
          <p className="text-zinc-500 max-w-md">We couldn't find anything matching your search. Try different keywords or browse our categories.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
