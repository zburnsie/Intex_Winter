import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import './MoviesPage.css';

const genreLabels = [
  'action', 'adventure', 'animeSeriesInternationalTvShows', 'britishTvShowsDocuseriesInternationalTvShows',
  'children', 'comedies', 'comediesDramasInternationalMovies', 'comediesInternationalMovies',
  'comediesRomanticMovies', 'crimeTvShowsDocuseries', 'documentaries', 'documentariesInternationalMovies',
  'docuseries', 'dramas', 'dramasInternationalMovies', 'dramasRomanticMovies',
  'familyMovies', 'fantasy', 'horrorMovies', 'internationalMoviesThrillers',
  'internationalTvShowsRomanticTvShowsTvDramas', 'kidsTv', 'languageTvShows', 'musicals',
  'natureTv', 'realityTv', 'spirituality', 'tvAction', 'tvComedies', 'tvDramas',
  'talkShowsTvComedies', 'thrillers'
];

const pageSize = 8;

const MoviesPage: React.FC = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, any[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [genrePageState, setGenrePageState] = useState<Record<string, number>>({});

  const baseImageUrl =
    'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/gu, '')
      .trim();
  };

  const getFirstGenre = (movie: any): string | null => {
    for (const genre of genreLabels) {
      if (movie[genre] === 1) return genre;
    }
    return null;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/movie/AllMovies?pageSize=8000');
        const data = await response.json();

        const grouped: Record<string, any[]> = {};

        const filtered = data.movies
          .map((movie: any) => {
            const cleanedTitle = movie.title === "#AnneFrank - Parallel Stories"
              ? "AnneFrank - Parallel Stories"
              : movie.title === "#Selfie"
              ? "Selfie"
              : movie.title;

            const normalizedTitle = normalizeTitleForPath(cleanedTitle);
            const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

            const firstGenre = getFirstGenre(movie);
            if (!firstGenre) return null;

            return {
              ...movie,
              title: cleanedTitle,
              imagePath,
              genre: firstGenre,
              releaseYear: movie.releaseYear,
              rating: movie.rating,
              description: movie.description,
              director: movie.director,
              cast: movie.cast,
              country: movie.country,
              duration: movie.duration
            };
          })
          .filter((movie: any) => {
            if (!movie) return false;
            return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
          });

        for (const movie of filtered) {
          if (!grouped[movie.genre]) grouped[movie.genre] = [];
          grouped[movie.genre].push(movie);
        }

        setMoviesByGenre(grouped);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handlePageChange = (genre: string, direction: number) => {
    setGenrePageState((prev) => ({
      ...prev,
      [genre]: Math.max(0, (prev[genre] || 0) + direction)
    }));
  };

  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <Container fluid className="movies-page px-4">
        <div className="movies-controls mx-auto mb-4">
          <h2 className="text-center">Browse Movies</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {Object.entries(moviesByGenre).map(([genre, movies]) => {
          const currentPage = genrePageState[genre] || 0;
          const startIndex = currentPage * pageSize;
          const visibleMovies = movies.slice(startIndex, startIndex + pageSize);

          return (
            <div key={genre} className="genre-section mb-5">
              <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>{genre}</h3>
              <div className="genre-row">
                {visibleMovies.map((movie) => (
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
              <div className="d-flex justify-content-between mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(genre, -1)}
                  disabled={currentPage === 0}
                >
                  ◀ Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(genre, 1)}
                  disabled={startIndex + pageSize >= movies.length}
                >
                  Next ▶
                </Button>
              </div>
            </div>
          );
        })}
      </Container>
    </AuthorizeView>
  );
};

export default MoviesPage;

