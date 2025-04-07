import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PosterCard from '../components/PosterCard';

type Props = {
  poster: string[];
};

const RotatingPoster = ({ poster }: Props) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % poster.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [poster.length]);

  const current = poster[index];
  const imageSrc = `https://localhost:5000/Movie%20Posters/${encodeURIComponent(
    current
  )}`;
  const altText = current.replace(/\.[^/.]+$/, '');

  return (
    <PosterCard
      src={imageSrc}
      alt={altText}
      onClick={() => navigate(`/details/${altText}`)}
      width={240}
      height={360}
      className="transition-transform hover:scale-105"
    />
  );
};

export default RotatingPoster;
