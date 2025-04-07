import React from 'react';
import { Form } from 'react-bootstrap';

const genres = ['Action', 'Comedy', 'Documentaries', 'Dramas', 'Fantasy', 'Horror']; // Add more if needed

interface GenreFilterProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, setSelectedGenre }) => {
  return (
    <Form.Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="mb-3">
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </Form.Select>
  );
};

export default GenreFilter;
