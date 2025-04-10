import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import './MoviesPage.css';

const baseApiUrl =
  'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net';
// const baseApiUrl = 'http://localhost:4000';

const baseImageUrl =
  'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const handleAcceptCookies = () => setShowCookieBanner(false);

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/gu, '')
      .trim();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${baseApiUrl}/api/Movie/AllMovies?pageSize=8000`
        );
        const data = await response.json();

        const filtered = data.movies
          .filter((movie: any) => {
            const matchesSearch = movie.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
            const matchesGenre =
              selectedGenre === '' || movie.genre === selectedGenre;
            return matchesSearch && matchesGenre;
          })
          .slice(0, visibleCount)
          .map((movie: any) => {
            const cleanedTitle =
              movie.title === '#AnneFrank - Parallel Stories'
                ? 'AnneFrank - Parallel Stories'
                : movie.title === '#Selfie'
                ? 'Selfie'
                : movie.title;

            const normalizedTitle = normalizeTitleForPath(cleanedTitle);
            const imagePath = `${baseImageUrl}${encodeURIComponent(
              normalizedTitle
            )}.jpg`;

            return {
              ...movie,
              title: cleanedTitle,
              imagePath,
              releaseYear: movie.releaseYear,
              rating: movie.rating,
              description: movie.description,
            };
          });

        setMovies(filtered);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedGenre, visibleCount]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthorizeView>
      <span>
        {/* <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout> */}
      </span>
      <Container fluid className="movies-page px-4">
        <div className="movies-controls mx-auto mb-4">
          <h2 className="text-center">Browse Movies</h2>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <GenreFilter
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-grid-item" key={movie.title}>
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
              />
            </div>
          ))}
        </div>
      </Container>

      {showCookieBanner && (
        <div
          className="position-fixed bottom-0 start-0 end-0 bg-white text-dark p-3 d-flex justify-content-between align-items-center border-top shadow"
          style={{ zIndex: 1050 }}
        >
          <span>
            🍪 This site uses cookies to improve your experience. By continuing,
            you agree.
          </span>
          <button
            className="btn btn-light btn-sm"
            onClick={handleAcceptCookies}
          >
            Got it!
          </button>
        </div>
      )}
    </AuthorizeView>
  );
};

export default MoviesPage;
