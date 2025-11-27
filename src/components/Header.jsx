import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🎬</div>
            <div>
              <h1 className="text-2xl font-bold text-white">CineSearch</h1>
              <p className="text-xs text-gray-400">Find Your Favorite Movies</p>
            </div>
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              ♥ Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
