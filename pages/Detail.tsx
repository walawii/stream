
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../services/api';
import { MovieDetail, Episode } from '../types';
import MovieCard from '../components/MovieCard';

const Detail: React.FC = () => {
  const { path } = useParams<{ path: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!path) return;
      setLoading(true);
      const result = await getMovieDetail(decodeURIComponent(path));
      if (result.success && result.data) {
        setMovie(result.data);
        if (result.data.playerUrl) {
          setCurrentVideoUrl(result.data.playerUrl);
        } else if (result.data.episodes && result.data.episodes.length > 0) {
          setCurrentVideoUrl(result.data.episodes[0].playerUrl);
          setActiveEpisodeId(result.data.episodes[0].id);
        }
      }
      setLoading(false);
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [path]);

  const handleEpisodeClick = (ep: Episode) => {
    setCurrentVideoUrl(ep.playerUrl);
    setActiveEpisodeId(ep.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="pt-20 flex flex-col gap-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="w-full aspect-video bg-zinc-900 animate-pulse rounded-2xl" />
        <div className="space-y-4">
          <div className="h-10 bg-zinc-900 rounded-lg w-1/3 animate-pulse" />
          <div className="h-6 bg-zinc-900 rounded-lg w-1/2 animate-pulse" />
          <div className="h-24 bg-zinc-900 rounded-lg w-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div className="pt-32 text-center text-zinc-500">Could not find movie details.</div>;
  }

  return (
    <div className="pt-20 pb-20">
      {/* Video Player Section */}
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative aspect-video bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800">
            {currentVideoUrl ? (
              <iframe
                src={currentVideoUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title={movie.title}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No video player available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">{movie.type}</span>
                <span className="text-zinc-500 text-sm">{movie.year}</span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.rating}
                </span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span className="text-zinc-400 text-sm">{movie.genre}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-6">{movie.title}</h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-4xl">
                {movie.description || "No description available for this content."}
              </p>
            </div>

            {/* Episodes List */}
            {movie.episodes && movie.episodes.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-1 h-6 bg-red-600 rounded-full" />
                  Episodes ({movie.episodes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {movie.episodes.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => handleEpisodeClick(ep)}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        activeEpisodeId === ep.id 
                        ? 'bg-red-600/10 border-red-600 text-red-500 shadow-lg shadow-red-600/5' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center font-bold text-xs">
                        {ep.episodeNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{ep.title}</p>
                        <p className="text-[10px] opacity-60">Available in HD</p>
                      </div>
                      <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Poster & Quick Info */}
          <div className="lg:w-80 space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800">
              <img src={movie.poster} alt={movie.title} className="w-full object-cover" />
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h4 className="font-bold text-zinc-200">Content Info</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Language</span>
                  <span className="text-zinc-300">Indonesian / Original</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Resolution</span>
                  <span className="text-green-500 font-bold">Ultra HD 4K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Audio</span>
                  <span className="text-zinc-300">Stereo 2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Content */}
        {movie.related && movie.related.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-bold mb-8">Related Content</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movie.related.map((rel) => (
                <MovieCard key={rel.id} movie={rel} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Detail;
