import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
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
}

const MovieDetailPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const baseImageUrl = "https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/";

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/gu, '')
      .trim();
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/movie/${showId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();

        const normalizedTitle = normalizeTitleForPath(data.title || 'Unknown');
        const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

        const fetchRatings = async () => {
          try {
            const res = await fetch('https://localhost:5000/api/rating/allratings');
            const data = await res.json();
        
            const ratingsForMovie = data.filter((r: any) => r.showId === showId);
            if (ratingsForMovie.length > 0) {
              const total = ratingsForMovie.reduce((sum: number, r: any) => sum + r.rating, 0);
              const avg = total / ratingsForMovie.length;
              setAverageRating(avg);
            } else {
              setAverageRating(null); // No ratings
            }
          } catch (error) {
            console.error('Error fetching ratings:', error);
            setAverageRating(null);
          }
        };
        
        fetchRatings(); // Call it inside useEffect
        

        setMovie({
          title:
            data.title === "#AnneFrank - Parallel Stories"
              ? "AnneFrank - Parallel Stories"
              : data.title === "#Selfie"
              ? "Selfie"
              : data.title || "Unknown",
          director: data.director || '—',
          cast: data.cast || '—',
          country: data.country || '—',
          releaseYear: data.releaseYear || 0,
          rating: data.rating || '—',
          duration: data.duration || '—',
          description: data.description || 'No description available.',
          imagePath: imagePath
        });

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [showId]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="light" /></div>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;
  if (!movie) return <p className="text-center">Movie not found</p>;

  return (
    <Container fluid className="text-white mt-4 px-4">
      <Row>
        <Col md={4} className="text-center">
          <img
            src={movie.imagePath}
            alt={movie.title}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '12px',
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/default-poster.jpg';
            }}
          />

            {averageRating !== null && (
            <div className="mt-3 d-flex flex-column align-items-center">
            <StarRating rating={averageRating} />
            <p style={{ fontSize: '1rem', marginTop: '4px' }}>
              {averageRating.toFixed(1)} / 5
            </p>
            </div>
            )}

        </Col>
  
        <Col md={8} className="text-start d-flex flex-column justify-content-start">
          <h2>{movie.title}</h2>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Cast:</strong> {movie.cast}</p>
          <p><strong>Description:</strong> {movie.description}</p>
  
          {/* 🔁 Content-Based Recommendations */}
          <div className="mt-3 mb-2">
            <ContentRecommendationRow showId={showId ?? ''} />
          </div>
  
          {/* 👥 Hybrid-Weighted Recommendations */}
          <div className="mt-2">
            <HybridRecommendationRow showId={showId ?? ''} />
          </div>
        </Col>
      </Row>
    </Container>
  );
  
  
};

export default MovieDetailPage;




