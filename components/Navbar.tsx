
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Film } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsMobileOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/category/indonesian-movies' },
    { name: 'Series', path: '/category/indonesian-drama' },
    { name: 'Anime', path: '/category/anime' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileOpen ? 'bg-zinc-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-gradient-to-b from-black/90 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group z-50">
              <Film className="text-red-600 w-6 h-6 transform group-hover:rotate-12 transition-transform" />
              <span className="text-red-600 font-black text-xl md:text-2xl tracking-tighter">IRWANSTREAM</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location.pathname === link.path ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden md:block group">
              <input
                type="text"
                placeholder="Search titles..."
                className="bg-black/50 border border-white/10 text-white text-sm rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 w-64 transition-all group-hover:bg-black/80"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            </form>

            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-zinc-300 hover:text-white p-1"
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-16 left-0 right-0 bg-zinc-950/98 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out origin-top shadow-2xl ${
        isMobileOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="px-4 py-6 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search movies & series..."
              className="bg-zinc-900 border border-white/10 text-white text-base rounded-lg py-3 px-4 pl-11 w-full focus:border-red-600 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-3.5" />
          </form>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
                    location.pathname === link.path ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
