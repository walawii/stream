
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchContent } from '../services/api.ts';
import { MovieItem } from '../types.ts';
import MovieCard from '../components/MovieCard.tsx';
import { GridSkeleton } from '../components/Skeleton.tsx';
import { SearchX } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    
    // Simple debounce via timeout is handled by React's batching slightly, 
    // but the API call itself should ideally be debounced if typed directly.
    // Since this page loads on navigation, we just fetch immediately.
    const performSearch = async () => {
      setLoading(true);
      const data = await searchContent(query);
      setResults(data.items);
      setLoading(false);
    };

    performSearch();
  }, [query]);

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
        <p className="text-zinc-400">
          Found {results.length} results for <span className="text-white italic">"{query}"</span>
        </p>
      </div>

      {loading ? (
        <GridSkeleton count={8} />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="bg-zinc-900 p-6 rounded-full">
            <SearchX size={48} className="text-zinc-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">No matches found</h2>
          <p className="text-zinc-500 max-w-md">
            We couldn't find anything matching your search. Try adjusting your keywords or browse our categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
