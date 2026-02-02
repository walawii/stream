
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
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
      isScrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-red-600 font-extrabold text-2xl tracking-tighter hover:text-red-500 transition-colors">
              ZELSTREAM
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-red-500 ${
                    location.pathname === link.path ? 'text-red-600' : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search movies, shows..."
                className="bg-zinc-900/50 border border-zinc-700 text-zinc-100 text-sm rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 w-48 lg:w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-6 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm rounded-lg py-3 px-4 pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 py-2 border-b border-zinc-800"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
