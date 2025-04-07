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

  const dummyMovies = [
    { title: "Dick Johnson Is Dead", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("Dick Johnson Is Dead.jpg")}` },
    { title: "Blood & Water", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Blood Water.jpg")}` },
    { title: "Ganglands", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Ganglands.jpg")}` },
    { title: "Jailbirds New Orleans", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Jailbirds New Orleans.jpg")}` },
    { title: "Kota Factory", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Kota Factory.jpg")}` },
    { title: "Midnight Mass", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Midnight Mass.jpg")}` },
    { title: "My Little Pony: A New Generation", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("My Little Pony A New Generation.jpg")}` },
    { title: "Sankofa", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Sankofa.jpg")}` },
    { title: "The Great British Baking Show", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("The Great British Baking Show.jpg")}` },
    { title: "The Starling", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("The Starling.jpg")}` },
    { title: "Vendetta: Truth Lies and The Mafia", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Vendetta Truth Lies and The Mafia.jpg")}` },
    { title: "Bangkok Breaking", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Bangkok Breaking.jpg")}` },
    { title: "Je Suis Karl", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Je Suis Karl.jpg")}` },
    { title: "Confessions of an Invisible Girl", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Confessions of an Invisible Girl.jpg")}` },
    { title: "Crime Stories: India Detectives", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Crime Stories India Detectives.jpg")}` },
    { title: "Dear White People", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Dear White People.jpg")}` },
    { title: "Europe's Most Dangerous Man: Otto Skorzeny in Spain", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("Europes Most Dangerous Man Otto Skorzeny in Spain.jpg")}` },
    { title: "Falsa identidad", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Falsa identidad.jpg")}` },
    { title: "Intrusion", genre: "Thrillers", imagePath: `${baseImageUrl}${encodeURIComponent("Intrusion.jpg")}` },
    { title: "Jaguar", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Jaguar.jpg")}` },
    { title: "Monsters Inside: The 24 Faces of Billy Milligan", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Monsters Inside The 24 Faces of Billy Milligan.jpg")}` },
    { title: "Resurrection: Ertugrul", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Resurrection Ertugrul.jpg")}` },
    { title: "Avvai Shanmughi", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Avvai Shanmughi.jpg")}` },
    { title: "Go! Go! Cory Carson: Chrissy Takes the Wheel", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Go Go Cory Carson Chrissy Takes the Wheel.jpg")}` },
    { title: "Jeans", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Jeans.jpg")}` },
    { title: "Love on the Spectrum", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Love on the Spectrum.jpg")}` },
    { title: "Minsara Kanavu", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Minsara Kanavu.jpg")}` },
    { title: "Grown Ups", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Grown Ups.jpg")}` },
    { title: "Dark Skies", genre: "Fantasy", imagePath: `${baseImageUrl}${encodeURIComponent("Dark Skies.jpg")}` },
    { title: "Paranoia", genre: "Thrillers", imagePath: `${baseImageUrl}${encodeURIComponent("Paranoia.jpg")}` },
    { title: "Ankahi Kahaniya", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Ankahi Kahaniya.jpg")}` },
    { title: "Chicago Party Aunt", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Chicago Party Aunt.jpg")}` },
    { title: "Squid Game", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Squid Game.jpg")}` },
    { title: "Tayo and Little Wizards", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Tayo and Little Wizards.jpg")}` },
    { title: "The Father Who Moves Mountains", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("The Father Who Moves Mountains.jpg")}` },
    { title: "The Stronghold", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("The Stronghold.jpg")}` },
    { title: "Angry Birds", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Angry Birds.jpg")}` },
    { title: "Birth of the Dragon", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Birth of the Dragon.jpg")}` },
    { title: "Chhota Bheem", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Chhota Bheem.jpg")}` },
    { title: "He-Man and the Masters of the Universe", genre: "Fantasy", imagePath: `${baseImageUrl}${encodeURIComponent("HeMan and the Masters of the Universe.jpg")}` },
    { title: "Jaws", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Jaws.jpg")}` },
    { title: "Jaws 2", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Jaws 2.jpg")}` },
    { title: "Jaws 3", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Jaws 3.jpg")}` },
    { title: "Jaws: The Revenge", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Jaws The Revenge.jpg")}` },
    { title: "My Heroes Were Cowboys", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("My Heroes Were Cowboys.jpg")}` },
    { title: "Safe House", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Safe House.jpg")}` },
    { title: "The Smart Money Woman", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("The Smart Money Woman.jpg")}` },
    { title: "Training Day", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Training Day.jpg")}` },
    { title: "Castle and Castle", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Castle and Castle.jpg")}` },
    { title: "Dharmakshetra", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Dharmakshetra.jpg")}` },
    { title: "InuYasha the Movie 2: The Castle Beyond the Looking Glass", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("InuYasha the Movie 2 The Castle Beyond the Looking Glass.jpg")}` },
    { title: "InuYasha the Movie 3: Swords of an Honorable Ruler", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("InuYasha the Movie 3 Swords of an Honorable Ruler.jpg")}` },
    { title: "InuYasha the Movie 4: Fire on the Mystic Island", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("InuYasha the Movie 4 Fire on the Mystic Island.jpg")}` },
    { title: "InuYasha the Movie: Affections Touching Across Time", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("InuYasha the Movie Affections Touching Across Time.jpg")}` },
    { title: "Nailed It", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Nailed It.jpg")}` },
    { title: "Naruto Shippuden the Movie: Blood Prison", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto Shippuden the Movie Blood Prison.jpg")}` },
    { title: "Naruto Shippûden the Movie: Bonds", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto%20Shipp%C3%BBden%20the%20Movie%20Bonds.jpg")}` },
    { title: "Naruto Shippûden the Movie: The Will of Fire", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto Shippûden the Movie The Will of Fire.jpg")}` },
    { title: "Naruto Shippuden: The Movie", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto Shippuden The Movie.jpg")}` },
    { title: "Naruto Shippuden: The Movie: The Lost Tower", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto Shippuden The Movie The Lost Tower.jpg")}` },
    { title: "Naruto the Movie 2: Legend of the Stone of Gelel", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto the Movie 2 Legend of the Stone of Gelel.jpg")}` },
    { title: "Naruto the Movie 3: Guardians of the Crescent Moon Kingdom", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto the Movie 3 Guardians of the Crescent Moon Kingdom.jpg")}` },
    { title: "Naruto the Movie: Ninja Clash in the Land of Snow", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Naruto the Movie Ninja Clash in the Land of Snow.jpg")}` },
    { title: "Nightbooks", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Nightbooks.jpg")}` },
    { title: "Numberblocks", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Numberblocks.jpg")}` },
    { title: "Raja Rasoi Aur Anya Kahaniyan", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Raja Rasoi Aur Anya Kahaniyan.jpg")}` },
    { title: "Saved by the Bell", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Saved by the Bell.jpg")}` },
    { title: "Schumacher", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("Schumacher.jpg")}` },
    { title: "Stories by Rabindranath Tagore", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Stories by Rabindranath Tagore.jpg")}` },
    { title: "A StoryBots Space Adventure", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("A StoryBots Space Adventure.jpg")}` },
    { title: "Jack Whitehall: Travels with My Father", genre: "Docuseries", imagePath: `${baseImageUrl}${encodeURIComponent("Jack Whitehall Travels with My Father.jpg")}` },
    { title: "King of Boys", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("King of Boys.jpg")}` },
    { title: "The World's Most Amazing Vacation Rentals", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("The Worlds Most Amazing Vacation Rentals.jpg")}` },
    { title: "You vs. Wild: Out Cold", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("You vs Wild Out Cold.jpg")}` },
    { title: "Yowamushi Pedal", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Yowamushi Pedal.jpg")}` },
    { title: "Little Singham - Black Shadow", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Little Singham Black Shadow.jpg")}` },
    { title: "Tughlaq Durbar", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Tughlaq Durbar.jpg")}` },
    { title: "Tughlaq Durbar (Telugu)", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Tughlaq Durbar Telugu.jpg")}` },
    { title: "Firedrake the Silver Dragon", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Firedrake the Silver Dragon.jpg")}` },
    { title: "Kate", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Kate.jpg")}` },
    { title: "Lucifer", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Lucifer.jpg")}` },
    { title: "Metal Shop Masters", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Metal Shop Masters.jpg")}` },
    { title: "Omo Ghetto: the Saga", genre: "Action", imagePath: `${baseImageUrl}${encodeURIComponent("Omo Ghetto the Saga.jpg")}` },
    { title: "Pokémon Master Journeys: The Series", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Pokémon Master Journeys The Series.jpg")}` },
    { title: "Prey", genre: "Thrillers", imagePath: `${baseImageUrl}${encodeURIComponent("Prey.jpg")}` },
    { title: "Titipo Titipo", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Titipo Titipo.jpg")}` },
    { title: "Blood Brothers: Malcolm X & Muhammad Ali", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("Blood Brothers Malcolm X Muhammad Ali.jpg")}` },
    { title: "Mighty Raju", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Mighty Raju.jpg")}` },
    { title: "Paradise Hills", genre: "Fantasy", imagePath: `${baseImageUrl}${encodeURIComponent("Paradise Hills.jpg")}` },
    { title: "The Women and the Murderer", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("The Women and the Murderer.jpg")}` },
    { title: "Into the Night", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("Into the Night.jpg")}` },
    { title: "JJE", genre: "Dramas", imagePath: `${baseImageUrl}${encodeURIComponent("JJE.jpg")}` },
    { title: "Show Dogs", genre: "Children", imagePath: `${baseImageUrl}${encodeURIComponent("Show Dogs.jpg")}` },
    { title: "The Circle", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("The Circle.jpg")}` },
    { title: "If I Leave Here Tomorrow: A Film About Lynyrd Skynyrd", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("If I Leave Here Tomorrow A Film About Lynyrd Skynyrd.jpg")}` },
    { title: "Kid Cosmic", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("Kid Cosmic.jpg")}` },
    { title: "Octonauts: Above & Beyond", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Octonauts Above Beyond.jpg")}` },
    { title: "On the Verge", genre: "Comedies", imagePath: `${baseImageUrl}${encodeURIComponent("On the Verge.jpg")}` },
    { title: "Tobot Galaxy Detectives", genre: "Unknown", imagePath: `${baseImageUrl}${encodeURIComponent("Tobot Galaxy Detectives.jpg")}` },
    { title: "Untold: Breaking Point", genre: "Documentaries", imagePath: `${baseImageUrl}${encodeURIComponent("Untold Breaking Point.jpg")}` }
    ];

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = dummyMovies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
        return matchesSearch && matchesGenre;
      });

      setMovies(filtered.slice(0, visibleCount));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedGenre, visibleCount]);

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
      <Row className="gx-3 gy-4">
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