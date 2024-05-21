import React from 'react';
import './Filter.css';

const Filter = ({ filterText, setFilterText }) => {
  return (
    <input
      className='filter-input'
      type="text"
      placeholder="Filter properties..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
};

export default Filter;