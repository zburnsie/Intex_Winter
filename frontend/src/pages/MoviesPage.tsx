import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import "./MoviesPage.css";

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const baseImageUrl = "https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/";

  const normalizeTitleForPath = (title: string): string => {
    return title
      .normalize("NFD") // decompose unicode
      .replace(/\p{Diacritic}/gu, '') // remove diacritics
      .replace(/[^\w\s]/gu, '') // remove non-alphanumeric but preserve whitespace
      // don't collapse spaces, leave any double spaces intact
      .trim();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/movie/AllMovies");
        const data = await response.json();

        const filtered = data.movies
          .filter((movie: any) => {
            const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
            return matchesSearch && matchesGenre;
          })
          .slice(0, visibleCount)
          .map((movie: any) => {
            const normalizedTitle = normalizeTitleForPath(movie.title);
            const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;
            return {
              ...movie,
              imagePath,
            };
          });
          

        setMovies(filtered);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
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
    <Container fluid className="px-4">
      <div className="movies-controls mx-auto mb-4">
        <h2 className="text-center">Browse Movies</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      </div>
      <Row className="gx-2 gy-3">
        {movies.map((movie) => (
          <Col key={movie.title} xs={6} sm={4} md={3} lg={2} className="d-flex">
            <MovieCard title={movie.title} imagePath={movie.imagePath} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesPage;
