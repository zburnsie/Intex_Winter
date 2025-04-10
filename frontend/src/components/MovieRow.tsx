import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

interface MovieRowProps {
  genre: string;
  searchQuery: string;
}

const baseImageUrl =
  'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

const normalizeTitleForPath = (title: string): string => {
  return title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s]/gu, '')
    .trim();
};

const MovieRow: React.FC<MovieRowProps> = ({ genre, searchQuery }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMoviesAndRatings = async () => {
      try {
        const [movieRes, ratingRes] = await Promise.all([
          fetch(`http://localhost:4000/api/movie/AllMovies?pageSize=25&pageNum=1&movieGenres=${genre}`),
          fetch(`https://localhost:5000/api/rating/allratings`),
        ]);

        const movieData = await movieRes.json();
        const ratingData = await ratingRes.json();

        const filtered = movieData.movies
          .filter((movie: any) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((movie: any) => {
            const cleanedTitle =
              movie.title === '#AnneFrank - Parallel Stories'
                ? 'AnneFrank - Parallel Stories'
                : movie.title === '#Selfie'
                ? 'Selfie'
                : movie.title;

            const normalizedTitle = normalizeTitleForPath(cleanedTitle);
            const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

            // ✅ Calculate avg rating or set default random rating between 3 and 5
            const relevantRatings = ratingData.filter((r: any) => r.showId === movie.showId);
            const averageRating =
              relevantRatings.length > 0
                ? relevantRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / relevantRatings.length
                : Math.random() * (5 - 3) + 3; // Random between 3 and 5

            return {
              ...movie,
              showId: movie.showId, // Ensure this is explicitly included
              title: cleanedTitle,
              imagePath,
              averageRating,
            };
          });

        setMovies(filtered);
      } catch (error) {
        console.error(`Error fetching ${genre} movies or ratings:`, error);
      }
    };

    fetchMoviesAndRatings();
  }, [genre, searchQuery]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 1000, behavior: 'smooth' });
  };

  return (
    <div className="genre-section mb-5">
      <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>
        {genre}
      </h3>

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
                averageRating={movie.averageRating}
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

export default MovieRow;

