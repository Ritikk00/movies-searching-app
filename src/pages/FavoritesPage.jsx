import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            ♥ My Favorite Movies
          </h1>
          <p className="text-gray-400 text-lg">
            {favorites.length === 0
              ? 'No favorites yet. Start adding your favorite movies!'
              : `You have ${favorites.length} favorite movie${favorites.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <MovieGrid movies={favorites} isLoading={false} error="" />
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-5xl mb-4">📽️</p>
              <p className="text-gray-400 text-xl">
                Start searching and adding movies to your favorites!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
