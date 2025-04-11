import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import AuthorizeView from '../components/AuthorizeView';
import MovieRow from '../components/MovieRow';
import PopularRow from '../components/PopularRow';
import SearchResultsGrid from '../components/SearchResultsGrid';
import RecommendedRow from '../components/RecommendedRow';
import './MoviesPage.css';

interface GenreRow {
  label: string;
  genres: string[];
}


const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');

  const genreRows: GenreRow[] = [
    { label: 'Action/Adventure', genres: ['Action/Adventure', 'TvAction'] },
    { label: 'Anime', genres: ['AnimeSeriesInternationalTvShows'] },
    {
      label: 'British TV',
      genres: ['BritishTvShowsDocuseriesInternationalTvShows'],
    },
    {
      label: 'Family Friendly',
      genres: ['Children', 'FamilyMovies', 'KidsTv'],
    },
    {
      label: 'Comedies',
      genres: ['Comedies', 'TalkShowsTvComedies', 'TvComedies'],
    },
    {
      label: 'International',
      genres: [
        'ComediesDramasInternationalMovies',
        'ComediesInternationalMovies',
        'InternationalTvShowsRomanticTvShowsTvDramas',
        'DramasInternationalMovies',
        'LanguageTvShows',
      ],
    },
    {
      label: 'Romantic Comedies',
      genres: ['ComediesRomanticMovies', 'DramasRomanticMovies'],
    },
    { label: 'True Crime', genres: ['CrimeTvShowsDocuseries'] },
    {
      label: 'Documentaries',
      genres: ['Documentaries', 'DocumentariesInternationalMovies'],
    },
    { label: 'Dramas', genres: ['Dramas'] },
    { label: 'Fantasy', genres: ['Fantasy'] },
    { label: 'Horror', genres: ['HorrorMovies'] },
    {
      label: 'Thrillers',
      genres: ['Thrillers', 'InternationalMoviesThrillers'],
    },
    { label: 'Musicals', genres: ['Musicals'] },
    { label: 'Nature', genres: ['NatureTv'] },
    { label: 'Reality TV', genres: ['RealityTv'] },
    { label: 'Spirituality', genres: ['Spirituality'] },
  ];


  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };
    
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/movie/AllMovies?pageSize=2000&pageNum=1&search=${encodeURIComponent(
          searchQuery
        )}`
      );

      const data = await res.json();
      const results = data.movies.map((movie: any) => {
        const normalizedTitle = movie.title
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .replace(/[^\w\s]/gu, '')
          .trim();

        const imagePath = `https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/${encodeURIComponent(
          normalizedTitle
        )}.jpg`;

        const averageRating =
          movie.averageRating || Math.random() * (5 - 3) + 3;

        return {
          ...movie,
          imagePath,
          averageRating,
        };
      });

      setSearchResults(results);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };


  return (
    <AuthorizeView>
      <Container fluid className="movies-page px-4">
        <div className="movies-controls mx-auto mb-4">
          <h2 className="text-center">Browse Movies</h2>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
          <GenreFilter
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>

        {searchResults.length > 0 ? (
          <>
            <h4 className="text-white mb-3">Search Results</h4>
            <SearchResultsGrid results={searchResults} />
          </>
        ) : (
          <>
            <RecommendedRow />
            <PopularRow />
            {genreRows.map(({ label, genres }) => (
              <MovieRow
                key={label}
                genre={genres.join('/')}
                searchQuery={searchQuery}
                displayLabel={label}
              />
            ))}
          </>
        )}
      </Container>

      {showCookieBanner && (
        <div
          className="cookie-banner position-fixed bottom-0 start-0 end-0 bg-white text-dark p-3 d-flex justify-content-between align-items-center border-top shadow"
          style={{ zIndex: 1050 }}
        >
          <span>
            🍪 This site uses cookies to improve your experience. By continuing, you agree.
          </span>
          <button className="btn btn-light btn-sm" onClick={handleAcceptCookies}>
            Got it!
          </button>
        </div>
      )}
      </Container>
    </AuthorizeView>
  );
};

export default MoviesPage;


