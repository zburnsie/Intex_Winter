import React, { useContext, useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { UserContext } from './AuthorizeView';
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

const RecommendedRow: React.FC = () => {
  const [user] = useContext(UserContext);
  const [movies, setMovies] = useState<any[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      if (!user?.recId || user.recId === -1) return;

      try {
        // Step 1: Get show IDs
        const idsResponse = await fetch(
          `https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/prediction/user-based?recId=${user.recId}`
        );
        const showIds: string[] = await idsResponse.json();

        // Step 2: Fetch movie details from /prediction/by-ids
        const movieResponse = await fetch(
          `https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/prediction/by-ids?ids=${showIds.join(
            ','
          )}`
        );

        if (!movieResponse.ok) {
          throw new Error(
            'Movie details fetch failed with status ' + movieResponse.status
          );
        }

        const data = await movieResponse.json();

        const mapped = data.map((movie: any) => {
          const cleanedTitle =
            movie.title === '#AnneFrank - Parallel Stories'
              ? 'AnneFrank - Parallel Stories'
              : movie.title === '#Selfie'
              ? 'Selfie'
              : movie.title;

          const normalizedTitle = normalizeTitleForPath(cleanedTitle);
          const imagePath = `${baseImageUrl}${encodeURIComponent(
            normalizedTitle
          )}.jpg`;

          const averageRating = Math.random() * (5 - 3) + 3;

          return {
            ...movie,
            title: cleanedTitle,
            imagePath,
            averageRating,
          };
        });

        setMovies(mapped);
      } catch (error) {
        console.error('Failed to fetch recommended movies:', error);
      }
    };

    fetchRecommendedMovies();
  }, [user]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 1000, behavior: 'smooth' });
  };

  if (movies.length === 0) return null;

  return (
    <div className="genre-section mb-5">
      <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>
        Recommended For You
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
//to trigger deploy
export default RecommendedRow;
