import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

interface Movie {
  showId: string;
  title: string;
  releaseYear?: number;
  rating?: string;
  description?: string;
  director?: string;
  cast?: string;
  country?: string;
  duration?: string;
  averageRating?: number;
  imagePath: string;
}

interface SearchRecommendationRowProps {
  seedShowId: string;
  title?: string;
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

const SearchRecommendationRow: React.FC<SearchRecommendationRowProps> = ({ seedShowId, title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const [movieRes, ratingRes] = await Promise.all([
          fetch(`https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/prediction/content-based/${seedShowId}`),
          fetch(`https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/Rating/AllRatings`)
        ]);

        const movieData = await movieRes.json();
        const ratingData = await ratingRes.json();

        const mapped = movieData.map((movie: any) => {
          const cleanedTitle =
            movie.title === '#AnneFrank - Parallel Stories'
              ? 'AnneFrank - Parallel Stories'
              : movie.title === '#Selfie'
              ? 'Selfie'
              : movie.title;

          const normalizedTitle = normalizeTitleForPath(cleanedTitle);
          const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

          const relevantRatings = ratingData.filter((r: any) => r.showId === movie.showId);
          const averageRating =
            relevantRatings.length > 0
              ? relevantRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / relevantRatings.length
              : Math.random() * (5 - 3) + 3;

          return {
            ...movie,
            title: cleanedTitle,
            imagePath,
            averageRating
          };
        });

        setMovies(mapped);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      }
    };

    if (seedShowId) {
      fetchRecommendations();
    }
  }, [seedShowId]);

  if (movies.length === 0) return null;

  return (
    <div className="genre-section mb-5">
      <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>{title || 'Recommended For You'}</h3>
      <div className="scrolling-row d-flex flex-wrap justify-content-center gap-3 w-100">
        {movies.map((movie) => (
          <div className="movie-grid-item" key={movie.showId}>
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecommendationRow;
