import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import ContentRecommendationRow from '../components/ContentRecommendationRow';
import HybridRecommendationRow from '../components/HybridRecommendationRow';
import StarRating from '../components/StarRating';

interface MovieDetail {
  title: string;
  director: string;
  cast: string;
  country: string;
  releaseYear: number;
  rating: string;
  duration: string;
  description: string;
  imagePath: string;
  averageRating?: number;
}

const baseApiUrl = 'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/Movie';

const baseImageUrl =
  'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

const MovieDetailPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/gu, '')
      .trim();
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/api/Movie/${showId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();

        const normalizedTitle = normalizeTitleForPath(data.title || 'Unknown');
        const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

        setMovie({
          title:
            data.title === '#AnneFrank - Parallel Stories'
              ? 'AnneFrank - Parallel Stories'
              : data.title === '#Selfie'
              ? 'Selfie'
              : data.title || 'Unknown',
          director: data.director || '—',
          cast: data.cast || '—',
          country: data.country || '—',
          releaseYear: data.releaseYear || 0,
          rating: data.rating || '—',
          duration: data.duration || '—',
          description: data.description || 'No description available.',
          imagePath: imagePath,
          averageRating: data.averageRating ?? 3.5,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [showId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-5">Error: {error}</p>;
  }

  if (!movie) {
    return <p className="text-center mt-5">Movie not found</p>;
  }

  return (
    <Container fluid className="text-white mt-5 px-5">
      {/* Poster + Details Layout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
        }}
      >
        {/* Poster & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <h2 className="text-center mb-3" style={{ fontSize: '2rem' }}>{movie.title}</h2>
          <img
            src={movie.imagePath}
            alt={`Poster for ${movie.title}`}
            style={{
              width: '560px',
              height: '731px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/default-poster.jpg';
            }}
          />

          {/* Star Rating under Poster */}
          <div className="d-flex align-items-center gap-2 mt-3">
            <StarRating rating={movie.averageRating ?? 3.5} />
            <span>{(movie.averageRating ?? 3.5).toFixed(1)} / 5</span>
          </div>
        </div>

        {/* Movie Details */}
        <div
          style={{
            flex: 1,
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginTop: '3.5rem',
            textAlign: 'left',
          }}
        >
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p>
            <strong>Cast:</strong>{' '}
            {movie.cast
              .split(' ')
              .reduce<string[]>((acc, curr, index, arr) => {
                if (index % 2 === 0 && arr[index + 1]) {
                  acc.push(`${curr} ${arr[index + 1]}`);
                }
                return acc;
              }, [])
              .slice(0, 2)
              .join(', ')}
          </p>
          <p className="mt-3"><strong>Description:</strong> {movie.description}</p>

          {/* Content Recommendation Row aligned with poster and centered label */}
          <div style={{ paddingLeft: '0px', width: 'fit-content', marginTop: '50px' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 className="text-white mb-3">More Like This</h3>
            </div>
            <ContentRecommendationRow showId={showId!} />

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3 className="text-white mb-3">Viewers Also Liked</h3>
            </div>
            <HybridRecommendationRow showId={showId!} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetailPage;


