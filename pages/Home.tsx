
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchContent } from '../services/api.ts';
import { Category, CATEGORY_LABELS, MovieItem } from '../types.ts';
import Hero from '../components/Hero.tsx';
import MovieCard from '../components/MovieCard.tsx';
import { GridSkeleton, HeroSkeleton } from '../components/Skeleton.tsx';
import { Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.TRENDING);
  const [heroItem, setHeroItem] = useState<MovieItem | null>(null);
  const [items, setItems] = useState<MovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial Load & Category Change
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setItems([]);
      setPage(1);
      
      // Fetch data for the new category
      const data = await fetchContent(activeCategory, 1);
      
      if (data.success) {
        setItems(data.items);
        setHasMore(data.hasMore);
        // Use first item as hero if it's the initial load or trending
        if (activeCategory === Category.TRENDING && data.items.length > 0) {
          setHeroItem(data.items[0]);
        }
      }
      setLoading(false);
    };

    init();
  }, [activeCategory]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, page, activeCategory]);

  const loadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const data = await fetchContent(activeCategory, nextPage);
    
    if (data.success) {
      setItems(prev => [...prev, ...data.items]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } else {
      setHasMore(false);
    }
    setLoadingMore(false);
  };

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero Section */}
      {loading && !heroItem ? <HeroSkeleton /> : heroItem && <Hero item={heroItem} />}

      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        {/* Category Filter */}
        <div className="sticky top-20 z-40 bg-zinc-950/95 backdrop-blur shadow-xl border border-white/5 rounded-xl p-2 mb-8 flex gap-2 overflow-x-auto scrollbar-hide">
          {Object.entries(Category).map(([key, value]) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value as Category)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeCategory === value
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {CATEGORY_LABELS[value as Category]}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1.5 bg-red-600 rounded-full" />
             <h2 className="text-2xl font-bold text-white">{CATEGORY_LABELS[activeCategory]}</h2>
          </div>

          {loading ? (
            <GridSkeleton count={12} />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {items.map((item, idx) => (
                  <MovieCard key={`${item.id}-${idx}`} movie={item} />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={observerTarget} className="py-12 flex justify-center w-full">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-zinc-400 animate-pulse">
                    <Loader2 className="animate-spin" /> Loading more content...
                  </div>
                )}
                {!hasMore && items.length > 0 && (
                  <p className="text-zinc-600 text-sm">You've reached the end of the list.</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
