import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

const baseImageUrl =
  'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

const normalizeTitleForPath = (title: string): string => {
  return title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s]/gu, '')
    .trim();
};

const PopularRow: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/prediction/popular');
        const data = await response.json();

        const mapped = data.map((movie: any) => {
          const cleanedTitle =
            movie.title === '#AnneFrank - Parallel Stories'
              ? 'AnneFrank - Parallel Stories'
              : movie.title === '#Selfie'
              ? 'Selfie'
              : movie.title;

          const normalizedTitle = normalizeTitleForPath(cleanedTitle);
          const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

          // Add the random rating between 3 and 5 for movies with no ratings
          const averageRating = Math.random() * (5 - 3) + 3; // Random rating between 3 and 5

          return {
            ...movie,
            title: cleanedTitle,
            imagePath,
            averageRating, // Add the random rating here
          };
        });

        setMovies(mapped);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 1000, behavior: 'smooth' });
  };

  return (
    <div className="genre-section mb-5">
      <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>
        Trending Now
      </h3>

      {movies.length === 0 && <p className="text-white">No movies loaded</p>}

      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          ◀
        </button>

        <div className="genre-row" ref={rowRef}>
          {movies.map((movie) => (
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
                averageRating={movie.averageRating} // Pass the random rating
              />
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default PopularRow;

