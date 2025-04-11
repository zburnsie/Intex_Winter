import React from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

interface SearchResultsGridProps {
  results: any[];
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({ results }) => {
  return (
    <div className="movie-grid">
      {results.map((movie) => (
        <div className="movie-grid-item" key={movie.showId}>
          <MovieCard
            title={movie.title}
            imagePath={movie.imagePath}
            showId={movie.showId}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            description={movie.description}
            director={movie.director}
            cast={movie.cast}
            country={movie.country}
            duration={movie.duration}
            averageRating={movie.averageRating}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsGrid;
