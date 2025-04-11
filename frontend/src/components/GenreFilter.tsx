import React from 'react';

const genres = [
  'Action/Adventure', 'Anime', 'British TV', 'Family Friendly', 'Comedies', 'International',
  'Romantic Comedies', 'True Crime', 'Documentaries', 'Dramas', 'Fantasy', 'Horror',
  'Thrillers', 'Musicals', 'Nature', 'Reality TV', 'Spirituality'
];

interface GenreFilterProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, setSelectedGenre }) => {
  return (
    <div className="movies-controls mx-auto mb-4 text-center">
      <select
        className="form-select mb-3"
        style={{ width: '100%' }}
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;


