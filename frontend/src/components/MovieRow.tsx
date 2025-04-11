import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import '../pages/MoviesPage.css';

interface MovieRowProps {
  genre: string;
  searchQuery: string;
  displayLabel: string;
}

const baseImageUrl =
  'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

const normalizeTitleForPath = (title: string): string => {
  return title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s]/gu, '')
    .trim();
};

const MovieRow: React.FC<MovieRowProps> = ({ genre, searchQuery, displayLabel }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const rowRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const fetchMoviesAndRatings = async (page: number) => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    try {
      const movieGenreParams = genre
        .split('/')
        .map((g) => `movieGenres=${encodeURIComponent(g.trim())}`)
        .join('&');

      const [movieRes, ratingRes] = await Promise.all([
        fetch(
          `https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/movie/AllMovies?pageSize=25&pageNum=${page}&${movieGenreParams}`
        ),
        fetch(`https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/Rating/AllRatings`)
      ]);

      const movieData = await movieRes.json();
      const ratingData = await ratingRes.json();

      if (!movieData.movies || movieData.movies.length === 0) {
        setHasMore(false);
        return;
      }

      const newMovies = movieData.movies.map((movie: any) => {
        const cleanedTitle =
          movie.title === '#AnneFrank - Parallel Stories'
            ? 'AnneFrank - Parallel Stories'
            : movie.title === '#Selfie'
            ? 'Selfie'
            : movie.title;

        const normalizedTitle = normalizeTitleForPath(cleanedTitle);
        const imagePath = `${baseImageUrl}${encodeURIComponent(normalizedTitle)}.jpg`;

        const relevantRatings = ratingData.filter((r: any) => r.showId === movie.showId);
        const averageRating =
          relevantRatings.length > 0
            ? relevantRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / relevantRatings.length
            : Math.random() * (5 - 3) + 3;

        return {
          ...movie,
          title: cleanedTitle,
          imagePath,
          averageRating,
        };
      });

      setMovies((prev) => [...prev, ...newMovies]);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error(`Error fetching page ${page} of ${genre}`, error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    setMovies([]);
    setPageNum(1);
    setHasMore(true);
    fetchMoviesAndRatings(1);
  }, [genre, searchQuery]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 400 &&
        !isFetchingRef.current &&
        hasMore
      ) {
        fetchMoviesAndRatings(pageNum);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [pageNum, hasMore, genre]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 1000, behavior: 'smooth' });
  };

  return (
    <div className="genre-section mb-5">
      <h3 className="text-white mb-3" style={{ marginTop: '40px' }}>
        {displayLabel}
      </h3>

      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>◀</button>

        <div className="scrolling-row" ref={rowRef}>
          {movies.map((movie) => (
            <div className="movie-grid-item" key={movie.showId}>
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
                averageRating={movie.averageRating}
              />
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>▶</button>
      </div>
    </div>
  );
};

export default MovieRow;




