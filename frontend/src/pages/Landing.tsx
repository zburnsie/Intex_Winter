import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import FeaturedCarousel from '../components/FeaturedCarousel';
import RotatingPoster from '../components/RotatingPoster';
import './Landing.css';
import driveHero from '../images/drive-hero.webp';
import lotrImage from '../images/lotr.jpg';
import perfectDays from '../images/perfect-days.jpeg';
import babyDriver from '../images/baby-driver.jpg';
import severance from '../images/severance.jpg';
import keira from '../images/keira.jpg';

const backgroundImages = [
  driveHero,
  lotrImage,
  perfectDays,
  babyDriver,
  severance,
  keira,
];

const LandingPage = () => {
  const [posterTitles, setPosterTitles] = useState<string[]>([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const baseImageUrl =
    'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/gu, '')
      .trim();
  };

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/api/movie/AllMovies?pageSize=100'
        );
        const data = await response.json();

        const posters = data.movies
          .map((movie: any) => `${normalizeTitleForPath(movie.title)}.jpg`)

          .filter(
            (value: string, index: number, self: string[]) =>
              self.indexOf(value) === index
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 100);

        setPosterTitles(posters);
      } catch (error) {
        console.error('Error fetching posters:', error);
      }
    };

    fetchPosters();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <section className="hero-section">
        {/* Fade-enabled background layers */}
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`hero-background ${
              index === currentImageIndex ? 'active' : ''
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Hero text content */}
        <div className="hero-content">
          <h1 className="hero-title">CineNiche</h1>
          <h1 className="hero-subtitle">
            Discover Bold, Brilliant, & Hidden Films
          </h1>
          <p className="hero-description">
            Stream award-winning documentaries, indie gems, and global cinema,
            anytime.
          </p>
          <div className="hero-buttons">
            <Link to="/register">
              <button className="join-button">Join Now</button>
            </Link>
            <Link to="/login">
              <button className="login-button">Log In</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="carousel-wrapper">
        <FeaturedCarousel posters={posterTitles} baseUrl={baseImageUrl} />
      </section>

      <section className="collection-section">
        <h3>Explore Our Collection</h3>
        <div className="poster-wrapper">
          {posterTitles.length > 0 && (
            <RotatingPoster poster={posterTitles} baseUrl={baseImageUrl} />
          )}
        </div>
      </section>

      <TestimonialsSection />

      <footer className="footer">
        <p>&copy; 2025 CineNiche. All rights reserved.</p>

        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Help Center</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
