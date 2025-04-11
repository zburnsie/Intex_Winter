import React, { useContext, useEffect, useState } from 'react';
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
  const [tilts, setTilts] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      if (!user?.recId || user.recId === -1) return;

      try {
        const idsResponse = await fetch(
          `https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/prediction/user-based?recId=${user.recId}`
        );
        const showIds: string[] = await idsResponse.json();

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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the card
    const y = e.clientY - rect.top; // y position within the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // vertical tilt
    const rotateY = ((x - centerX) / centerX) * 6; // horizontal tilt

    setTilts((prev) => ({
      ...prev,
      [index]: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`,
    }));
  };

  const resetTilt = (index: number) => {
    setTilts((prev) => ({
      ...prev,
      [index]: 'rotateX(0deg) rotateY(0deg) scale(1)',
    }));
  };

  if (movies.length === 0) return null;

  return (
    <div className="recommended-row-wrapper">
      <h3 className="text-white text-center mt-4 mb-5">Recommended For You</h3>

      <div className="recommended-row">
        {movies.map((movie, index) => (
          <div
            className="movie-grid-item position-relative parallax-tilt"
            key={movie.showId}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => resetTilt(index)}
            style={{
              transform: tilts[index] || 'rotateX(0deg) rotateY(0deg)',
            }}
          >
            <div className="overlay-number">{index + 1}</div>
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
    </div>
  );
};

export default RecommendedRow;
