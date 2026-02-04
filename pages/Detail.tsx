
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../services/api.ts';
import { MovieDetail, Episode } from '../types.ts';
import MovieCard from '../components/MovieCard.tsx';
import { Play, Calendar, Star, Tag, PlayCircle } from 'lucide-react';

const Detail: React.FC = () => {
  const { path } = useParams<{ path: string }>();
  const [data, setData] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<string | null>(null);

  useEffect(() => {
    const loadDetail = async () => {
      if (!path) return;
      setLoading(true);
      window.scrollTo(0, 0);
      
      const res = await getDetail(decodeURIComponent(path));
      if (res.success && res.data) {
        setData(res.data);
        
        if (res.data.playerUrl) {
          setCurrentUrl(res.data.playerUrl);
        } else if (res.data.episodes?.length) {
          setCurrentUrl(res.data.episodes[0].playerUrl);
          setCurrentEpisode(res.data.episodes[0].id);
        }
      }
      setLoading(false);
    };
    loadDetail();
  }, [path]);

  const changeEpisode = (ep: Episode) => {
    setCurrentUrl(ep.playerUrl);
    setCurrentEpisode(ep.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="pt-20 max-w-7xl mx-auto px-4 md:px-8 animate-pulse space-y-8">
        <div className="w-full aspect-video bg-zinc-900 rounded-xl" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 h-96 bg-zinc-900 rounded-xl hidden md:block" />
          <div className="flex-1 space-y-4">
            <div className="w-2/3 h-8 bg-zinc-900 rounded" />
            <div className="w-full h-32 bg-zinc-900 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="pt-32 text-center">Content not found</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Player Section */}
      <div className="bg-black pt-16 md:pt-20 pb-6 md:pb-10 border-b border-zinc-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-0 md:px-8">
          <div className="relative aspect-video w-full bg-zinc-950 md:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            {currentUrl ? (
              <iframe 
                src={currentUrl} 
                className="w-full h-full border-0"
                allowFullScreen
                sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                <PlayCircle size={64} className="opacity-20" />
                <p>No stream available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm mb-3 md:mb-4">
              <span className="bg-white text-black font-bold px-2 py-0.5 rounded uppercase text-[10px] md:text-xs">
                {data.type}
              </span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Calendar size={14} /> {data.year}
              </span>
              <span className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star size={14} fill="currentColor" /> {data.rating}
              </span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Tag size={14} /> {data.genre}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight">{data.title}</h1>
            
            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed mb-8 border-l-4 border-red-600 pl-4">
              {data.description || "No synopsis available."}
            </p>

            {/* Episodes Grid */}
            {data.episodes && data.episodes.length > 0 && (
              <div className="mt-8 md:mt-10">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <PlayCircle className="text-red-600" /> Episodes ({data.episodes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                  {data.episodes.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => changeEpisode(ep)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left group ${
                        currentEpisode === ep.id 
                          ? 'bg-red-600/10 border-red-600/50 text-red-500' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-black/40 rounded text-xs font-mono font-bold shrink-0">
                        {ep.episodeNumber}
                      </span>
                      <span className="text-sm font-medium truncate flex-1">{ep.title}</span>
                      {currentEpisode === ep.id && <Play size={14} fill="currentColor" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6 order-last lg:order-none">
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 hidden lg:block">
              <img src={data.poster} alt={data.title} className="w-full object-cover" />
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
              <h3 className="font-bold text-white mb-4">Stream Info</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex justify-between">
                  <span>Quality</span> <span className="text-green-500 font-bold">HD</span>
                </li>
                <li className="flex justify-between">
                  <span>Audio</span> <span>Stereo</span>
                </li>
                <li className="flex justify-between">
                  <span>Server</span> <span>Fast CDN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {data.related && data.related.length > 0 && (
          <div className="mt-12 md:mt-20 border-t border-white/5 pt-8 md:pt-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">You May Also Like</h3>
            {/* Reuse same grid logic as Home */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {data.related.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
