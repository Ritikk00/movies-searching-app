import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, isLoading, error }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-red-500 font-bold text-lg mb-2">Error</h3>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="w-full h-64 bg-gray-800"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-3 bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-400 text-xl">No movies found. Try searching for something!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
