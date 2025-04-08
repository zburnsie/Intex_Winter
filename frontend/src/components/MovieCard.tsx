import React from 'react';
import { Card } from 'react-bootstrap';

interface MovieCardProps {
  title: string;
  imagePath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imagePath }) => {
  return (
    <Card
      className="shadow-sm border-0"
      style={{ margin: 0, padding: 0, background: 'none' }}
      title={title} // <-- Tooltip
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
  );
};

export default MovieCard;



