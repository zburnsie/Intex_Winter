import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import AuthorizeView from '../components/AuthorizeView';
import MovieRow from '../components/MovieRow';
import PopularRow from '../components/PopularRow';
import './MoviesPage.css';

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const genreRows = [
    { label: 'Action/Adventure', genres: ['Action/Adventure', 'TvAction'] },
    { label: 'Anime', genres: ['AnimeSeriesInternationalTvShows'] },
    { label: 'British TV', genres: ['BritishTvShowsDocuseriesInternationalTvShows'] },
    { label: 'Family Friendly', genres: ['Children', 'FamilyMovies', 'KidsTv'] },
    { label: 'Comedies', genres: ['Comedies', 'TalkShowsTvComedies', 'TvComedies'] },
    {
      label: 'International',
      genres: [
        'ComediesDramasInternationalMovies',
        'ComediesInternationalMovies',
        'InternationalTvShowsRomanticTvShowsTvDramas',
        'DramasInternationalMovies',
        'LanguageTvShows'
      ]
    },
    { label: 'Romantic Comedies', genres: ['ComediesRomanticMovies', 'DramasRomanticMovies'] },
    { label: 'True Crime', genres: ['CrimeTvShowsDocuseries'] },
    { label: 'Documentaries', genres: ['Documentaries', 'DocumentariesInternationalMovies'] },
    { label: 'Dramas', genres: ['Dramas'] },
    { label: 'Fantasy', genres: ['Fantasy'] },
    { label: 'Horror', genres: ['HorrorMovies'] },
    { label: 'Thrillers', genres: ['Thrillers', 'InternationalMoviesThrillers'] },
    { label: 'Musicals', genres: ['Musicals'] },
    { label: 'Nature', genres: ['NatureTv'] },
    { label: 'Reality TV', genres: ['RealityTv'] },
    { label: 'Spirituality', genres: ['Spirituality'] }
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
        {genreRows.map(({ label, genres }) => (
          <MovieRow key={label} genre={genres.join('/')} searchQuery={searchQuery} displayLabel={label} />
        ))}
      </Container>

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





