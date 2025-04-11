import React from 'react';
import { Form } from 'react-bootstrap';
import '../pages/MoviesPage.css'; // Make sure you have a CSS file for styling

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch, onClear }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-input-wrapper">
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && onClear && (
          <span className="clear-icon" onClick={onClear}>
            &times;
          </span>
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
