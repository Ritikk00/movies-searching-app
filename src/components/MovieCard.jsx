import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="card h-full hover:-translate-y-2 cursor-pointer">
        <div className="relative">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-100 transition-all"
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className={favorite ? 'text-red-500 text-xl' : 'text-gray-300 text-xl'}>
              {favorite ? '♥' : '♡'}
            </span>
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2 mb-2 hover:text-red-500 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{movie.Year}</p>
          <p className="text-gray-500 text-xs">{movie.Type}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
