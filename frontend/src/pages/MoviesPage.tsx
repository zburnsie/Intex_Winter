import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import AuthorizeView from '../components/AuthorizeView';
import MovieRow from '../components/MovieRow';
import PopularRow from '../components/PopularRow';
//import MovieCard from '../components/MovieCard';
import './MoviesPage.css';

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const genres = [
    'Action/Adventure',
    'AnimeSeriesInternationalTvShows',
    'BritishTvShowsDocuseriesInternationalTvShows',
    'Children',
    'Comedies',
    'ComediesDramasInternationalMovies',
    'ComediesInternationalMovies',
    'ComediesRomanticMovies',
    'CrimeTvShowsDocuseries',
    'Documentaries',
    'DocumentariesInternationalMovies',
    'Docuseries',
    'Dramas',
    'DramasInternationalMovies',
    'DramasRomanticMovies',
    'FamilyMovies',
    'Fantasy',
    'HorrorMovies',
    'InternationalMoviesThrillers',
    'InternationalTvShowsRomanticTvShowsTvDramas',
    'KidsTv',
    'LanguageTvShows',
    'Musicals',
    'NatureTv',
    'RealityTv',
    'Spirituality',
    'TvAction',
    'TvComedies',
    'TvDramas',
    'TalkShowsTvComedies',
    'Thrillers',
  ];

  const handleAcceptCookies = () => setShowCookieBanner(false);

  return (
    <AuthorizeView>
      <Container fluid className="movies-page px-4">
        <div className="movies-controls mx-auto mb-4">
          <h2 className="text-center">Browse Movies</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>

        {/* ✅ Trending Row */}
        <PopularRow />

        {/* ✅ Genre Rows */}
        {genres.map((genre) => (
          <MovieRow key={genre} genre={genre} searchQuery={searchQuery} />
        ))}
      </Container>

      {/* ✅ Cookie Banner */}
      {showCookieBanner && (
        <div
          className="position-fixed bottom-0 start-0 end-0 bg-white text-dark p-3 d-flex justify-content-between align-items-center border-top shadow"
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
    </AuthorizeView>
  );
};

export default MoviesPage;




