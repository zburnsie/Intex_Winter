import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-3"
    />
  );
};

export default SearchBar;
