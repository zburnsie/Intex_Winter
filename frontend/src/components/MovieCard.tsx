import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  title: string;
  imagePath: string;
  showId: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imagePath, showId }) => {
  return (
    <Link to={`/movie/${showId}`} style={{ textDecoration: 'none' }}>
      <Card
        className="shadow-sm border-0"
        style={{ margin: 0, padding: 0, background: 'none' }}
        title={title} // Tooltip
      >
        <Card.Img
          variant="top"
          src={imagePath}
          alt={title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/default-poster.jpg';
          }}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '12px',
            display: 'block',
          }}
        />
      </Card>
    </Link>
  );
};

export default MovieCard;




