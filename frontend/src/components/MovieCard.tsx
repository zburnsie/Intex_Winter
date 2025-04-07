import React from 'react';
import { Card } from 'react-bootstrap';

interface MovieCardProps {
  title: string;
  imagePath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imagePath }) => {
  return (
    <Card className="movie-card shadow-sm h-100 border-0 rounded-3">
      <div className="image-wrapper">
        <Card.Img
          variant="top"
          src={imagePath}
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop if default fails
            e.currentTarget.src = '/default-poster.jpg';
          }}
          className="movie-img"
        />
      </div>
      <Card.Body className="p-2 text-center">
        <Card.Title className="fs-6 mb-0">{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;


