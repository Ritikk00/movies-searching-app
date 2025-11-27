import React from 'react';
import { getMovieTypes } from '../services/omdbService';

const FilterDropdown = ({ selectedType, onFilterChange, isLoading }) => {
  const types = getMovieTypes();

  return (
    <select
      value={selectedType}
      onChange={(e) => onFilterChange(e.target.value)}
      disabled={isLoading}
      className="input-field max-w-xs disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {types.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
