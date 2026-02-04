
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Search = lazy(() => import('./pages/Search.tsx'));
const Detail = lazy(() => import('./pages/Detail.tsx'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center bg-zinc-950">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:path" element={<Detail />} />
            {/* Handle legacy category routes by redirecting to Home with state or just render Home */}
            <Route path="/category/:id" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 md:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h2 className="text-red-600 font-black text-2xl tracking-tighter mb-1 uppercase">SAENA STREAM</h2>
              <p className="text-zinc-500 text-sm">
                Premium streaming destination for movies & series.
              </p>
            </div>
            <div className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} Saena Stream. All rights reserved. <br/>
              Disclaimer: No files are hosted on our server.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
