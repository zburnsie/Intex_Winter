import React from 'react';
import { Container } from 'react-bootstrap';

import MovieRow from '../components/MovieRow.tsx';
import PopularRow from '../components/PopularRow';
import SearchBar from '../components/SearchBar';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import ContentRecommendationRow from '../components/ContentRecommendationRow'; // ✅ For use elsewhere

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

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

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

        {/* 🔥 Trending Now Row */}
        <PopularRow />

        {/* 🎬 Genre Rows */}
        {genreLabels.map((genre) => (
          <MovieRow key={genre} genre={genre} searchQuery={searchQuery} />
        ))}
      </Container>
    </AuthorizeView>
  );
};

export default MoviesPage;
