// SearchNote.tsx
import React from 'react';
import './SearchNote.css'
interface SearchNoteProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchNote: React.FC<SearchNoteProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className='search'>
      <input className='searchInput'
        type='text'
        placeholder='Search by title'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchNote;
export {}