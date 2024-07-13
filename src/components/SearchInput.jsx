import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const SearchInput = ({ searchQuery, setSearchQuery,searchText }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder={searchText??"Search"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchIcon className="w-5 h-5 absolute right-3 top-3 text-gray-400" />
    </div>
  );
};

export default SearchInput;
