import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <InputGroup className="search-bar-wrapper">
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button type="submit" className="search-btn">
          Search
        </Button>
        {searchQuery && onClear && (
          <Button variant="secondary" className="clear-btn" onClick={onClear}>
            Clear
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default SearchBar;



