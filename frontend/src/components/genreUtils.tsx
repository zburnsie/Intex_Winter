import { Movie } from "../types/Movie";

export const genreMap: { [key: string]: string } = {
  action: "Action",
  adventure: "Adventure",
  animeSeriesInternationalTvShows: "Anime/International TV",
  britishTvShowsDocuseriesInternationalTvShows: "British/Docuseries/International TV",
  children: "Children",
  comedies: "Comedies",
  comediesDramasInternationalMovies: "Comedies/Dramas/International",
  comediesInternationalMovies: "Comedies/International",
  comediesRomanticMovies: "Romantic Comedies",
  crimeTvShowsDocuseries: "Crime Docuseries",
  documentaries: "Documentaries",
  documentariesInternationalMovies: "Doc/International Movies",
  docuseries: "Docuseries",
  dramas: "Dramas",
  dramasInternationalMovies: "Dramas/International",
  dramasRomanticMovies: "Romantic Dramas",
  familyMovies: "Family",
  fantasy: "Fantasy",
  horrorMovies: "Horror",
  internationalMoviesThrillers: "Intl. Thrillers",
  internationalTvShowsRomanticTvShowsTvDramas: "Intl./Romantic/TV Dramas",
  kidsTv: "Kids",
  languageTvShows: "Language TV",
  musicals: "Musicals",
  natureTv: "Nature TV",
  realityTv: "Reality",
  spirituality: "Spirituality",
  tvAction: "TV Action",
  tvComedies: "TV Comedies",
  tvDramas: "TV Dramas",
  talkShowsTvComedies: "Talk Shows/TV Comedies",
  thrillers: "Thrillers",
};

export const getGenresFromMovie = (movie: Movie): string[] => {
  return Object.entries(genreMap)
    .filter(([key]) => movie[key as keyof Movie] === 1)
    .map(([_, label]) => label);
};