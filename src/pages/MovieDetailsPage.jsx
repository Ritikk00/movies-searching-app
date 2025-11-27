import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbService';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetailsPage = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError('');

      const result = await getMovieDetails(imdbID);

      if (result.success) {
        setMovie(result.data);
      } else {
        setError(result.error);
      }

      setIsLoading(false);
    };

    fetchMovieDetails();
  }, [imdbID]);

  const handleFavoriteClick = () => {
    if (isFavorite(imdbID)) {
      removeFavorite(imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-red-500 font-bold text-xl mb-2">Error</h2>
          <p className="text-red-300 mb-6">{error || 'Movie not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(imdbID);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Search
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-xl"
                />
              ) : (
                <div className="w-full bg-gray-800 rounded-lg flex items-center justify-center h-96">
                  <span className="text-gray-400">No Poster Available</span>
                </div>
              )}

              <button
                onClick={handleFavoriteClick}
                className="w-full mt-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: favorite ? '#ef4444' : '#374151',
                  color: '#fff',
                }}
              >
                <span>{favorite ? '♥' : '♡'}</span>
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {movie.Title}
              </h1>
              <p className="text-xl text-gray-400">
                {movie.Year}
                {movie.Rated && ` • ${movie.Rated}`}
                {movie.Runtime && ` • ${movie.Runtime}`}
              </p>
            </div>

            {/* Ratings */}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-yellow-500">
                    {movie.imdbRating}
                  </div>
                  <div>
                    <p className="text-gray-300 font-semibold">IMDb Rating</p>
                    <p className="text-gray-400">{movie.imdbVotes} votes</p>
                  </div>
                </div>
              </div>
            )}

            {/* Genre */}
            {movie.Genre && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Genre</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-600 bg-opacity-30 border border-red-600 text-red-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Plot</h2>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Cast */}
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Cast</h2>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
            )}

            {/* Director */}
            {movie.Director && movie.Director !== 'N/A' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Director</h2>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
            )}

            {/* Writer */}
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Writer</h2>
                <p className="text-gray-300">{movie.Writer}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm">Box Office</p>
                  <p className="text-white font-semibold">{movie.BoxOffice}</p>
                </div>
              )}
              {movie.Production && movie.Production !== 'N/A' && (
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm">Production</p>
                  <p className="text-white font-semibold">{movie.Production}</p>
                </div>
              )}
              {movie.Website && movie.Website !== 'N/A' && (
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm">Website</p>
                  <a
                    href={movie.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 font-semibold"
                  >
                    Visit
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
