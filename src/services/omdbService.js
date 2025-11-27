import axios from 'axios';

const API_KEY = 'f9ee3276';   // <-- NEW UPDATED KEY
const BASE_URL = 'https://www.omdbapi.com';

/**
 * Search for movies by title and type
 * @param {string} searchTerm - Movie title to search
 * @param {string} type - Movie type (movie, series, episode)
 * @param {number} page - Page number for pagination
 * @returns {Promise<object>} Search results
 */
export const searchMovies = async (searchTerm, type = '', page = 1) => {
  try {
    let url = `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    
    if (type && type !== '') {
      url += `&type=${type}`;
    }
    
    const response = await axios.get(url);
    
    if (response.data.Response === 'False') {
      return {
        success: false,
        error: response.data.Error,
        results: [],
        totalResults: 0,
      };
    }
    
    return {
      success: true,
      results: response.data.Search || [],
      totalResults: parseInt(response.data.totalResults) || 0,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch movies. Please try again later.',
      results: [],
      totalResults: 0,
    };
  }
};

/**
 * Get detailed information about a specific movie
 * @param {string} imdbID - IMDB ID of the movie
 * @returns {Promise<object>} Movie details
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    
    if (response.data.Response === 'False') {
      return {
        success: false,
        error: response.data.Error,
        data: null,
      };
    }
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch movie details. Please try again later.',
      data: null,
    };
  }
};

/**
 * Get all available movie types for filtering
 * @returns {Array} List of movie types
 */
export const getMovieTypes = () => {
  return [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'TV Series' },
    { value: 'episode', label: 'Episodes' },
  ];
};
