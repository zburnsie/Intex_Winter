import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

interface HybridRecommendationRowProps {
  showId: string;
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

const HybridRecommendationRow: React.FC<HybridRecommendationRowProps> = ({ showId }) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const [movieRes, ratingRes] = await Promise.all([
          fetch(`https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/Prediction/hybrid/${showId}`),
          fetch(`https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/rating/llratings`)
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

          // Average rating or fallback
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
        console.error('Failed to fetch hybrid-weighted recommendations:', err);
      }
    };

    fetchRecommendations();
  }, [showId]);

  return (
    <div className="genre-section mb-5" style={{ marginTop: '30px' }}>
      

      <div className="scroll-wrapper">
        <div className="genre-row d-flex flex-wrap justify-content-center gap-3 w-100">
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
      </div>
    </div>
  );
};

export default HybridRecommendationRow;



