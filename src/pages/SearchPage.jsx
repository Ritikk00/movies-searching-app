import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdbService';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('movie');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  // Load default movies on component mount
  useEffect(() => {
    const loadDefaultMovies = async () => {
      setIsLoading(true);
      setError('');
      const result = await searchMovies('movie', '', 1);
      
      if (result.success) {
        setMovies(result.results);
        setTotalResults(result.totalResults);
      } else {
        setError('Failed to load default movies. Please try searching manually.');
        setMovies([]);
        setTotalResults(0);
      }
      setIsLoading(false);
    };

    loadDefaultMovies();
  }, []);

  // Handle search
  const handleSearch = async (term) => {
    if (!term.trim()) {
      setError('Please enter a search term');
      return;
    }

    setSearchTerm(term);
    setCurrentPage(1);
    setIsLoading(true);
    setError('');
    setMovies([]);

    const result = await searchMovies(term, selectedType, 1);

    if (result.success) {
      setMovies(result.results);
      setTotalResults(result.totalResults);
      if (result.results.length === 0) {
        setError('No movies found. Please try a different search term.');
      }
    } else {
      setError(result.error);
      setMovies([]);
      setTotalResults(0);
    }

    setIsLoading(false);
  };

  // Handle type filter change
  const handleFilterChange = async (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    setIsLoading(true);
    setError('');

    if (searchTerm) {
      const result = await searchMovies(searchTerm, type, 1);

      if (result.success) {
        setMovies(result.results);
        setTotalResults(result.totalResults);
        if (result.results.length === 0) {
          setError('No results found for the selected filter.');
        }
      } else {
        setError(result.error);
        setMovies([]);
        setTotalResults(0);
      }
    }

    setIsLoading(false);
  };

  // Handle pagination
  const handlePageChange = async (page) => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError('');

    const result = await searchMovies(searchTerm, selectedType, page);

    if (result.success) {
      setMovies(result.results);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Search millions of movies and TV shows powered by OMDB
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col gap-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-gray-300">
                <span className="font-semibold">Current Search:</span> {searchTerm}
                {selectedType && <span className="ml-4 text-gray-400">Type: {selectedType}</span>}
              </div>
              <FilterDropdown
                selectedType={selectedType}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <>
          <div className="mb-4 text-gray-400">
            <p>
              {totalResults > 0
                ? `Found ${totalResults} result${totalResults !== 1 ? 's' : ''}`
                : 'No results'}
            </p>
          </div>

          <MovieGrid movies={movies} isLoading={isLoading} error={error} />

          {movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default SearchPage;
