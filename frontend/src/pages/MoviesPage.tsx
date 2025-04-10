import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MovieRow from '../components/MovieRow';
import PopularRow from '../components/PopularRow';
import './MoviesPage.css';

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // All genres you want to display as rows
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

  return (
    <Container fluid className="movies-page px-4">
      <div className="movies-controls mx-auto mb-4">
        <h2 className="text-center">Browse Movies</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {/* ✅ Add the trending row at the top */}
      <PopularRow />

      {genres.map((genre) => (
        <MovieRow key={genre} genre={genre} searchQuery={searchQuery} />
      ))}
    </Container>
  );
};

export default MoviesPage;



