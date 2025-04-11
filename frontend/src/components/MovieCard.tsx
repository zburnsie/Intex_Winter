import React, { useState, useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface MovieCardProps {
  title: string;
  imagePath: string;
  showId: string;
  releaseYear?: number;
  rating?: string;
  description?: string;
  director?: string;
  cast?: string;
  country?: string;
  duration?: string;
  averageRating?: number; // Accept average rating as a prop
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imagePath,
  showId,
  releaseYear,
  rating,
  description,
  duration,
  averageRating = Math.random() * (5 - 3) + 3, // Random rating if missing
}) => {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number>(324);
  const [openLeft, setOpenLeft] = useState(false);

  useEffect(() => {
    if (hovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const buffer = 250; // estimated hover card width
      const viewportWidth = window.innerWidth;

      if (rect.right + buffer > viewportWidth) {
        setOpenLeft(true);
      } else {
        setOpenLeft(false);
      }

      if (imgRef.current) {
        setImgHeight(imgRef.current.clientHeight);
      }
    }
  }, [hovered]);

  return (
    <div
      className={`movie-hover-wrapper ${hovered ? 'zoomed' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={cardRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <Link to={`/movie/${showId}`} style={{ textDecoration: 'none' }}>
        <Card
          className="shadow-sm border-0"
          style={{ margin: 0, padding: 0, background: 'none' }}
          title={title}
        >
          <Card.Img
            ref={imgRef}
            className="hover-effect"
            variant="top"
            src={imagePath}
            alt={title}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.hasTriedFallback) {
                img.src = '/default-poster.jpg'; // Adjust if needed
                img.dataset.hasTriedFallback = 'true';
              }
            }}
            style={{
              width: '216px',
              height: '324px',
              objectFit: 'cover',
              borderRadius: '12px',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Card>
      </Link>

      {hovered && (
        <div
          className="hover-info-card"
          style={{
            height: `${imgHeight}px`,
            width: '216px',
            left: openLeft ? 'auto' : '105%',
            right: openLeft ? '105%' : 'auto',
          }}
        >
          <h5 className="text-white mb-2">
            <strong>{title}</strong>
          </h5>

          {/* Centered Rating and Number */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
            }}
          >
            <StarRating rating={averageRating} />
            <span className="text-white small">({averageRating.toFixed(1)})</span>
          </div>

          <p className="text-white mb-1">Release: {releaseYear ?? '—'}</p>
          <p className="text-white mb-1">Rated: {rating ?? '—'}</p>
          <p className="text-white mb-1">Length: {duration ?? '—'}</p>
          <p className="text-white small description-preview">
            {description ?? 'No description.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
