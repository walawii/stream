
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Detail = lazy(() => import('./pages/Detail'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
        <Navbar />
        
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
              <p className="text-zinc-500 font-medium animate-pulse">Loading ZelStream...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:path" element={<Detail />} />
            {/* Category Route Alias */}
            <Route path="/category/:id" element={<Home />} />
          </Routes>
        </Suspense>

        <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 md:px-8 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h2 className="text-red-600 font-black text-2xl tracking-tighter mb-2">ZELSTREAM</h2>
              <p className="text-zinc-500 text-sm max-w-sm">
                Your destination for high-quality Indonesian movies, dramas, anime, and more. 
                Streaming made simple and beautiful.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">Navigation</p>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms of Use</a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
            © {new Date().getFullYear()} ZelStream Premium. All rights reserved. 
            All content is provided by third party APIs.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
