
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
      
      const data = await fetchContent(activeCategory, 1);
      
      if (data.success) {
        setItems(data.items);
        setHasMore(data.hasMore);
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
      { threshold: 0.5, rootMargin: '100px' }
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

      <main className="max-w-7xl mx-auto px-3 md:px-8 -mt-10 md:-mt-20 relative z-10">
        {/* Category Filter - Optimized for mobile scroll */}
        <div className="sticky top-16 md:top-20 z-40 bg-zinc-950/95 backdrop-blur shadow-xl border-y md:border border-white/5 md:rounded-xl p-0 md:p-2 mb-6 md:mb-8 -mx-3 md:mx-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 py-3 md:px-2 md:py-0">
            {Object.entries(Category).map(([key, value]) => (
              <button
                key={value}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveCategory(value as Category);
                }}
                className={`whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                  activeCategory === value
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-zinc-900 md:bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 md:border-0'
                }`}
              >
                {CATEGORY_LABELS[value as Category]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-3 px-1 md:px-0">
             <div className="h-6 md:h-8 w-1 md:w-1.5 bg-red-600 rounded-full" />
             <h2 className="text-xl md:text-2xl font-bold text-white">{CATEGORY_LABELS[activeCategory]}</h2>
          </div>

          {loading ? (
            <GridSkeleton count={12} />
          ) : (
            <>
              {/* Tightened gap for mobile (gap-3) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                {items.map((item, idx) => (
                  <MovieCard key={`${item.id}-${idx}`} movie={item} />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={observerTarget} className="py-8 md:py-12 flex justify-center w-full">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-zinc-400 animate-pulse text-sm">
                    <Loader2 className="animate-spin w-4 h-4" /> Loading more...
                  </div>
                )}
                {!hasMore && items.length > 0 && (
                  <p className="text-zinc-600 text-xs md:text-sm">End of list</p>
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
